// PhyCoVE Project Page interactive controller (vanilla ES module)

const REPO_ISSUES_URL = "https://github.com/phycove/phycove.github.io/issues/new";

// Fallback copy in case index.html is opened locally via file:// without a server
const FALLBACK_LEADERBOARD = {
  updated_at: "2026-11-27",
  overall: [
    { id: "seedance-2.5", name: "Seedance 2.5", org: "ByteDance", url: "", group: "comm", verified: true, hpwr: 59.4, cf: 0.126, ea: 2.07, pc: 4.42, joint: 12.0, miou: 0.330, psnr: 28.28, ssim: 0.891, lpips: 0.086, fvd: 87 },
    { id: "minimax-h3",   name: "MiniMax H3",   org: "MiniMax",   url: "", group: "comm", verified: true, hpwr: 59.0, cf: 0.134, ea: 2.20, pc: 4.39, joint: 11.1, miou: 0.306, psnr: 23.44, ssim: 0.785, lpips: 0.155, fvd: 105 },
    { id: "wan-3.0",      name: "Wan 3.0",      org: "Alibaba",   url: "", group: "comm", verified: true, hpwr: 55.3, cf: 0.113, ea: 1.99, pc: 4.41, joint: 9.9,  miou: 0.327, psnr: 26.15, ssim: 0.843, lpips: 0.121, fvd: 166 },
    { id: "kling-4.0",    name: "Kling 4.0",    org: "Kuaishou",  url: "", group: "comm", verified: true, hpwr: 51.6, cf: 0.107, ea: 1.88, pc: 4.41, joint: 8.3,  miou: 0.334, psnr: 23.48, ssim: 0.806, lpips: 0.127, fvd: 135 },
    { id: "joyai",        name: "JoyAI",        org: "",          url: "", group: "open", verified: true, hpwr: 44.9, cf: 0.100, ea: 1.86, pc: 4.15, joint: 7.7,  miou: 0.331, psnr: 24.28, ssim: 0.792, lpips: 0.196, fvd: 257 },
    { id: "kiwi-edit",    name: "Kiwi-Edit",    org: "",          url: "", group: "open", verified: true, hpwr: 44.1, cf: -0.005, ea: 1.86, pc: 4.03, joint: 6.0, miou: 0.325, psnr: 26.30, ssim: 0.860, lpips: 0.113, fvd: 131 },
    { id: "omniweaving",  name: "OmniWeaving",  org: "",          url: "", group: "open", verified: true, hpwr: 35.8, cf: -0.182, ea: 1.56, pc: 4.05, joint: 2.8, miou: 0.222, psnr: 22.17, ssim: 0.813, lpips: 0.274, fvd: 282 },
  ],
  breakdown: [
    { id: "minimax-h3",  name: "MiniMax H3",  group: "comm", verified: true, rem: [0.336, 3.15, 63.5], chg: [0.019, 1.69, 56.7],  ins: [0.136, 2.33, 57.8], pat: [0.107, 0.171, 0.154, 0.197, -0.019] },
    { id: "seedance-2.5",name: "Seedance 2.5",group: "comm", verified: true, rem: [0.354, 3.05, 58.7], chg: [0.003, 1.55, 60.2],  ins: [0.070, 2.05, 52.2], pat: [0.075, 0.168, 0.215, 0.034, 0.216] },
    { id: "wan-3.0",     name: "Wan 3.0",     group: "comm", verified: true, rem: [0.354, 3.11, 58.7], chg: [-0.017, 1.40, 53.8], ins: [0.019, 2.05, 51.1], pat: [0.120, 0.120, 0.085, 0.152, 0.010] },
    { id: "kling-4.0",   name: "Kling 4.0",   group: "comm", verified: true, rem: [0.289, 2.84, 51.7], chg: [0.000, 1.35, 51.3],  ins: [0.173, 2.19, 56.7], pat: [0.097, 0.140, 0.097, 0.071, 0.037] },
    { id: "joyai",       name: "JoyAI",       group: "open", verified: true, rem: [0.266, 2.71, 43.1], chg: [0.007, 1.38, 44.9],  ins: [0.104, 2.43, 61.7], pat: [0.084, 0.103, 0.173, 0.011, 0.085] },
    { id: "kiwi-edit",   name: "Kiwi-Edit",   group: "open", verified: true, rem: [0.216, 2.76, 46.5], chg: [-0.133, 1.40, 43.1], ins: [0.034, 1.57, 40.0], pat: [-0.014, 0.031, -0.013, -0.008, -0.186] },
    { id: "omniweaving", name: "OmniWeaving", group: "open", verified: true, rem: [-0.087, 2.09, 27.8], chg: [-0.247, 1.29, 40.3], ins: [-0.026, 1.52, 30.6], pat: [-0.227, -0.142, -0.127, -0.169, -0.150] },
    { id: "void",        name: "VOID",        group: "open", verified: true, rem: [0.297, 2.90, null], chg: [null, null, null],   ins: [null, null, null],  pat: null },
  ],
  rigid: [
    { id: "videophysedit", name: "VideoPhysEdit", group: "open", verified: true, cf: 0.481, miou: 0.421, psnr: 26.15, ssim: 0.842, lpips: 0.161 },
    { id: "minimax-h3",    name: "MiniMax H3",    group: "comm", verified: true, cf: 0.145, miou: 0.191, psnr: 22.23, ssim: 0.750, lpips: 0.191 },
    { id: "wan-3.0",       name: "Wan 3.0",       group: "comm", verified: true, cf: 0.108, miou: 0.262, psnr: 25.97, ssim: 0.848, lpips: 0.122 },
    { id: "kling-4.0",     name: "Kling 4.0",     group: "comm", verified: true, cf: 0.099, miou: 0.366, psnr: 22.67, ssim: 0.766, lpips: 0.143 },
    { id: "joyai",         name: "JoyAI",         group: "open", verified: true, cf: 0.076, miou: 0.297, psnr: 24.13, ssim: 0.761, lpips: 0.233 },
    { id: "seedance-2.5",  name: "Seedance 2.5",  group: "comm", verified: true, cf: 0.060, miou: 0.137, psnr: 27.46, ssim: 0.890, lpips: 0.108 },
    { id: "kiwi-edit",     name: "Kiwi-Edit",     group: "open", verified: true, cf: 0.047, miou: 0.285, psnr: 24.69, ssim: 0.799, lpips: 0.135 },
    { id: "omniweaving",   name: "OmniWeaving",   group: "open", verified: true, cf: -0.376, miou: 0.158, psnr: 23.28, ssim: 0.789, lpips: 0.290 },
  ],
};

