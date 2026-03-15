# Agent Visibility Version Audit (2026-03-15)

## Objective
Give a full, decision-ready inventory of major versions and features before redesign.

## Version Timeline (newest -> oldest)

- c4bf36a: Restore warm yellow theme variant for screenshots
- efb264e: Stable v2 console UI, explicit sync diagnostics
- cfabd0d: Reduce command noise, trim verbose logs
- 1ad2b2a: Filter metadata noise, harden recent/log rendering
- e16223e: Reset to stable core UX (commands/logs/skills)
- 4844763: Fix sync gaps (include Feishu commands)
- 7e01180: Add Browserwing tab and dispatch templates
- 83274de: Preload recent events on first load
- b25f026: Better command sync via assistant reply parsing
- 33396d8 / c8dfac6: Skills freeze fixes and fallback viewer
- c2769f3 / e7c16e3 / 1f18ff2: Vue command progress + richer skill workbench
- f63eb0f: Login auth + real command dispatch bridge
- f1509e2 / 3c09e29: Skills explorer + command dispatch panel + control actions
- 3bcbae6 / f56d124 / 96a8c7a: Third-person pixel scene and animation polish
- c7b0934 / 935570e: Approvals backend + replay + diagnostics + desk actor
- 4b35dc4 / dcc92e9 / 09f838a: Single-agent storytelling + chat-like timeline
- a88be66: PRD + redesign direction update
- ca96b24: Switch SSE to real OpenClaw session stream
- f2f8d9c: Deployable static server + SSE endpoint
- eaa1131 / 4bf6c51 / 978dcf1 / 0804173: Early workshop/multi-agent prototype era

## Feature Inventory By Domain

### A) Runtime/Data (keep as baseline)

- Real session file tailing from OpenClaw JSONL
- SSE live push (`/api/agent-events`)
- Recent preload endpoint (`/api/events/recent`)
- Event normalization (`parseLine`) and canonical mapping

### B) Command & Sync (keep, but refactor)

- `/api/control` command intake
- `/api/commands` status query
- Dispatch to real OpenClaw CLI session
- Feishu-origin command syncing into Studio
- "urgent" action flag support

Known gaps:

- No strict command-event correlation key
- No true preemptive priority queue
- Possible duplicate/incorrect progress attribution

### C) Reliability/Observability (keep)

- Diagnostics strip (SSE/recent/commands/skills/last event)
- Log panel and command panel separation
- Approval persistence and event broadcast

### D) Skills Workbench (keep lightweight mode)

- Skills list/detail/source endpoints
- Stable fallback viewer (no heavy editor dependency)

### E) Auth/Security (must improve)

- Login gate and auth checks exist
- Hardcoded credentials in code (must remove)
- Cookie/session policy needs hardening

### F) UI/Experience (choose one style track)

- Pixel immersive storytelling track (scene/avatar/desk)
- Operational command-center track (v2 console)
- Warm yellow and blue variants both exist

## Suggested Keep / Remove Matrix (for decision)

### Keep (core)

- Real SSE + recent preload + command/log separation
- Command dispatch with visible progress lifecycle
- Stable Skills browser (list/detail/source)
- Diagnostics top bar
- Auth gate

### Remove / Defer

- Heavy editor integrations until acceptance is stable
- High-animation scene layers unless explicitly selected
- Replay/skins/advanced gimmicks before command correctness

### Rebuild First (high priority)

- Command state machine with strict correlation id
- Priority queue semantics (urgent truly preemptive)
- Idempotent event handling + de-duplication
- Storage update lock/atomic writes

## Redesign Proposal (Phase Plan)

### Phase 1: Trustworthy Core

- One command id through all transitions
- Deterministic status machine: queued -> running -> done/failed
- True urgent queue behavior
- Clean and bounded logs

### Phase 2: Operator UX

- Filtered command views (source, status, urgent)
- Better failure reasons and retry actions
- Approval links to impacted command id

### Phase 3: Visual Layer

- Re-apply chosen visual style (yellow pixel or command center)
- Keep observability overlays always visible

## What to Decide Now

1) Visual direction: Pixel narrative vs command-center
2) Urgent semantics: preemptive vs front-of-queue-only
3) Skills mode: readonly stable vs inline edit
4) Replay/advanced features: now vs post-acceptance

