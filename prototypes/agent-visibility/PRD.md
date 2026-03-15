# Agent Ops Studio PRD (v1.0)

## 1. Product Vision
让用户在 3 秒内回答三个问题：
1) 我现在在做什么？
2) 为什么做这一步？
3) 如果有风险，我该怎么介入？

这是一个“可观测 + 可控 + 可回放”的实时 Agent 操作台，不是纯数据大盘，也不是纯动画展示。

## 2. Problem Statement
当前版本的问题：
- 视觉叙事偏娱乐化，任务语义不够清晰
- 动画与真实事件绑定不稳定，用户难以信任
- 风险、审批、失败恢复路径不够产品化

## 3. Target Users
- 主操作者（Owner）：希望像看“控制塔”一样看懂系统状态
- 协作者（Operator）：负责异常排查和审批
- 开发者（Builder）：调试工具调用链与性能

## 4. Design Principles
- 真相优先：所有动画必须由真实事件驱动
- 语义可读：每个状态具备“动作 + 目的 + 结果”
- 介入可达：高风险动作一跳可审批/暂停
- 渐进披露：先看全局，再看单 Agent 细节

## 5. Core Scenarios
### S1 实时观察
- 看到活跃 Agent、当前步骤、已耗时、最近工具输出

### S2 风险干预
- 在 `approval.required` 或高风险事件出现时，快速暂停/确认

### S3 失败诊断
- 从失败事件回溯到工具调用、输入参数、错误输出

### S4 多 Agent 协作理解
- 明确谁在执行、谁在等待、谁阻塞

## 6. Information Architecture
### A. 顶部控制栏
- 会话选择器（sessionKey）
- 全局状态（RUNNING/PAUSED/FAILED/COMPLETED）
- Pause / Resume / Stop
- 实时连接状态（SSE connected/disconnected）

### B. 中央主画布（Ops Studio）
- **Agent 泳道卡（Lane）**：Main / Research / Builder
- **工坊节点（Station）**：Planning、Search、Build、Verify、Delivery
- 动画规则：
  - executing: 脉冲高亮 + 连接线流动
  - queued: 队列标签轻微浮动
  - idle: 低频呼吸
  - blocked: 红色闪烁边框
  - scheduled trigger: 铃铛扩散波纹

### C. 左侧时间流（Timeline）
- 按时间倒序展示 step/tool/cost/risk/file 事件
- 支持过滤：all / tool / risk / file / error

### D. 右侧检查器（Inspector）
- 当前事件详情（why/out/next）
- 风险等级与原因
- 资源指标（elapsed/tokens/cost/retry）
- 产物列表（文件、截图、报告）

## 7. Event Contract (Real-time)
输入源：OpenClaw session JSONL 实时增量解析

统一前端事件：
```json
{
  "event": "tool.started",
  "title": "调用工具: write",
  "risk": "medium",
  "payload": {
    "agentId": "agent-r2",
    "why": "执行当前步骤所需操作",
    "out": "write -> prototypes/agent-visibility/index.html",
    "next": "等待工具输出"
  }
}
```

必备事件类型：
- `session.started | session.completed | session.failed`
- `step.started | step.completed`
- `tool.started | tool.completed | tool.error`
- `approval.required`
- `queue.updated`
- `file.changed | artifact.created`
- `cost.updated`

## 8. Status Mapping Rules
- `tool.started` -> 对应 Agent 进入 `executing`
- `tool.completed` -> Agent 短暂 `walking`, 然后 `idle`
- `tool.error` / `session.failed` -> `blocked`
- `queue.updated` -> 更新该 Agent 队列
- `approval.required` -> 全局 risk 面板升为 high
- `cost.updated` -> KPI 实时刷新

## 9. UX Interaction Spec
- 点击时间线条目：右侧 Inspector 定位到该事件详情
- 点击 Agent 泳道：过滤出该 Agent 的事件
- 鼠标悬停工坊节点：显示最近一次输入输出摘要
- 断连状态：顶部显示 `DISCONNECTED` 且主画布暂停动画

## 10. MVP Scope (v1)
In scope:
- 真实事件流驱动的 Ops Studio 画布
- 多 Agent 泳道 + 工坊节点状态动画
- 时间线过滤与 Inspector 联动
- 风险提示与基础控制（pause/resume/stop）
- KPI 与产物区

Out of scope:
- 历史报表 BI
- RBAC 权限系统
- 跨租户多工作空间管理

## 11. Success Metrics
- 状态识别时间（TTS） <= 3 秒
- 风险事件响应时间 <= 10 秒
- 失败定位时间降低 40%
- 主观可理解性评分 >= 4/5

## 12. Delivery Plan
- D1: 事件模型稳定化 + UI 框架
- D2: 工坊动画与状态映射
- D3: 时间线过滤 / Inspector 联动
- D4: 稳定性测试（断连/错误/高频事件）