const CAT_LABELS = {
  "rigid-rigid": "Rigid–Rigid",
  "rigid-elastic": "Rigid–Elastic",
  "rigid-fluid": "Rigid–Fluid",
  "elastic-fluid": "Elastic–Fluid",
  "elastic-elastic": "Elastic–Elastic",
};

/* ---------------- Motion helpers ---------------- */
// JS-driven motion is skipped entirely when the visitor prefers reduced motion;
// the CSS side is gated by the matching media query.
const MOTION_OK =
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  typeof Element.prototype.animate === "function";
const EASE_OUT = "cubic-bezier(.22, 1, .36, 1)";
const EASE_SPRING = "cubic-bezier(.34, 1.56, .64, 1)";

// Short fade/slide for content that is replaced in place (prompt text, video stage)
function swapIn(el, { y = 8, scale = 1, from = 0, duration = 380 } = {}) {
  if (!MOTION_OK || !el) return;
  el.animate(
    [{ opacity: from, transform: `translateY(${y}px) scale(${scale})` }, { opacity: 1, transform: "none" }],
    { duration, easing: EASE_OUT }
  );
}

// FLIP: after a re-sort, rows slide from their previous position to the new one
function renderRowsAnimated(tbody, html) {
  const prev = MOTION_OK
    ? new Map([...tbody.children].map((tr) => [tr.dataset.id, tr.getBoundingClientRect().top]))
    : null;
  tbody.innerHTML = html;
  if (!prev || !prev.size) return;
  for (const tr of tbody.children) {
    const from = prev.get(tr.dataset.id);
    if (from === undefined) continue;
    const box = tr.getBoundingClientRect();
    // Rects can be in zoomed pixels on large screens (--page-zoom); transforms are not
    const scale = (tr.offsetHeight ? box.height / tr.offsetHeight : 1) || 1;
    const dy = (from - box.top) / scale;
    if (Math.abs(dy) < 1) continue;
    tr.classList.add("is-moving");
    tr.style.zIndex = dy > 0 ? "2" : "1"; // rows moving up pass over rows moving down
    const anim = tr.animate(
      [{ transform: `translateY(${dy}px)` }, { transform: "none" }],
      { duration: 520, easing: EASE_OUT }
    );
    anim.onfinish = anim.oncancel = () => {
      tr.classList.remove("is-moving");
      tr.style.zIndex = "";
    };
  }
}

// Count an integer label up from zero, holding its width so neighbours do not shift
function countUp(el, duration = 1000) {
  const target = parseInt(el.textContent, 10);
  if (!MOTION_OK || !Number.isFinite(target)) return;
  el.style.minWidth = `${el.offsetWidth}px`;
  const t0 = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - t0) / duration);
    el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// One short move per material glyph: rigid hops and turns, elastic rings, fluid drips
const ICON_MOVES = {
  // The cube glyph has three-fold symmetry, so a 120° turn lands looking unchanged
  rigid: [
    { transform: "translateY(0) rotate(0deg)" },
    { transform: "translateY(-3.5px) rotate(60deg)", offset: 0.4 },
    { transform: "translateY(0) rotate(120deg)", offset: 0.75 },
    { transform: "translateY(-1px) rotate(120deg)", offset: 0.88 },
    { transform: "translateY(0) rotate(120deg)" },
  ],
  elastic: [
    { transform: "scale(1, 1)" },
    { transform: "scale(1.2, 0.5)", offset: 0.18 },
    { transform: "scale(0.86, 1.32)", offset: 0.4 },
    { transform: "scale(1.1, 0.8)", offset: 0.62 },
    { transform: "scale(0.97, 1.1)", offset: 0.82 },
    { transform: "scale(1, 1)" },
  ],
  fluid: [
    { transform: "translateY(0) scale(1, 1)" },
    { transform: "translateY(-3px) scale(0.88, 1.16)", offset: 0.3 },
    { transform: "translateY(2px) scale(1.22, 0.76)", offset: 0.58 },
    { transform: "translateY(0) scale(0.95, 1.06)", offset: 0.8 },
    { transform: "translateY(0) scale(1, 1)" },
  ],
};

function playIcon(svg, delay = 0) {
  if (!MOTION_OK || !svg || svg.getAnimations().length) return;
  const kind = svg.querySelector("use")?.getAttribute("href")?.replace("#ico-", "");
  const frames = ICON_MOVES[kind];
  if (frames) svg.animate(frames, { duration: 760, delay, easing: "ease-in-out" });
}

function fmtSigned(v, digits = 3) {
  if (v === null || v === undefined) return "—";
  const s = Math.abs(v).toFixed(digits);
  return v < 0 ? `−${s}` : s;
}

function renderPrompt(el, text) {
  const esc = String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  el.innerHTML = esc.replace(/\*\*(.+?)\*\*/g, '<strong class="prompt-verb">$1</strong>');
}

function heatClass(val, ref, scale) {
  if (val === null || val === undefined) return "";
  const d = (val - ref) / scale;
  if (d >= 0.65) return "heat-pos-3";
  if (d >= 0.3) return "heat-pos-2";
  if (d > 0.02) return "heat-pos-1";
  if (d <= -0.65) return "heat-neg-3";
  if (d <= -0.3) return "heat-neg-2";
  if (d < -0.02) return "heat-neg-1";
  return "";
}

