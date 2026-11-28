---
name: Leaderboard Submission
about: Submit a model's evaluation results to the PhyCoVE Leaderboard
title: "[Leaderboard] <Model Name>"
labels: leaderboard-submission
assignees: ''
---

### PhyCoVE Leaderboard Submission

> Tip: You can also use the interactive **Submit Results** form at https://phycove.github.io/#leaderboard to generate this issue automatically.

- **Model**: `<Model Name>` (`Open-source` or `Commercial API`)
- **Organization**: `<Lab / Company>`
- **Model / Paper URL**: `https://...`
- **Verification / Predictions URL**: `https://...` (link to evaluation logs or generated videos for maintainer review)

### Submission Payload

```json
{
  "name": "ExampleModel-v1",
  "org": "Example Lab",
  "url": "https://arxiv.org/abs/2611.29184",
  "evidence_url": "https://huggingface.co/datasets/your-org/phycove-predictions",
  "group": "open",
  "date": "2026-11-27",
  "notes": "Evaluated on all 533 cases with the official PhyCoVE scripts.",
  "overall": {
    "cf": 0.165,
    "ea": 2.45,
    "pc": 4.40,
    "joint": 14.2,
    "miou": 0.352,
    "psnr": 27.10,
    "ssim": 0.875,
    "lpips": 0.098,
    "fvd": 94,
    "hpwr": null
  }
}
```
