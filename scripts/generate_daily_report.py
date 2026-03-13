#!/usr/bin/env python3
import datetime as dt
import json
import os
import pathlib
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
DAILY_DIR = ROOT / "daily"
SNAPSHOT_DIR = ROOT / "data" / "snapshots"

REPOS = [
    ("anthropics/claude-code", "Claude Code"),
    ("openai/codex", "Codex CLI"),
    ("google-gemini/gemini-cli", "Gemini CLI"),
    ("opencode-ai/opencode", "OpenCode (archived)"),
]

CURSOR_CHANGES = [
    "Cursor added 30+ marketplace plugins from major SaaS partners.",
    "Cursor Automations now support scheduled and event-triggered cloud agents.",
    "Cursor can be used in JetBrains IDEs via ACP integration.",
]

CURSOR_CHANGES_ZH = [
    "Cursor 新增 30+ 个市场插件，覆盖多家主流 SaaS 生态。",
    "Cursor Automations 已支持定时与事件触发的云端代理。",
    "Cursor 通过 ACP 接入 JetBrains IDE。",
]


def http_get_json(url: str):
    req = urllib.request.Request(
        url,
        headers={
            "Accept": "application/vnd.github+json",
            "User-Agent": "daily-ai-frontier-bot",
        },
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def fetch_repo_snapshot(repo: str):
    base = f"https://api.github.com/repos/{repo}"
    info = http_get_json(base)
    releases = http_get_json(base + "/releases?per_page=1")
    latest = releases[0] if isinstance(releases, list) and releases else None
    return {
        "repo": repo,
        "description": info.get("description"),
        "stars": info.get("stargazers_count"),
        "forks": info.get("forks_count"),
        "open_issues": info.get("open_issues_count"),
        "updated_at": info.get("updated_at"),
        "pushed_at": info.get("pushed_at"),
        "archived": info.get("archived"),
        "latest_release": {
            "tag": latest.get("tag_name") if latest else None,
            "name": latest.get("name") if latest else None,
            "published_at": latest.get("published_at") if latest else None,
        },
    }


def load_previous_snapshot(today_key: str):
    if not SNAPSHOT_DIR.exists():
        return None
    all_days = sorted([p.name for p in SNAPSHOT_DIR.iterdir() if p.is_dir() and p.name < today_key])
    if not all_days:
        return None
    prev = SNAPSHOT_DIR / all_days[-1] / "snapshot.json"
    if not prev.exists():
        return None
    return json.loads(prev.read_text(encoding="utf-8"))


def format_delta(now_val, prev_val):
    if now_val is None or prev_val is None:
        return "n/a"
    d = now_val - prev_val
    if d == 0:
        return "0"
    return f"{d:+d}"


def main():
    tz = dt.timezone(dt.timedelta(hours=8))
    now = dt.datetime.now(tz)
    day = now.strftime("%Y-%m-%d")

    DAILY_DIR.mkdir(parents=True, exist_ok=True)
    (SNAPSHOT_DIR / day).mkdir(parents=True, exist_ok=True)

    snapshot = {
        "generated_at": now.isoformat(),
        "day": day,
        "repos": [],
        "cursor_signals_en": CURSOR_CHANGES,
        "cursor_signals_zh": CURSOR_CHANGES_ZH,
    }

    for repo, label in REPOS:
        data = fetch_repo_snapshot(repo)
        data["label"] = label
        snapshot["repos"].append(data)

    prev = load_previous_snapshot(day)
    prev_map = {}
    if prev:
        prev_map = {r["repo"]: r for r in prev.get("repos", [])}

    # write snapshot first
    (SNAPSHOT_DIR / day / "snapshot.json").write_text(
        json.dumps(snapshot, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    lines = []
    lines.append(f"# Daily AI Frontier Knowledge Update - {day}")
    lines.append("")
    lines.append("## TL;DR / 今日速览")
    lines.append("- EN: The coding-agent race is shifting from chat UX to automation + governance + ecosystem depth.")
    lines.append("- 中文：AI 编码代理竞争正从“聊天体验”转向“自动化 + 治理 + 生态深度”。")
    lines.append("- EN: Open-source terminal agents remain high-velocity; release cadence is now a core competitiveness signal.")
    lines.append("- 中文：开源终端代理仍在高速迭代，发布节奏本身已成为竞争力指标。")
    lines.append("")

    lines.append("## Repo Pulse (EN/ZH)")
    for r in snapshot["repos"]:
        p = prev_map.get(r["repo"], {})
        star_delta = format_delta(r.get("stars"), p.get("stars"))
        lines.append(f"### {r['label']} (`{r['repo']}`)")
        lines.append(f"- EN: Stars {r.get('stars')} ({star_delta} vs previous snapshot), forks {r.get('forks')}, open issues {r.get('open_issues')}.")
        lines.append(f"- 中文：Stars {r.get('stars')}（较上次快照 {star_delta}），forks {r.get('forks')}，未关闭 issue {r.get('open_issues')}。")
        rel = r.get("latest_release", {})
        if rel.get("tag"):
            lines.append(f"- EN: Latest release: {rel.get('tag')} ({rel.get('published_at')}).")
            lines.append(f"- 中文：最新发布：{rel.get('tag')}（{rel.get('published_at')}）。")
        if r.get("archived"):
            lines.append("- EN: This repository is archived; track successor projects for active momentum.")
            lines.append("- 中文：该仓库已归档，需关注其后继项目的持续活跃度。")
        lines.append("")

    lines.append("## Cursor Public Signals (EN/ZH)")
    for en, zh in zip(CURSOR_CHANGES, CURSOR_CHANGES_ZH):
        lines.append(f"- EN: {en}")
        lines.append(f"- 中文：{zh}")
    lines.append("")

    lines.append("## Why It Matters / 影响解读")
    lines.append("- EN: Winners in 2026 are likely the platforms that combine high model quality with reliable operations (policy, auditability, memory stability).")
    lines.append("- 中文：2026 年的胜者更可能是“模型能力 + 运行可靠性（策略、审计、内存稳定）”兼备的平台。")
    lines.append("- EN: Teams should benchmark tools by long-session reliability, policy control, and integration depth, not only by demo quality.")
    lines.append("- 中文：团队选型应优先比较长会话稳定性、策略可控性与生态集成深度，而不是只看 demo 效果。")
    lines.append("")

    lines.append("## Sources")
    lines.append("- https://api.github.com/repos/anthropics/claude-code")
    lines.append("- https://api.github.com/repos/openai/codex")
    lines.append("- https://api.github.com/repos/google-gemini/gemini-cli")
    lines.append("- https://api.github.com/repos/opencode-ai/opencode")
    lines.append("- https://cursor.com/changelog")
    lines.append("")

    report = "\n".join(lines).rstrip() + "\n"
    (DAILY_DIR / f"{day}.md").write_text(report, encoding="utf-8")


if __name__ == "__main__":
    main()