function initHeader() {
  const header = document.getElementById("site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
    // Drives the reading-progress bar on the header's bottom edge
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    header.style.setProperty("--scroll-progress", progress.toFixed(4));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  const sections = [...document.querySelectorAll("main section[id]")];
  const links = new Map([...nav.querySelectorAll("a")].map((a) => [a.getAttribute("href")?.slice(1), a]));

  // Pill that slides between nav links to mark the current section (shown by CSS on desktop only)
  const indicator = document.createElement("span");
  indicator.className = "nav-indicator";
  indicator.setAttribute("aria-hidden", "true");
  nav.prepend(indicator);
  nav.classList.add("has-indicator");
  let currentLink = null;
  const placeIndicator = (slide) => {
    nav.classList.toggle("has-current", Boolean(currentLink));
    if (!currentLink) return;
    if (!slide) indicator.style.transition = "none";
    indicator.style.setProperty("--ind-x", `${currentLink.offsetLeft}px`);
    indicator.style.setProperty("--ind-y", `${currentLink.offsetTop}px`);
    indicator.style.setProperty("--ind-w", `${currentLink.offsetWidth}px`);
    indicator.style.setProperty("--ind-h", `${currentLink.offsetHeight}px`);
    if (!slide) {
      void indicator.offsetWidth; // commit the jump before transitions come back
      indicator.style.transition = "";
    }
  };
  window.addEventListener("resize", () => placeIndicator(false));
  document.fonts?.ready.then(() => placeIndicator(false));

  const obs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.remove("is-current"));
          const hadCurrent = Boolean(currentLink);
          currentLink = links.get(e.target.id) || null;
          currentLink?.classList.add("is-current");
          placeIndicator(hadCurrent); // first appearance fades in place instead of sliding from the edge
        }
      }
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );
  sections.forEach((s) => obs.observe(s));
}

function initCitation() {
  const btn = document.getElementById("copy-citation");
  const code = document.querySelector("#citation-code code");
  const status = document.getElementById("copy-status");
  btn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(code.textContent);
      btn.textContent = "Copied!";
      if (MOTION_OK) {
        btn.animate(
          [{ transform: "scale(1)" }, { transform: "scale(1.12)", offset: 0.4 }, { transform: "scale(1)" }],
          { duration: 360, easing: "ease-out" }
        );
      }
      status.textContent = "BibTeX copied to clipboard.";
      setTimeout(() => { btn.textContent = "Copy"; }, 1800);
    } catch {
      btn.textContent = "Copy failed";
    }
  });
}

