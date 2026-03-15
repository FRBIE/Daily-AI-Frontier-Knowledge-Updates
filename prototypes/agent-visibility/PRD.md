# Agent Visibility Console - Product Prototype (v0.1)

## 1. Problem
User cannot clearly see what the agent is doing in real time, causing:
- low trust ("did it actually do anything?")
- low controllability ("can I pause before risky operations?")
- hard debugging ("where did it fail?")

## 2. Goal
Build a visual, near-real-time interface that makes agent execution transparent and controllable.

Primary goal:
- answer within 3 seconds: "What is the agent doing now?"

Secondary goals:
- replay full execution path after completion
- surface risks before external/destructive actions
- correlate cost/time with task outcomes

## 3. Personas
- Operator (you): tracks progress, intervenes when needed
- Builder (dev): debugs prompts/tools/performance

## 4. Design Principles
- Progressive disclosure: first show high-level state, then drill down
- Explainability by default: every action has reason + evidence + output
- Safety-first UX: risky actions are highlighted before execution
- Human tempo: stream updates in chunks, not noisy token spam

## 5. Core Use Cases
1) Live watch
- see current step, tool call, elapsed time, and recent logs

2) Intervention
- pause/continue
- approve/deny risky action
- modify next instruction

3) Replay and diagnosis
- review timeline of steps and tool calls
- inspect inputs/outputs and failures

4) Cost and quality review
- token/cost/latency breakdown
- failure clusters and retry reasons

## 6. Information Architecture
Top bar:
- session selector
- global status (idle/running/blocked/completed)
- pause/resume button

Left pane (Execution Timeline):
- step cards in chronological order
- grouped by phase: plan -> fetch -> edit -> verify -> deliver

Center pane (Now Running):
- current action title
- reason (why this step)
- live stdout/tool output
- expected next action

Right pane (Controls + Risk):
- controls: pause, stop, approve, deny, edit instruction
- risk card: permission scope, external effect, confidence
- resource card: elapsed, tokens, cost, retries

Bottom pane (Artifacts):
- files changed
- snapshots/screenshots
- final answer draft

## 7. Event Model (for real-time UI)
Event schema (SSE/WebSocket):
```json
{
  "ts": "2026-03-15T15:20:10+08:00",
  "sessionId": "sess_123",
  "event": "tool.started",
  "stepId": "step_07",
  "title": "Reading PRD template",
  "payload": {
    "tool": "read",
    "path": "docs/template.md"
  },
  "risk": "low"
}
```

Recommended event types:
- session.started | session.completed | session.failed
- step.started | step.updated | step.completed
- tool.started | tool.output | tool.completed | tool.error
- approval.required | approval.granted | approval.denied
- file.changed | artifact.created
- cost.updated

## 8. v0 MVP Scope (2 weeks)
In scope:
- live timeline streaming
- current step panel
- animated workshop scene (multi-agent avatars + room states)
- idle/rest/work/walk state animations
- scheduled task bell/pulse cue
- basic controls: pause/resume/stop
- risky action approval modal
- simple metrics: elapsed + token + estimated cost

Out of scope:
- multi-agent graph view
- historical analytics dashboards
- custom role/permission system

## 9. Success Metrics
- Time-to-understand-current-state < 3s (p50)
- Intervention success rate > 90%
- Postmortem debugging time reduced by 40%
- User trust score +2 (5-point scale)

## 10. Reference Notes
Observed common patterns from public observability materials:
- Traces + timelines + monitoring + alerts are the core loop (LangSmith Observability page)
- Good observability uses traces/metrics/logs together (OpenTelemetry observability primer)

## 11. Next Build Plan
1. Wire frontend to a mock SSE stream
2. Map OpenClaw runtime events to the event schema above
3. Add approval gate for risky actions
4. Add persistent execution replay
