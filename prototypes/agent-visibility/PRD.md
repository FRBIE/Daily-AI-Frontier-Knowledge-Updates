# Agent Visibility PRD (vNext Frozen)

## 1. Product Goal
在 3 秒内让用户明确三件事：
1) 当前在执行什么命令
2) 命令执行到哪一步
3) 出问题时如何立即介入

该版本聚焦“可信可控的命令中台”，先保证稳定与可验收，再做视觉增强。

## 2. Scope Freeze

### In Scope (must ship)
- 真实事件链路：`/api/agent-events` + `/api/events/recent`
- 命令中心：下发、状态、进度、结果
- 诊断条：`SSE / Recent / Commands / Skills / Last Event`
- Logs 与 Commands 分区展示（互不污染）
- Skills 轻量工作台（`list/detail/source` 只读）
- 登录门禁（后续单独做安全加固）
- urgent 语义：`front-of-queue`（高优先先执行，不中断当前步骤）

### Out of Scope (defer)
- 重动画像素演出层
- Monaco 重编辑能力
- 回放/皮肤/特效系统
- 实验性装饰面板
- 非主链路炫技交互

## 3. UX Direction
- 视觉方向：暖黄色命令中台（稳定、易读、可截图）
- 结构：顶部诊断 + 命令中心 + 日志中心 + Skills + Browserwing
- 原则：信息密度优先于动画；每条状态必须可解释

## 4. Functional Requirements

### FR-1 实时链路可信
- 首屏必须先加载 recent，避免空白
- SSE 连接状态明确显示（INIT/CONNECTED/DISCONNECTED）
- recent 与 live 事件可并存，不造成重复污染

### FR-2 命令生命周期可追踪
- 命令状态机：`queued -> running -> done|failed`
- 每条命令展示：`source/status/progress/lastEvent/result`
- 支持过滤：`all/running/done/failed/feishu/studio`

### FR-3 紧急插队（v1定义）
- urgent 命令进入高优先队列
- 若当前步骤已在执行，不中断；当前步骤结束后先执行 urgent
- UI 必须显示 urgent 标记与优先执行次序

### FR-4 日志可读可控
- 截断超长输出，避免刷屏
- 单条异常不应导致日志区整体崩溃
- 日志与命令分开，避免“命令视图被日志噪声污染”

### FR-5 Skills 稳定可用
- `GET /api/skills` 返回非空时可浏览
- `detail/source` 失败时局部报错，不影响整体页面

## 5. Backend Requirements

### BR-1 命令关联
- 引入稳定关联键（command id）贯穿控制下发、事件更新、完成判定
- 禁止“最后一条 running 命令”这种模糊归因

### BR-2 写入一致性
- `commands.json` 持久化需避免并发覆盖（串行写或原子替换）
- 控制日志和命令快照保持一致

### BR-3 噪声过滤
- 继续过滤 transport metadata（untrusted envelope/media wrapper）
- 保留真实短命令（不要误伤）

### BR-4 安全（本期最低要求）
- 保留现有登录门禁
- 将硬编码账号迁移到环境变量（本期可先兼容默认值）

## 6. API Contract (vNext)
- `POST /api/control`
  - `action: dispatch_command | dispatch_command_urgent`
  - 返回 `{ command, dispatched }`
- `GET /api/commands`
  - 返回命令列表（含 `priority`, `status`, `progress`, `lastEvent`, `updatedAt`）
- `GET /api/events/recent`
- `GET /api/agent-events` (SSE)
- `GET /api/skills`
- `GET /api/skills/detail`
- `GET /api/skills/source`

## 7. Acceptance Criteria

### AC-1 同步一致
- Feishu 发出的真实命令在 Studio 2 秒内可见
- Studio 发出的命令在会话中可执行并回流状态

### AC-2 首屏可见
- 登录后 1 秒内日志区出现 recent 数据（非空场景）

### AC-3 Skills 稳定
- Skills 页面不冻结、不空白；至少可查看 detail/source

### AC-4 紧急策略可验证
- 同时存在普通命令与 urgent 命令时，urgent 在下一可执行时隙优先

### AC-5 诊断可定位
- 当用户反馈“不同步”时，可通过诊断条 + `/api/commands` + `/api/events/recent` 快速定位

## 8. Delivery Plan

### P1 (now)
- 范围冻结（本 PRD）
- 修复命令关联、去重、写入一致性

### P2
- 完成 urgent front-of-queue 实现
- 完成命令状态展示与失败原因完善

### P3
- 做回归验收（3项基线 + urgent）
- 通过后再评估像素叙事皮肤层

## 9. Non-Goals
- 本阶段不做“可中断抢占式执行引擎”
- 本阶段不做视觉炫技优先级高于稳定性的改动