/* ---------------- Leaderboard ---------------- */
function escHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeUrl(url) {
  const u = String(url || "").trim();
  return /^https?:\/\/[^\s<>"']+$/i.test(u) ? u : "";
}

function renderModelCell(r) {
  const safeName = escHtml(r.name);
  const href = safeUrl(r.url);
  const nameHtml = href
    ? `<a class="model-link" href="${escHtml(href)}" target="_blank" rel="noopener noreferrer">${safeName}</a>`
    : safeName;
  const badge = r.group === "open"
    ? '<span class="model-tag tag-open">Open</span>'
    : '<span class="model-tag tag-comm">API</span>';
  const verBadge = r.verified === false
    ? '<span class="model-tag tag-self" title="Self-reported community submission">Community</span>'
    : "";
  const orgHtml = r.org && !r.paper_baseline
    ? `<span class="model-org">${escHtml(r.org)}</span>`
    : "";
  return `${nameHtml}${badge}${verBadge}${orgHtml}`;
}

function compareNullable(a, b, dir) {
  const aNull = a === null || a === undefined || Number.isNaN(a);
  const bNull = b === null || b === undefined || Number.isNaN(b);
  if (aNull && bNull) return 0;
  if (aNull) return 1;
  if (bNull) return -1;
  return dir === "desc" ? b - a : a - b;
}

async function initLeaderboard() {
  let lb = FALLBACK_LEADERBOARD;
  try {
    const res = await fetch("assets/data/leaderboard.json", { cache: "no-cache" });
    if (res.ok) lb = await res.json();
  } catch {
    // Keep FALLBACK_LEADERBOARD when opened from file://
  }

  const OVERALL_MODELS = lb.overall || [];
  const BREAKDOWN_MODELS = lb.breakdown || [];
  const RIGID_MODELS = lb.rigid || [];

  const updatedEl = document.getElementById("lb-updated");
  if (updatedEl && lb.updated_at) {
    updatedEl.textContent = `Last updated: ${lb.updated_at}.`;
  }

  const metrics = [
    { key: "hpwr", digits: 1, higher: true },
    { key: "cf", digits: 3, higher: true },
    { key: "ea", digits: 2, higher: true },
    { key: "pc", digits: 2, higher: true },
    { key: "joint", digits: 1, higher: true },
    { key: "miou", digits: 3, higher: true },
    { key: "psnr", digits: 2, higher: true },
    { key: "ssim", digits: 3, higher: true },
    { key: "lpips", digits: 3, higher: false },
    { key: "fvd", digits: 0, higher: false },
  ];

  // Compute best & second-best values per column (ignoring null)
  const rankMaps = {};
  for (const m of metrics) {
    const vals = OVERALL_MODELS.map((r) => r[m.key]).filter((v) => v !== null && v !== undefined);
    const uniq = [...new Set(vals)].sort((a, b) => m.higher ? b - a : a - b);
    rankMaps[m.key] = { best: uniq[0], second: uniq[1] };
  }

  let sortKey = "cf";
  let sortDir = "desc";

  function renderOverall() {
    const tbody = document.getElementById("overall-tbody");
    const rows = [...OVERALL_MODELS].sort((a, b) => compareNullable(a[sortKey], b[sortKey], sortDir));
    renderRowsAnimated(tbody, rows.map((r) => {
      const cells = metrics.map((m) => {
        const val = r[m.key];
        if (val === null || val === undefined) return '<td class="cell-na">—</td>';
        let txt = m.key === "cf" ? fmtSigned(val, 3) : Number(val).toFixed(m.digits);
        if (val === rankMaps[m.key].best) txt = `<strong>${txt}</strong>`;
        else if (val === rankMaps[m.key].second) txt = `<u>${txt}</u>`;
        return `<td>${txt}</td>`;
      }).join("");
      return `<tr data-id="${escHtml(r.id || r.name)}"><th scope="row">${renderModelCell(r)}</th>${cells}</tr>`;
    }).join(""));

    document.querySelectorAll("#overall-table .is-sortable").forEach((th) => {
      th.classList.toggle("is-sorted", th.dataset.key === sortKey);
    });
  }

  document.querySelectorAll("#overall-table .is-sortable").forEach((th) => {
    th.addEventListener("click", () => {
      const k = th.dataset.key;
      if (sortKey === k) {
        sortDir = sortDir === "desc" ? "asc" : "desc";
      } else {
        sortKey = k;
        sortDir = th.dataset.dir || "desc";
      }
      renderOverall();
    });
  });

  // Render Edit-Type breakdown
  const etCols = [
    ["rem", 0, 3, 0, 0.35], ["rem", 1, 2, 1, 2.2], ["rem", 2, 1, 50, 15],
    ["chg", 0, 3, 0, 0.25], ["chg", 1, 2, 1, 1.0], ["chg", 2, 1, 50, 12],
    ["ins", 0, 3, 0, 0.18], ["ins", 1, 2, 1, 1.6], ["ins", 2, 1, 50, 15],
  ];
  const etMax = etCols.map(([k, i]) => {
    const vals = BREAKDOWN_MODELS.map((r) => r[k]?.[i]).filter((v) => v !== null && v !== undefined);
    return vals.length ? Math.max(...vals) : null;
  });
  document.getElementById("edittype-tbody").innerHTML = BREAKDOWN_MODELS.map((r) => {
    const cells = etCols.map(([k, i, d, ref, sc], idx) => {
      const v = r[k]?.[i];
      if (v === null || v === undefined) return '<td class="cell-na">—</td>';
      const cls = heatClass(v, ref, sc);
      let txt = i === 0 ? fmtSigned(v, d) : Number(v).toFixed(d);
      if (v === etMax[idx]) txt = `<strong>${txt}</strong>`;
      return `<td class="${cls}">${txt}</td>`;
    }).join("");
    return `<tr><th scope="row">${renderModelCell(r)}</th>${cells}</tr>`;
  }).join("");

  // Render Interaction Pattern breakdown
  const patRows = BREAKDOWN_MODELS.filter((r) => Array.isArray(r.pat) && r.pat.some((v) => v !== null && v !== undefined));
  const patMax = [0, 1, 2, 3, 4].map((i) => {
    const vals = patRows.map((r) => r.pat[i]).filter((v) => v !== null && v !== undefined);
    return vals.length ? Math.max(...vals) : null;
  });
  document.getElementById("interaction-tbody").innerHTML = patRows.map((r) => {
    const cells = r.pat.map((v, i) => {
      if (v === null || v === undefined) return '<td class="cell-na">—</td>';
      const cls = heatClass(v, 0, 0.22);
      let txt = fmtSigned(v, 3);
      if (v === patMax[i]) txt = `<strong>${txt}</strong>`;
      return `<td class="${cls}">${txt}</td>`;
    }).join("");
    return `<tr><th scope="row">${renderModelCell(r)}</th>${cells}</tr>`;
  }).join("");

  // Render Classic Rigid-Body table (VideoPhysEdit comparison)
  const rigidMetrics = [
    { key: "cf", digits: 3, higher: true },
    { key: "miou", digits: 3, higher: true },
    { key: "psnr", digits: 2, higher: true },
    { key: "ssim", digits: 3, higher: true },
    { key: "lpips", digits: 3, higher: false },
  ];
  const rigidRanks = {};
  for (const m of rigidMetrics) {
    const vals = RIGID_MODELS.map((r) => r[m.key]).filter((v) => v !== null && v !== undefined);
    const uniq = [...new Set(vals)].sort((a, b) => m.higher ? b - a : a - b);
    rigidRanks[m.key] = { best: uniq[0], second: uniq[1] };
  }
  let rigidSortKey = "cf";
  let rigidSortDir = "desc";

  function renderRigid() {
    const tbody = document.getElementById("rigid-tbody");
    const rows = [...RIGID_MODELS].sort((a, b) => compareNullable(a[rigidSortKey], b[rigidSortKey], rigidSortDir));
    renderRowsAnimated(tbody, rows.map((r) => {
      const cells = rigidMetrics.map((m) => {
        const val = r[m.key];
        if (val === null || val === undefined) return '<td class="cell-na">—</td>';
        let txt = m.key === "cf" ? fmtSigned(val, 3) : Number(val).toFixed(m.digits);
        if (val === rigidRanks[m.key].best) txt = `<strong>${txt}</strong>`;
        else if (val === rigidRanks[m.key].second) txt = `<u>${txt}</u>`;
        return `<td>${txt}</td>`;
      }).join("");
      return `<tr data-id="${escHtml(r.id || r.name)}"><th scope="row">${renderModelCell(r)}</th>${cells}</tr>`;
    }).join(""));

    document.querySelectorAll("#rigid-table .is-sortable").forEach((th) => {
      th.classList.toggle("is-sorted", th.dataset.key === rigidSortKey);
    });
  }

  document.querySelectorAll("#rigid-table .is-sortable").forEach((th) => {
    th.addEventListener("click", () => {
      const k = th.dataset.key;
      if (rigidSortKey === k) {
        rigidSortDir = rigidSortDir === "desc" ? "asc" : "desc";
      } else {
        rigidSortKey = k;
        rigidSortDir = th.dataset.dir || "desc";
      }
      renderRigid();
    });
  });

  // Tab switching
  const tabs = document.querySelectorAll("[data-lb-tab]");
  const panels = {
    "overall": document.getElementById("lb-overall"),
    "edit-type": document.getElementById("lb-edit-type"),
    "interaction": document.getElementById("lb-interaction"),
    "rigid": document.getElementById("lb-rigid"),
  };
  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const t = btn.dataset.lbTab;
      tabs.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", String(active));
      });
      Object.entries(panels).forEach(([k, el]) => { el.hidden = k !== t; });
    });
  });

  renderOverall();
  renderRigid();
}

