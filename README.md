# Daily AI Frontier Knowledge Updates

每日 AI 前沿知识速递（由 OpenClaw + GitHub Actions 定时生成并自动推送）。

## Features
- 每日自动更新（默认北京时间 09:05）
- 中英对照输出（EN / 中文）
- 自动采集并留存快照（可审计）
- 自动 commit + push 到仓库

## Structure
- `daily/YYYY-MM-DD.md`: 每日速递正文（中英对照）
- `data/snapshots/YYYY-MM-DD/snapshot.json`: 当日结构化数据快照
- `scripts/generate_daily_report.py`: 日报生成脚本
- `.github/workflows/daily-update.yml`: 定时流水线配置

## Trigger
- 定时：每天 09:05（Asia/Shanghai）
- 手动：GitHub Actions -> Daily AI Frontier Update -> Run workflow
