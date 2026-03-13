# AI Coding Agents 竞争格局与趋势报告（2026-03）

日期：2026-03-13
目标：对比 Claude Code、Cursor、Codex CLI、Gemini CLI、OpenCode（及其演进）并补充近期“潮流/新闻”

---

## 0) 核心结论（先看这段）

- **第一梯队形态正在收敛：** 都在向“终端 Agent + 云端自动化 + MCP/插件生态 + 企业治理”靠拢。
- **Claude Code 的强项：** 工程稳定性和治理深度（权限、hooks、worktree、长会话内存治理）非常突出。
- **Cursor 的强项：** “云代理自动化 + 企业连接器 + IDE 覆盖”推进非常快，产品扩张速度极高。
- **Codex CLI / Gemini CLI 的强项：** 开源势能和社区规模很强，发布频率高，生态扩展快。
- **OpenCode：** 原仓库已归档并迁移到 Crush，说明“品牌与形态迭代”在该赛道非常快。

一句话：**这场竞争已经从“谁更聪明”升级为“谁更像可运营的 AI 工程平台”。**

---

## 1) 竞品对比（你关心的几家）

## 1.1 Claude Code（Anthropic）

定位：终端原生 Agent，强调工程可控与长期可用。

你最该关注的能力：
- 权限/策略治理（ask/allow/deny、managed policy）
- hooks / plugin / MCP / worktree / subagent 的系统化整合
- 长会话稳定性（大量 memory leak / cache / compaction 修复）

量化信号（来自官方 changelog 全量统计）：
- 版本：238（0.2.21 -> 2.1.74）
- 变更条目：1520
- 其中 Fixed 595、Added 242、Improved 154
- 安全/权限相关命中约 156，MCP 约 101，Subagent 约 121

结论：**基础设施级打磨非常重，偏“能长期跑”的路线。**

---

## 1.2 Cursor

定位：IDE + 云 Agent + 企业自动化平台。

近期公开动向（2026-03 changelog/blog）：
- 新增大量 Marketplace 插件（含 Atlassian、Datadog、GitLab、Hugging Face 等）
- 推出 Automations（定时/事件触发，连接 Slack/Linear/GitHub/PagerDuty/Webhook）
- JetBrains 侧通过 ACP 接入
- Bugbot Autofix 强调“自动修复 PR 问题并回传变更”

结论：**产品“外延”速度很强，正在把 IDE 助手推成“组织级自动化代理层”。**

---

## 1.3 Codex CLI（OpenAI）

定位：本地终端 Agent + IDE/网页协同（Codex Web / App）。

可观测信号（GitHub）：
- repo: `openai/codex`
- stars: 65k+，forks: 8k+
- 近期仍在高频更新（alpha release 持续滚动）

结论：**开源热度高，和 OpenAI 生态联动强，适合“本地 CLI + 云端产品”双栈人群。**

---

## 1.4 Gemini CLI（Google）

定位：开源终端 Agent，强调 Gemini 模型能力与工具集成。

可观测信号（README/GitHub）：
- repo: `google-gemini/gemini-cli`
- stars: 97k+，forks: 12k+
- README 强调：1M context、Google Search grounding、MCP、终端优先
- 发布节奏有 nightly

结论：**社区规模与开源势能非常强，适合“Google 生态 + 大上下文 + CLI”用户。**

---

## 1.5 OpenCode（及现状）

现状：`opencode-ai/opencode` 仓库已标注归档，项目迁移到 **Crush**（由作者与 Charm 团队继续）。

意义：
- 该方向不是消失，而是“品牌/产品形态再聚合”
- 终端 Agent 赛道仍在高速重组

结论：**看这个方向要盯“持续维护主体”，不只看历史星数。**

---

## 2) 横向评分（实战视角）

说明：10 分制，基于公开信息与工程可观测信号，偏“生产可用”维度。

- Claude Code
  - 工程稳定性：9.0
  - 安全治理：9.2
  - 自动化编排：8.8
  - 生态扩展：8.4
  - 综合：8.9