/* ---------------- Leaderboard Submission Modal ---------------- */
function initSubmissionModal() {
  const modal = document.getElementById("submit-modal");
  const openBtn = document.getElementById("open-submit-modal");
  const closeBtn = document.getElementById("close-submit-modal");
  const form = document.getElementById("submit-form");
  const previewCode = document.querySelector("#submit-json-preview code");
  const errEl = document.getElementById("submit-error");
  const copyBtn = document.getElementById("copy-submission-json");
  if (!modal || !form) return;

  const num = (name) => {
    const raw = form.elements[name]?.value?.trim();
    if (!raw) return null;
    const v = Number(raw);
    return Number.isFinite(v) ? v : null;
  };
  const str = (name) => (form.elements[name]?.value || "").trim();

  function buildPayload() {
    const today = new Date().toISOString().slice(0, 10);
    const payload = {
      name: str("name"),
      org: str("org"),
      url: str("url"),
      evidence_url: str("evidence_url"),
      group: str("group") || "open",
      date: today,
      notes: str("notes"),
      overall: {
        cf: num("cf"),
        ea: num("ea"),
        pc: num("pc"),
        joint: num("joint"),
        miou: num("miou"),
        psnr: num("psnr"),
        ssim: num("ssim"),
        lpips: num("lpips"),
        fvd: num("fvd"),
        hpwr: num("hpwr"),
      },
    };

    const rem = [num("rem_cf"), num("rem_ea"), null];
    const chg = [num("chg_cf"), num("chg_ea"), null];
    const ins = [num("ins_cf"), num("ins_ea"), null];
    const pat = [num("pat_rr"), num("pat_re"), num("pat_rf"), num("pat_ef"), num("pat_ee")];
    const hasEt = [...rem, ...chg, ...ins].some((v) => v !== null);
    const hasPat = pat.some((v) => v !== null);
    if (hasEt || hasPat) {
      payload.breakdown = {
        rem,
        chg,
        ins,
        pat: hasPat ? pat : null,
      };
    }

    const rCf = num("rigid_cf");
    if (rCf !== null) {
      payload.rigid = {
        cf: rCf,
        miou: num("rigid_miou"),
        psnr: num("rigid_psnr"),
        ssim: num("rigid_ssim"),
        lpips: num("rigid_lpips"),
      };
    }
    return payload;
  }

  function validatePayload(p) {
    if (!p.name) return "Please enter your model name.";
    if (!p.evidence_url || !safeUrl(p.evidence_url)) {
      return "Please provide a valid http(s) verification link (predictions or evaluation logs).";
    }
    if (p.url && !safeUrl(p.url)) {
      return "Paper / Project URL must start with http:// or https://.";
    }
    if (p.overall.cf === null || p.overall.cf < -1 || p.overall.cf > 1) {
      return "Overall CF is required and must be between -1 and 1.";
    }
    const ranges = [
      ["EA", p.overall.ea, 1, 5],
      ["PC", p.overall.pc, 1, 5],
      ["Joint", p.overall.joint, 0, 100],
      ["Mask IoU", p.overall.miou, 0, 1],
      ["PSNR", p.overall.psnr, 0, 100],
      ["SSIM", p.overall.ssim, 0, 1],
      ["LPIPS", p.overall.lpips, 0, 2],
      ["FVD", p.overall.fvd, 0, 100000],
      ["HPWR", p.overall.hpwr, 0, 100],
    ];
    for (const [label, v, lo, hi] of ranges) {
      if (v !== null && (v < lo || v > hi)) {
        return `${label} must be between ${lo} and ${hi}.`;
      }
    }
    return "";
  }

  function refreshPreview() {
    if (previewCode) {
      previewCode.textContent = JSON.stringify(buildPayload(), null, 2);
    }
  }

  function showError(msg) {
    errEl.textContent = msg;
    errEl.hidden = !msg;
  }

  openBtn?.addEventListener("click", () => {
    showError("");
    refreshPreview();
    modal.showModal();
  });
  closeBtn?.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });
  form.addEventListener("input", () => {
    showError("");
    refreshPreview();
  });

  copyBtn?.addEventListener("click", async () => {
    const payload = buildPayload();
    const err = validatePayload(payload);
    if (err) { showError(err); return; }
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      copyBtn.textContent = "Copied JSON!";
      setTimeout(() => { copyBtn.textContent = "Copy JSON for PR"; }, 1800);
    } catch {
      showError("Copy failed—please copy directly from the JSON preview above.");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = buildPayload();
    const err = validatePayload(payload);
    if (err) { showError(err); return; }

    const title = `[Leaderboard] ${payload.name}`;
    const body = [
      "### PhyCoVE Leaderboard Submission",
      "",
      `- **Model**: ${payload.name} (${payload.group === "open" ? "Open-source" : "Commercial API"})`,
      `- **Organization**: ${payload.org || "—"}`,
      `- **Model / Paper URL**: ${payload.url || "—"}`,
      `- **Verification / Predictions URL**: ${payload.evidence_url}`,
      payload.notes ? `- **Notes**: ${payload.notes}` : null,
      "",
      "### Submission Payload",
      "",
      "```json",
      JSON.stringify(payload, null, 2),
      "```",
      "",
      "<!-- Maintainers: add the `approved` label (and optionally `verified`) to publish automatically. -->",
    ].filter((l) => l !== null).join("\n");

    const params = new URLSearchParams({
      title,
      labels: "leaderboard-submission",
      body,
    });
    window.open(`${REPO_ISSUES_URL}?${params.toString()}`, "_blank", "noopener,noreferrer");
  });
}

