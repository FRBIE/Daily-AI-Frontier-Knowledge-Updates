# HEARTBEAT.md

Heartbeat checklist (AI frontier updates):

1) Collect 3-5 high-signal AI updates from credible sources (official model/lab blogs, major product release notes, top research/org announcements).
2) Write a daily markdown note to `inbox/daily-ai-frontier-YYYY-MM-DD.md` with:
   - Title + date
   - 3-5 bullets (what happened + why it matters, 1-2 lines each)
   - Source links
3) Sync to GitHub repo `FRBIE/Daily-AI-Frontier-Knowledge-Updates`:
   - `git add -A`
   - `git commit -m "daily ai frontier: YYYY-MM-DD"` (skip commit when no changes)
   - `git push origin master`
4) Send a plain-text Feishu summary to the user in this format:
   - Date line
   - Top 3 updates (one line each)
   - End with `已同步到 GitHub` or failure reason.

If there is no meaningful new update since last run, do not spam. Reply `HEARTBEAT_OK`.