- Cursor
  - 工程稳定性：8.4
  - 安全治理：8.3
  - 自动化编排：9.3
  - 生态扩展：9.2
  - 综合：8.8

- Codex CLI
  - 工程稳定性：8.2
  - 安全治理：8.0
  - 自动化编排：8.1
  - 生态扩展：8.8
  - 综合：8.3

- Gemini CLI
  - 工程稳定性：8.1
  - 安全治理：7.9
  - 自动化编排：8.2
  - 生态扩展：9.0
  - 综合：8.3

- OpenCode/Crush 线
  - 工程稳定性：7.2
  - 安全治理：7.0
  - 自动化编排：7.6
  - 生态扩展：7.8
  - 综合：7.4

注：这是“当前可见能力密度”评分，不是最终胜负预测。

---

## 3) 你要的“潮流 + 新闻”摘要（近期）

## 3.1 赛道潮流（2026 Q1）

1. **从单次对话到持续运行**：Automations、Loop、Cron、Background Agent 成主线。
2. **从本地工具到组织系统**：权限策略、审计、团队市场、私有插件分发成为刚需。
3. **MCP/插件成为统一扩展层**：谁掌握扩展协议，谁就掌握生态杠杆。
4. **评测体系升级**：不再只比 benchmark，开始比“真实开发闭环效率”（PR 修复率、自动修复合并率）。
5. **多入口融合**：Terminal + IDE + Cloud Agent + Remote Control 正在合流。

## 3.2 可观测新闻线索

- Cursor：
  - 新增 30+ 插件与 Marketplace 扩张
  - Automations 上线（触发器/事件驱动）
  - JetBrains ACP
  - Bugbot Autofix（PR 自动修复）

- Anthropic：
  - 发布 Sonnet 4.6（强调 coding/agents）
  - Claude Code changelog 高频迭代，重心在稳定性、安全、MCP 与多代理治理

- 开源社区：
  - Codex CLI / Gemini CLI 持续高活跃更新
  - “围绕 Agent 的二级应用”爆发（多 Agent 调度、消息桥接、记忆系统、技能分发）

---

## 4) 对你最实用的判断框架

如果你只看“谁更潮”，容易误判。建议你用这 5 个问题筛：

1. 这个工具能不能连续跑 8 小时还稳？
2. 权限策略是否可审计、可收敛？
3. 是否支持你团队现有系统（GitHub/Slack/工单/监控）？
4. 失败后能否恢复（会话、任务、缓存、上下文）？
5. 升级成本是否可控（默认行为突变少、回归清单清晰）？

谁在这 5 项上长期表现更好，谁才是“能押注的开创者”。

---

## 5) 给你的策略建议（直接可执行）

- **双栈策略最稳：**
  - 主力：Claude Code 或 Cursor（看你偏“工程治理”还是“自动化生态扩张”）
  - 观察位：Codex CLI + Gemini CLI（跟踪模型与开源迭代红利）

- **月度复盘机制：**
  - 每月做一次“升级回归 + 失败复盘 + 成本复盘”
  - 把“可用时长、修复闭环率、误操作率”当核心 KPI

- **避免单工具锁死：**
  - 关键流程尽量协议化（MCP、标准 Git 工作流、可迁移的 skills/hook）

---

## 6) 参考来源（本次检索）

- Claude Code changelog / repo
  - https://code.claude.com/docs/en/changelog
  - https://github.com/anthropics/claude-code
- Cursor changelog / blog
  - https://cursor.com/changelog
  - https://cursor.com/blog
- Codex CLI
  - https://github.com/openai/codex
- Gemini CLI
  - https://github.com/google-gemini/gemini-cli
- OpenCode
  - https://github.com/opencode-ai/opencode
- Anthropic News
  - https://www.anthropic.com/news

---

如需，我下一版可以给你做成：
- “老板 5 分钟版”（1 页图表）
- “技术负责人版”（含选型决策矩阵与迁移成本）
- “投资观察版”（护城河、网络效应、风险清单）
