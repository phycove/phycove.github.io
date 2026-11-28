# PhyCoVE Leaderboard Submissions

This directory stores approved community submissions to the **PhyCoVE Leaderboard** (`https://phycove.github.io/#leaderboard`).

## How to Submit

### Option 1: Web Form -> GitHub Issue (Recommended)
1. Click **Submit Results** on `https://phycove.github.io/#leaderboard`.
2. Fill in your model metadata, evaluation metrics (from the [official evaluation toolkit](https://github.com/Hammour-steak/PhyCoVE)), and a link to your evaluation logs or generated videos for verification.
3. Click **Open GitHub Issue** to submit. GitHub Actions validates your submission automatically.
4. Once a maintainer reviews your entry and adds the `approved` label, the leaderboard updates automatically.

### Option 2: Pull Request
1. Copy `submissions/example_submission.json` to `submissions/<your-model-slug>.json` and fill in your scores.
2. Open a Pull Request to `main`. GitHub Actions validates the JSON schema automatically.
3. Once a maintainer merges the PR, `assets/data/leaderboard.json` and the live site update automatically.

## Maintainer Review Workflow
- **Issue submissions**: Check the auto-generated validation summary and evidence link.
  - Add label **`approved`** -> automatically commits `submissions/<slug>.json`, updates `assets/data/leaderboard.json`, closes the issue, and deploys GitHub Pages.
  - Also add label **`verified`** (before or alongside `approved`) -> marks the entry with a verified badge on the leaderboard.
- **PR submissions**: Review the diff and click **Merge pull request** -> GitHub Actions automatically syncs `assets/data/leaderboard.json`.
