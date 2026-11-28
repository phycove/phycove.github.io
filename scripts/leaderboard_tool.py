#!/usr/bin/env python3
"""Validate, extract, and merge PhyCoVE leaderboard submissions.

Uses only the Python standard library so GitHub Actions runs cleanly with zero
external dependencies.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import pathlib
import re
import sys
from typing import Any

OVERALL_BOUNDS: dict[str, tuple[float, float]] = {
    "hpwr": (0.0, 100.0),
    "cf": (-1.0, 1.0),
    "ea": (1.0, 5.0),
    "pc": (1.0, 5.0),
    "joint": (0.0, 100.0),
    "miou": (0.0, 1.0),
    "psnr": (0.0, 100.0),
    "ssim": (0.0, 1.0),
    "lpips": (0.0, 2.0),
    "fvd": (0.0, 100000.0),
}

RIGID_BOUNDS: dict[str, tuple[float, float]] = {
    "cf": (-1.0, 1.0),
    "miou": (0.0, 1.0),
    "psnr": (0.0, 100.0),
    "ssim": (0.0, 1.0),
    "lpips": (0.0, 2.0),
}

URL_RE = re.compile(r"^https?://[^\s<>\"']+$")
SLUG_RE = re.compile(r"[^a-z0-9]+")


def slugify(name: str) -> str:
    slug = SLUG_RE.sub("-", name.strip().lower()).strip("-")
    return slug or "model"


def is_number(val: Any) -> bool:
    return isinstance(val, (int, float)) and not isinstance(val, bool)


def validate_submission(data: Any) -> list[str]:
    errors: list[str] = []
    if not isinstance(data, dict):
        return ["Submission root must be a JSON object."]

    name = data.get("name")
    if not isinstance(name, str) or not name.strip():
        errors.append("`name` must be a non-empty string.")
    elif len(name.strip()) > 60:
        errors.append("`name` must be at most 60 characters.")

    group = data.get("group")
    if group not in ("open", "comm"):
        errors.append("`group` must be either \"open\" (open-source) or \"comm\" (commercial API).")

    for opt_str in ("id", "org", "date", "notes"):
        val = data.get(opt_str)
        if val is not None and not isinstance(val, str):
            errors.append(f"`{opt_str}` must be a string when provided.")

    for opt_url in ("url", "evidence_url"):
        val = data.get(opt_url)
        if val is not None and val != "":
            if not isinstance(val, str) or not URL_RE.match(val.strip()):
                errors.append(f"`{opt_url}` must be a valid http(s) URL.")

    if "verified" in data and not isinstance(data["verified"], bool):
        errors.append("`verified` must be a boolean when provided.")

    overall = data.get("overall")
    if not isinstance(overall, dict):
        errors.append("`overall` must be an object containing at least `cf`.")
    else:
        if not is_number(overall.get("cf")):
            errors.append("`overall.cf` is required and must be a number in [-1, 1].")
        for key, (lo, hi) in OVERALL_BOUNDS.items():
            val = overall.get(key)
            if val is None:
                continue
            if not is_number(val):
                errors.append(f"`overall.{key}` must be a number or null.")
            elif not (lo <= float(val) <= hi):
                errors.append(f"`overall.{key}`={val} is out of range [{lo}, {hi}].")

    breakdown = data.get("breakdown")
    if breakdown is not None:
        if not isinstance(breakdown, dict):
            errors.append("`breakdown` must be an object or null.")
        else:
            for k in ("rem", "chg", "ins"):
                arr = breakdown.get(k)
                if arr is None:
                    continue
                if not isinstance(arr, list) or len(arr) != 3:
                    errors.append(f"`breakdown.{k}` must be a 3-element array [CF, EA, HPWR].")
                    continue
                limits = [(-1.0, 1.0), (1.0, 5.0), (0.0, 100.0)]
                for idx, (val, (lo, hi)) in enumerate(zip(arr, limits)):
                    if val is None:
                        continue
                    if not is_number(val) or not (lo <= float(val) <= hi):
                        errors.append(f"`breakdown.{k}[{idx}]`={val} is invalid (expected [{lo}, {hi}] or null).")

            pat = breakdown.get("pat")
            if pat is not None:
                if not isinstance(pat, list) or len(pat) != 5:
                    errors.append("`breakdown.pat` must be a 5-element array of CF scores.")
                else:
                    for idx, val in enumerate(pat):
                        if val is None:
                            continue
                        if not is_number(val) or not (-1.0 <= float(val) <= 1.0):
                            errors.append(f"`breakdown.pat[{idx}]`={val} must be in [-1, 1] or null.")

    rigid = data.get("rigid")
    if rigid is not None:
        if not isinstance(rigid, dict):
            errors.append("`rigid` must be an object or null.")
        else:
            if not is_number(rigid.get("cf")):
                errors.append("`rigid.cf` must be a number in [-1, 1] when `rigid` is provided.")
            for key, (lo, hi) in RIGID_BOUNDS.items():
                val = rigid.get(key)
                if val is None:
                    continue
                if not is_number(val) or not (lo <= float(val) <= hi):
                    errors.append(f"`rigid.{key}`={val} is invalid (expected [{lo}, {hi}] or null).")

    return errors


def extract_json_from_issue(body: str) -> dict[str, Any]:
    """Extract the first JSON code block from a GitHub Issue body."""
    patterns = [
        r"```json\s*(\{.*?\})\s*```",
        r"```\s*(\{.*?\})\s*```",
    ]
    for pat in patterns:
        match = re.search(pat, body, flags=re.DOTALL | re.IGNORECASE)
        if match:
            return json.loads(match.group(1))
    raise ValueError("No fenced ```json { ... } ``` block found in issue body.")


def upsert_by_id(rows: list[dict[str, Any]], entry: dict[str, Any]) -> None:
    target_id = entry["id"]
    for idx, row in enumerate(rows):
        if row.get("id") == target_id or slugify(row.get("name", "")) == target_id:
            rows[idx] = entry
            return
    rows.append(entry)


def merge_submission(
    leaderboard: dict[str, Any],
    sub: dict[str, Any],
    *,
    verified_override: bool | None = None,
) -> tuple[dict[str, Any], str]:
    name = sub["name"].strip()
    model_id = slugify(sub.get("id") or name)
    group = sub["group"]
    url = (sub.get("url") or "").strip()
    org = (sub.get("org") or "").strip()
    date_str = (sub.get("date") or dt.date.today().isoformat()).strip()
    verified = (
        verified_override
        if verified_override is not None
        else bool(sub.get("verified", False))
    )

    overall_src = sub["overall"]
    overall_entry: dict[str, Any] = {
        "id": model_id,
        "name": name,
        "org": org,
        "url": url,
        "group": group,
        "verified": verified,
        "paper_baseline": False,
        "date": date_str,
    }
    for k in ("hpwr", "cf", "ea", "pc", "joint", "miou", "psnr", "ssim", "lpips", "fvd"):
        val = overall_src.get(k)
        overall_entry[k] = None if val is None else (round(float(val)) if k == "fvd" else float(val))

    upsert_by_id(leaderboard.setdefault("overall", []), overall_entry)

    bd = sub.get("breakdown")
    if isinstance(bd, dict):
        has_et = any(
            isinstance(bd.get(k), list) and any(v is not None for v in bd[k])
            for k in ("rem", "chg", "ins")
        )
        has_pat = isinstance(bd.get("pat"), list) and any(v is not None for v in bd["pat"])
        if has_et or has_pat:
            bd_entry = {
                "id": model_id,
                "name": name,
                "url": url,
                "group": group,
                "verified": verified,
                "rem": bd.get("rem") or [None, None, None],
                "chg": bd.get("chg") or [None, None, None],
                "ins": bd.get("ins") or [None, None, None],
                "pat": bd.get("pat") if has_pat else None,
            }
            upsert_by_id(leaderboard.setdefault("breakdown", []), bd_entry)

    rg = sub.get("rigid")
    if isinstance(rg, dict) and is_number(rg.get("cf")):
        rg_entry: dict[str, Any] = {
            "id": model_id,
            "name": name,
            "url": url,
            "group": group,
            "verified": verified,
        }
        for k in ("cf", "miou", "psnr", "ssim", "lpips"):
            val = rg.get(k)
            rg_entry[k] = None if val is None else float(val)
        upsert_by_id(leaderboard.setdefault("rigid", []), rg_entry)

    leaderboard["updated_at"] = dt.date.today().isoformat()
    return leaderboard, model_id


def format_summary_markdown(sub: dict[str, Any]) -> str:
    ov = sub["overall"]
    def f(k: str, d: int = 3) -> str:
        v = ov.get(k)
        if v is None:
            return "—"
        return f"{round(float(v))}" if d == 0 else f"{float(v):.{d}f}"

    lines = [
        f"### Submission Validated: **{sub['name']}**",
        "",
        f"- **Type**: `{'Open-source' if sub['group'] == 'open' else 'Commercial API'}`",
        f"- **Organization**: {sub.get('org') or '—'}",
        f"- **Model URL**: {sub.get('url') or '—'}",
        f"- **Evidence URL**: {sub.get('evidence_url') or '—'}",
        "",
        "| CF ↑ | EA ↑ | PC ↑ | Joint ↑ | Mask IoU ↑ | PSNR ↑ | SSIM ↑ | LPIPS ↓ | FVD ↓ | HPWR ↑ |",
        "|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|",
        f"| {f('cf', 3)} | {f('ea', 2)} | {f('pc', 2)} | {f('joint', 1)} | {f('miou', 3)} | {f('psnr', 2)} | {f('ssim', 3)} | {f('lpips', 3)} | {f('fvd', 0)} | {f('hpwr', 1)} |",
        "",
        "> **Maintainer action**: Review the numbers and evidence link above. Add the **`approved`** label to publish automatically to `phycove.github.io` (also add **`verified`** if you reproduced/verified the predictions).",
    ]
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="PhyCoVE leaderboard submission tool")
    subparsers = parser.add_subparsers(dest="cmd", required=True)

    p_val = subparsers.add_parser("validate", help="Validate one or more submission JSON files")
    p_val.add_argument("files", nargs="+", type=pathlib.Path)

    p_ext = subparsers.add_parser("extract-issue", help="Extract & validate JSON from an issue body")
    p_ext.add_argument("--body-file", required=True, type=pathlib.Path)
    p_ext.add_argument("--out", type=pathlib.Path)
    p_ext.add_argument("--summary-out", type=pathlib.Path)

    p_merge = subparsers.add_parser("merge", help="Merge a submission JSON into leaderboard.json")
    p_merge.add_argument("--submission", required=True, type=pathlib.Path)
    p_merge.add_argument("--leaderboard", required=True, type=pathlib.Path)
    p_merge.add_argument("--save-submission-dir", type=pathlib.Path)
    p_merge.add_argument("--verified", choices=["true", "false", "auto"], default="auto")

    p_sync = subparsers.add_parser("sync-all", help="Merge all submissions/*.json into leaderboard.json")
    p_sync.add_argument("--submissions-dir", required=True, type=pathlib.Path)
    p_sync.add_argument("--leaderboard", required=True, type=pathlib.Path)

    args = parser.parse_args(argv)

    if args.cmd == "validate":
        ok = True
        for path in args.files:
            try:
                data = json.loads(path.read_text(encoding="utf-8"))
            except Exception as exc:
                print(f"FAIL {path}: invalid JSON ({exc})", file=sys.stderr)
                ok = False
                continue
            errs = validate_submission(data)
            if errs:
                print(f"FAIL {path}:", file=sys.stderr)
                for e in errs:
                    print(f"  - {e}", file=sys.stderr)
                ok = False
            else:
                print(f"OK   {path} ({data['name']})")
        return 0 if ok else 1

    if args.cmd == "extract-issue":
        body = args.body_file.read_text(encoding="utf-8")
        try:
            data = extract_json_from_issue(body)
        except Exception as exc:
            print(f"ERROR: {exc}", file=sys.stderr)
            return 1
        errs = validate_submission(data)
        if errs:
            print("VALIDATION_ERRORS:")
            for e in errs:
                print(f"- {e}")
            return 1
        if args.out:
            args.out.parent.mkdir(parents=True, exist_ok=True)
            args.out.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        if args.summary_out:
            args.summary_out.write_text(format_summary_markdown(data) + "\n", encoding="utf-8")
        print(slugify(data.get("id") or data["name"]))
        return 0

    if args.cmd == "merge":
        sub = json.loads(args.submission.read_text(encoding="utf-8"))
        errs = validate_submission(sub)
        if errs:
            for e in errs:
                print(f"ERROR: {e}", file=sys.stderr)
            return 1
        lb = json.loads(args.leaderboard.read_text(encoding="utf-8"))
        ver_override = None if args.verified == "auto" else (args.verified == "true")
        lb, slug = merge_submission(lb, sub, verified_override=ver_override)
        args.leaderboard.write_text(json.dumps(lb, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        if args.save_submission_dir:
            args.save_submission_dir.mkdir(parents=True, exist_ok=True)
            sub_to_save = dict(sub)
            sub_to_save["id"] = slug
            if ver_override is not None:
                sub_to_save["verified"] = ver_override
            sub_to_save.setdefault("date", dt.date.today().isoformat())
            out_file = args.save_submission_dir / f"{slug}.json"
            out_file.write_text(json.dumps(sub_to_save, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        print(f"Merged `{sub['name']}` ({slug}) into {args.leaderboard}")
        return 0

    if args.cmd == "sync-all":
        lb = json.loads(args.leaderboard.read_text(encoding="utf-8"))
        files = sorted(
            p for p in args.submissions_dir.glob("*.json")
            if p.name != "example_submission.json"
        )
        for path in files:
            sub = json.loads(path.read_text(encoding="utf-8"))
            errs = validate_submission(sub)
            if errs:
                print(f"FAIL {path}: {errs}", file=sys.stderr)
                return 1
            lb, _ = merge_submission(lb, sub)
        args.leaderboard.write_text(json.dumps(lb, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        print(f"Synced {len(files)} submission file(s) into {args.leaderboard}")
        return 0

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