/* ---------------- Synchronized Video Helpers ---------------- */
function bindSyncControls(getVideos, playBtn, seekEl, timeEl, { showFrames = false } = {}) {
  let dragging = false;
  let rafId = null;

  function syncTick() {
    const vids = getVideos();
    const lead = vids[0];
    if (lead && lead.duration && !Number.isNaN(lead.duration)) {
      if (!dragging) {
        seekEl.value = String(lead.currentTime / lead.duration);
      }
      if (showFrames) {
        const frame = Math.min(96, Math.max(1, Math.round(lead.currentTime * 24) + 1));
        timeEl.textContent = `Frame ${frame} / 96 · ${lead.currentTime.toFixed(2)} s`;
      } else {
        timeEl.textContent = `${lead.currentTime.toFixed(2)} s / ${lead.duration.toFixed(2)} s`;
      }
      // Keep followers gently synced within 100 ms
      if (!lead.paused) {
        for (let i = 1; i < vids.length; i++) {
          const v = vids[i];
          if (v.readyState >= 2 && v.duration) {
            const targetT = Math.min(v.duration - 0.04, (lead.currentTime / lead.duration) * v.duration);
            if (Math.abs(v.currentTime - targetT) > 0.14) {
              v.currentTime = targetT;
            }
          }
        }
      }
    }
    rafId = requestAnimationFrame(syncTick);
  }

  async function playAll() {
    const vids = getVideos();
    playBtn.textContent = "Pause";
    await Promise.allSettled(vids.map((v) => v.play()));
  }

  function pauseAll() {
    const vids = getVideos();
    vids.forEach((v) => v.pause());
    playBtn.textContent = "Play all";
  }

  playBtn.addEventListener("click", () => {
    const vids = getVideos();
    if (!vids.length) return;
    if (vids[0].paused) playAll();
    else pauseAll();
  });

  seekEl.addEventListener("pointerdown", () => { dragging = true; });
  seekEl.addEventListener("pointerup", () => { dragging = false; });
  seekEl.addEventListener("input", () => {
    const frac = parseFloat(seekEl.value);
    for (const v of getVideos()) {
      if (v.duration && !Number.isNaN(v.duration)) {
        v.currentTime = frac * v.duration;
      }
    }
  });

  rafId = requestAnimationFrame(syncTick);
  return { playAll, pauseAll, stop: () => cancelAnimationFrame(rafId) };
}

/* ---------------- Interactive Benchmark Showcase ---------------- */
async function initShowcase() {
  const res = await fetch("assets/data/showcase.json");
  const cases = await res.json();

  const filtersEl = document.getElementById("showcase-filters");
  const casesEl = document.getElementById("showcase-cases");
  const srcVid = document.getElementById("showcase-src-video");
  const tgtVid = document.getElementById("showcase-tgt-video");
  const typeBadge = document.getElementById("showcase-edit-type");
  const catBadge = document.getElementById("showcase-cat");
  const frameBadge = document.getElementById("showcase-frame");
  const instrEl = document.getElementById("showcase-instruction");
  const langBtn = document.getElementById("showcase-lang-toggle");
  const marker = document.getElementById("showcase-onset-marker");
  const markerTag = document.getElementById("showcase-onset-tag");
  const playBtn = document.getElementById("showcase-play");
  const seekEl = document.getElementById("showcase-seek");
  const timeEl = document.getElementById("showcase-time");

  let activeFilter = "highlights";
  let activeCase = cases[0];
  let showZh = false;

  const ctrl = bindSyncControls(() => [srcVid, tgtVid], playBtn, seekEl, timeEl, { showFrames: true });

  function updateInstruction() {
    if (!activeCase) return;
    renderPrompt(instrEl, showZh && activeCase.prompt_zh ? activeCase.prompt_zh : activeCase.prompt_en);
    langBtn.textContent = showZh ? "Show EN" : "EN / 中文";
  }

  const shellEl = document.getElementById("showcase-shell");
  const stageEl = shellEl.querySelector(".dual-stage");

  function selectCase(c, autoplay = true) {
    activeCase = c;
    shellEl.dataset.cat = c.category;
    casesEl.querySelectorAll(".case-chip").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.id === c.id);
    });
    typeBadge.textContent = c.edit_type;
    typeBadge.className = `badge badge-type is-${c.edit_type}`;
    catBadge.textContent = c.split === "real" ? `Real · ${CAT_LABELS[c.category] || c.category}` : (CAT_LABELS[c.category] || c.category);
    catBadge.className = `badge badge-cat cat-${c.category}`;
    if (c.frame > 1) {
      frameBadge.textContent = `At frame ${c.frame}`;
      frameBadge.hidden = false;
    } else {
      frameBadge.hidden = true;
    }
    updateInstruction();
    swapIn(instrEl);
    swapIn(stageEl, { y: 0, scale: 0.985, from: 0.35, duration: 450 });

    if (c.frame > 1) {
      const pct = ((c.frame - 1) / 95) * 100;
      marker.style.left = `${pct}%`;
      markerTag.textContent = `t = f${c.frame}`;
      marker.hidden = false;
    } else {
      marker.hidden = true;
    }

    srcVid.poster = c.source_poster;
    tgtVid.poster = c.target_poster;
    srcVid.src = c.source_video;
    tgtVid.src = c.target_video;
    srcVid.currentTime = 0;
    tgtVid.currentTime = 0;
    seekEl.value = "0";
    if (autoplay) ctrl.playAll();
  }

  function renderCases(filter) {
    activeFilter = filter;
    const list = filter === "highlights"
      ? cases.filter((c) => c.highlight)
      : cases.filter((c) => c.category === filter);
    casesEl.innerHTML = "";
    for (const c of list) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "case-chip";
      btn.dataset.id = c.id;
      const realTag = c.split === "real" ? '<span class="chip-real">Real</span>' : "";
      btn.innerHTML = `<span class="chip-dot dot-${c.edit_type}" aria-hidden="true"></span>${c.title}${realTag}`;
      btn.addEventListener("click", () => selectCase(c, true));
      btn.style.setProperty("--i", String(casesEl.childElementCount)); // entrance stagger index
      casesEl.appendChild(btn);
    }
    if (list.length) selectCase(list[0], true);
  }

  filtersEl.querySelectorAll(".filter-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      filtersEl.querySelectorAll(".filter-pill").forEach((p) => {
        const active = p === pill;
        p.classList.toggle("is-active", active);
        p.setAttribute("aria-selected", String(active));
      });
      renderCases(pill.dataset.filter);
    });
  });

  langBtn.addEventListener("click", () => {
    showZh = !showZh;
    updateInstruction();
  });

  // Pause showcase when scrolled far out of view
  const visObs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) ctrl.pauseAll();
      }
    },
    { threshold: 0.05 }
  );
  visObs.observe(document.getElementById("showcase-shell"));

  renderCases(activeFilter);
}

