# PhyCoVE Project Page

Static GitHub Pages website for **PhyCoVE: Benchmarking Physical Counterfactual Video Editing across Diverse Material Dynamics**.

- Live page: `https://phycove.github.io/`
- Paper (PDF): https://arxiv.org/pdf/2611.29184
- arXiv: https://arxiv.org/abs/2611.29184
- Dataset: https://huggingface.co/datasets/ccmoony/PhyCoVE
- Code: https://github.com/Hammour-steak/PhyCoVE

## Leaderboard Submissions & Approval

Leaderboard entries live in `assets/data/leaderboard.json` and community submissions are archived under `submissions/`.

- **Submit via Web Form / Issue**: Click **Submit Results** on `https://phycove.github.io/#leaderboard` to open a pre-filled GitHub Issue (`leaderboard-submission`). GitHub Actions validates the JSON payload automatically.
- **Approve & Auto-Publish**: Maintainers review the scores and verification link, then add the **`approved`** label (and optionally **`verified`** if predictions were verified). GitHub Actions automatically merges the entry into `assets/data/leaderboard.json`, commits it to `main`, closes the issue, and triggers a GitHub Pages rebuild.
- **Submit via PR**: Contributors can also add `submissions/<model-slug>.json` (see `submissions/example_submission.json`) via Pull Request; merging the PR automatically syncs `assets/data/leaderboard.json`.

## Local Preview

```bash
python3 -m http.server 8080
```

Then open `http://127.0.0.1:8080/`.