/* ---------------- 7-Model Qualitative Comparisons ---------------- */
async function initComparisons() {
  const res = await fetch("assets/data/comparisons.json");
  const comps = await res.json();

  const filtersEl = document.getElementById("comp-filters");
  const tabsEl = document.getElementById("comparison-tabs");
  const compShell = document.getElementById("comparison-shell");
  const typeEl = document.getElementById("comp-edit-type");
  const catEl = document.getElementById("comp-cat");
  const frameEl = document.getElementById("comp-frame");
  const instrEl = document.getElementById("comp-instruction");
  const takeEl = document.getElementById("comp-takeaway");
  const refGrid = document.getElementById("comp-ref-grid");
  const modelGrid = document.getElementById("comp-model-grid");
  const playBtn = document.getElementById("comp-play");
  const seekEl = document.getElementById("comp-seek");
  const timeEl = document.getElementById("comp-time");
  const marker = document.getElementById("comp-onset-marker");
  const markerTag = document.getElementById("comp-onset-tag");

  let activeVideos = [];
  let inView = false;
  const ctrl = bindSyncControls(() => activeVideos, playBtn, seekEl, timeEl, { showFrames: true });

  function cfBadge(cf) {
    if (cf === null || cf === undefined) return "";
    const cls = cf >= 0.35 ? "cf-high" : cf >= 0.0 ? "cf-mid" : "cf-low";
    return `<span class="cf-pill ${cls}">CF ${fmtSigned(cf, 2)}</span>`;
  }

  function makeCard(item) {
    const fig = document.createElement("figure");
    fig.className = `media-column ${item.role === "source" ? "is-source" : item.role === "target" ? "is-target" : ""}`;
    fig.innerHTML = `
      <figcaption><span>${item.label}</span>${cfBadge(item.cf)}</figcaption>
      <div class="media-slot">
        <video muted playsinline loop preload="metadata" poster="${item.poster}" src="${item.video}"></video>
      </div>
    `;
    return fig;
  }

  function selectComp(c, autoplay = false) {
    const slug = c.category || "rigid-fluid";
    compShell.dataset.cat = slug;
    tabsEl.querySelectorAll(".case-chip").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.id === c.id);
    });
    typeEl.textContent = c.edit_type;
    typeEl.className = `badge badge-type is-${c.edit_type}`;
    catEl.textContent = c.category_label;
    catEl.className = `badge badge-cat cat-${slug}`;
    if (c.frame > 1) {
      frameEl.textContent = `At frame ${c.frame}`;
      frameEl.hidden = false;
    } else {
      frameEl.hidden = true;
    }
    renderPrompt(instrEl, c.prompt_en);
    takeEl.textContent = c.takeaway;
    swapIn(instrEl);
    swapIn(takeEl);

    if (c.frame > 1) {
      const pct = ((c.frame - 1) / 95) * 100;
      marker.style.left = `${pct}%`;
      markerTag.textContent = `t = f${c.frame}`;
      marker.hidden = false;
    } else {
      marker.hidden = true;
    }

    refGrid.innerHTML = "";
    modelGrid.innerHTML = "";
    activeVideos = [];

    for (const item of c.items) {
      const card = makeCard(item);
      if (item.role === "source" || item.role === "target") refGrid.appendChild(card);
      else modelGrid.appendChild(card);
      card.style.setProperty("--i", String(activeVideos.length)); // entrance stagger index
      activeVideos.push(card.querySelector("video"));
    }
    seekEl.value = "0";
    if (autoplay) ctrl.playAll();
    else playBtn.textContent = "Play all";
  }

  function renderCompCases(filter, autoplay = false) {
    const list = filter === "highlights"
      ? comps.filter((c) => c.highlight)
      : comps.filter((c) => c.category === filter);
    tabsEl.innerHTML = "";
    for (const c of list) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "case-chip";
      btn.dataset.id = c.id;
      const realTag = c.split === "real" ? '<span class="chip-real">Real</span>' : "";
      btn.innerHTML = `<span class="chip-dot dot-${c.edit_type}" aria-hidden="true"></span>${c.title}${realTag}`;
      btn.addEventListener("click", () => selectComp(c, true));
      btn.style.setProperty("--i", String(tabsEl.childElementCount)); // entrance stagger index
      tabsEl.appendChild(btn);
    }
    if (list.length) selectComp(list[0], autoplay);
  }

  filtersEl?.querySelectorAll(".filter-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      filtersEl.querySelectorAll(".filter-pill").forEach((p) => {
        const active = p === pill;
        p.classList.toggle("is-active", active);
        p.setAttribute("aria-selected", String(active));
      });
      renderCompCases(pill.dataset.compFilter, inView);
    });
  });

  renderCompCases("highlights", false);

  // Auto-play when scrolled into view, pause when leaving
  const visObs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        inView = e.isIntersecting;
        if (e.isIntersecting) ctrl.playAll();
        else ctrl.pauseAll();
      }
    },
    { threshold: 0.15 }
  );
  visObs.observe(compShell);
}

/* ---------------- Hero motion ---------------- */
function initHeroMotion() {
  if (!MOTION_OK) return;
  const hero = document.getElementById("top");
  if (!hero) return;
  const aura = hero.querySelector(".hero-aura");

  // Pause the aura drift and the glyph cycle while the hero is off screen
  let heroVisible = true;
  new IntersectionObserver((entries) => {
    for (const e of entries) {
      heroVisible = e.isIntersecting;
      hero.classList.toggle("is-offscreen", !heroVisible);
    }
  }).observe(hero);

  // The aura leans a little towards the pointer
  if (aura && window.matchMedia("(pointer: fine)").matches) {
    let pending = null;
    hero.addEventListener("pointermove", (e) => {
      const queued = pending !== null;
      pending = e;
      if (queued) return;
      requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        aura.style.setProperty("--px", ((pending.clientX - r.left) / r.width - 0.5).toFixed(3));
        aura.style.setProperty("--py", ((pending.clientY - r.top) / r.height - 0.5).toFixed(3));
        pending = null;
      });
    }, { passive: true });
  }

  // Rigid → Elastic → Fluid glyphs take turns making their signature move
  const triadIcons = [...hero.querySelectorAll(".triad-pill .mat-ico")];
  let turn = 0;
  if (triadIcons.length) {
    setInterval(() => {
      if (heroVisible && !document.hidden) playIcon(triadIcons[turn++ % triadIcons.length]);
    }, 2600);
  }

  // The same moves answer a hover on any material pill
  document.querySelectorAll(".triad-pill, .filter-pill").forEach((pill) => {
    pill.addEventListener("pointerenter", () => {
      pill.querySelectorAll(".mat-ico").forEach((svg, i) => playIcon(svg, i * 90));
    });
  });

  // Wordmark letters wobble like jelly under the pointer
  const jelly = [
    { transform: "scale(1, 1)" },
    { transform: "scale(1.2, 0.78)", offset: 0.25 },
    { transform: "scale(0.88, 1.16) translateY(-8%)", offset: 0.5 },
    { transform: "scale(1.06, 0.95)", offset: 0.75 },
    { transform: "scale(1, 1)" },
  ];
  document.querySelectorAll(".phycove-wordmark span").forEach((letter) => {
    letter.addEventListener("pointerenter", () => {
      if (letter.getAnimations().length) return; // still dropping in, or already wobbling
      letter.animate(jelly, { duration: 560, easing: "ease-out" });
    });
  });
}

/* ---------------- Scroll reveal ---------------- */
function initReveal() {
  if (!MOTION_OK || !("IntersectionObserver" in window)) return;

  const selector = [
    ".section-eyebrow", ".section-title", ".section-intro", ".task-intro", ".abstract-copy",
    ".showcase-shell", ".comparison-shell", ".paper-figure", ".table-card", ".task-equation",
    ".lb-toolbar", ".finding-card", ".citation-heading", "#citation-code",
  ].join(","); // the footer is left out: at the page end it can never clear the trigger line below
  const bigBlocks = ".showcase-shell, .comparison-shell, .paper-figure, .table-card, .task-equation";

  // Follow-ups once particular blocks have appeared
  const showcaseShell = document.getElementById("showcase-shell");
  showcaseShell?.addEventListener("revealed", () => {
    showcaseShell.querySelectorAll(".filter-pill .pill-count").forEach((el) => countUp(el, 1200));
  });
  const oursRow = document.querySelector(".cmp-table .ours");
  oursRow?.closest(".table-card")?.addEventListener("revealed", () => {
    const base = getComputedStyle(oursRow).backgroundColor;
    oursRow.animate(
      [{ backgroundColor: base }, { backgroundColor: "#c2d9f0", offset: 0.3 }, { backgroundColor: base }],
      { duration: 1600, delay: 450, easing: "ease-out" }
    );
  });

  const io = new IntersectionObserver(
    (entries) => {
      // Blocks that arrive together (a heading group, a row of cards) are staggered in reading order
      const entering = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) =>
          a.boundingClientRect.top - b.boundingClientRect.top ||
          a.boundingClientRect.left - b.boundingClientRect.left);
      entering.forEach((e, i) => {
        const el = e.target;
        io.unobserve(el);
        const dir = e.boundingClientRect.top < 0 ? -1 : 1; // entering from above when scrolling back up
        const isPop = el.classList.contains("section-eyebrow");
        const isBig = el.matches(bigBlocks);
        const start = isPop
          ? "scale(.7)"
          : isBig ? `translateY(${30 * dir}px) scale(.98)` : `translateY(${18 * dir}px)`;
        el.animate([{ opacity: 0, transform: start }, { opacity: 1, transform: "none" }], {
          duration: isBig ? 800 : 650,
          delay: Math.min(i, 6) * 80,
          easing: isPop ? EASE_SPRING : EASE_OUT,
          fill: "backwards", // holds the hidden frame through the stagger delay
        });
        el.classList.remove("reveal");
        el.dispatchEvent(new CustomEvent("revealed"));
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );

  const viewportH = window.innerHeight;
  for (const el of document.querySelectorAll(selector)) {
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) continue; // inside a hidden leaderboard tab
    if (r.top < viewportH) continue; // already on screen or above it: leave as is
    if (el.parentElement.closest(".reveal")) continue; // animate the outer block only
    el.classList.add("reveal");
    io.observe(el);
  }
}

/* ---------------- Boot ---------------- */
initHeroMotion();
initReveal();
initHeader();
initCitation();
initLeaderboard();
initSubmissionModal();
initShowcase();
initComparisons();
