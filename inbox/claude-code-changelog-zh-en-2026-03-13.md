# Claude Code Changelog Digest (EN/ZH)

Source:
- https://code.claude.com/docs/en/changelog
- https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

Date: 2026-03-13 (Asia/Shanghai)
Scope: Recent updates from `2.1.74` down to `2.1.47`

---

## How to read this doc
- **EN (raw key changes):** condensed from official changelog
- **中文翻译:** 对应中文解释
- **What to watch:** 每次升级最值得重点验证的点（团队/个人都适用）

---

## 2.1.74

**EN (raw key changes)**
- Added actionable suggestions in `/context` (finds context bloat/capacity issues)
- Added `autoMemoryDirectory`
- Fixed major memory leak in streaming API buffer lifecycle
- Fixed managed policy `ask` rule bypass by user allow/skill allowed-tools
- Fixed full model IDs ignored in agent `model:` and `--agents` JSON
- Multiple MCP OAuth + plugin + RTL/Windows/LSP fixes

**中文翻译**
- `/context` 现在会给出可执行优化建议（识别上下文膨胀、内存膨胀、容量告警）
- 新增 `autoMemoryDirectory`，可自定义自动记忆目录
- 修复流式响应缓冲区未释放导致的内存泄漏（RSS 持续增长）
- 修复托管策略里 `ask` 被用户/skill 规则绕过的策略漏洞
- 修复 agent 配置里完整模型 ID 被静默忽略的问题
- 修复多项 MCP OAuth、插件、RTL 文本和 Windows LSP 问题

**What to watch**
- 策略合规：重点回归 `ask/allow/deny` 是否按组织策略生效
- 内存稳定性：长会话和高并发流式响应是否仍增长异常
- agent 模型选择：`model:` 是否按预期准确生效

---

## 2.1.73

**EN (raw key changes)**
- Added `modelOverrides` for custom provider model mapping
- Better OAuth SSL error guidance (proxy/CA scenarios)
- Fixed freezes/100% CPU loops from permission prompts
- Fixed deadlock when many skill files changed
- Fixed subagent model downgrade on Bedrock/Vertex/Foundry
- Improved startup/voice/input reliability; default Opus on cloud providers moved to 4.6

**中文翻译**
- 新增 `modelOverrides`，支持模型映射到云厂商自定义 ID
- OAuth/SSL 失败时给出更可执行的诊断提示（代理/证书链）
- 修复权限弹窗导致卡死和 CPU 100% 的问题
- 修复大量 skill 文件变更时死锁
- 修复子代理在多云平台被降级到旧模型的问题
- 优化启动、语音、输入稳定性；部分平台默认 Opus 升到 4.6

**What to watch**
- 多云部署：核对模型路由和实际落地模型版本
- 企业网络：代理+自签证书环境 OAuth 是否稳定
- 大仓库：`git pull` 后 skill 重载是否流畅

---

## 2.1.72

**EN (raw key changes)**
- Added `/copy` write-to-file shortcut (`w`)
- Added optional `/plan` description argument
- Added `ExitWorktree` tool and `CLAUDE_CODE_DISABLE_CRON`
- Simplified effort levels to low/medium/high
- Improved command parsing and removed memory leak in bash parser path
- Many fixes in hooks, permissions, background tasks, queued messages, parallel tool behavior

**中文翻译**
- `/copy` 增加 `w`，可直接写文件（SSH 场景很实用）
- `/plan` 支持直接带描述启动
- 增加 `ExitWorktree` 工具与停用 cron 的环境变量
- effort 档位简化为 low/medium/high
- 改进命令解析并修复相关内存泄漏
- 大量修复 hooks、权限匹配、后台任务、并行工具调用等稳定性问题

**What to watch**
- 权限系统：通配符、heredoc、多行命令的匹配是否准确
- 多任务会话：后台任务与 `/clear`、队列消息是否正常
- worktree：进出隔离工作树流程是否完整

---

## 2.1.71

**EN (raw key changes)**
- Added `/loop` recurring command execution
- Added in-session cron scheduling tools
- Added `voice:pushToTalk` rebind support
- Improved startup/reconnect behavior and plugin handling
- Fixed multiple freezes, connector issues, and background result recovery issues

**中文翻译**
- 新增 `/loop`，可周期执行提示词/命令
- 会话内新增 cron 调度能力
- 语音按键可重绑
- 改善启动与睡眠唤醒后的重连速度
- 修复多类卡顿、连接器、插件和后台结果恢复问题

**What to watch**
- 自动化任务：循环任务是否会误触发或重复触发
- 睡眠唤醒：笔记本唤醒后连接恢复速度
- 后台 agent：完成通知里输出路径是否可追踪

---

## 2.1.70

**EN (raw key changes)**
- Fixed API 400 issues with proxy/base URL/tool search interactions
- Fixed custom model identifiers not supporting effort parameter
- Fixed several voice/Windows/VSCode UX issues
- Improved compaction image preservation and render performance
- Added richer VSCode session and MCP management UX

**中文翻译**
- 修复代理/网关场景下 tool search 导致的 API 400
- 修复自定义模型 ID 下 effort 参数报错
- 修复语音、Windows、VSCode 若干交互问题
- 改进压缩时图像保留与渲染性能
- VSCode 增强会话和 MCP 管理体验

**What to watch**
- 代理网关：`ANTHROPIC_BASE_URL` 环境是否稳定
- 自定义模型：effort 参数兼容性
- VSCode 用户：MCP 管理和会话列表是否更顺手

---

## 2.1.69

**EN (raw key changes)**
- Added many enterprise/admin/plugin controls (trust message, strict marketplaces, oauth metadata URL)
- Added `${CLAUDE_SKILL_DIR}` and hook metadata fields (`agent_id`, `agent_type`, `worktree`)
- Fixed nested-skill discovery security issue (gitignored dirs like node_modules)
- Fixed symlink write bypass in `acceptEdits` mode
- Fixed many memory leaks and long-session stability issues

**中文翻译**
- 增强企业和插件治理能力（信任提示、严格市场规则、OAuth 元数据地址）
- 新增 `${CLAUDE_SKILL_DIR}` 和更多 hook 上下文字段
- 修复嵌套 skill 发现的安全问题（误加载 gitignored 目录）
- 修复 `acceptEdits` 模式下通过符号链接越权写入
- 大量修复长会话内存泄漏与稳定性问题

**What to watch**
- 安全红线：符号链接、skill 扫描边界、域名白名单
- 企业管控：managed settings 是否确实覆盖本地设置
- 长会话：多小时运行内存曲线是否平稳

---

## 2.1.68 / 2.1.66

**EN (raw key changes)**
- 2.1.68: Opus 4.6 defaults adjusted; “ultrathink” reintroduced; older Opus versions removed on first-party API
- 2.1.66: Reduced spurious error logging

**中文翻译**
- 2.1.68：默认 effort 策略调整；恢复 ultrathink；旧 Opus 版本下线迁移
- 2.1.66：减少无意义错误日志

**What to watch**
- 模型迁移：固定版本配置是否被自动迁移
- 日志可观测性：噪音下降后是否仍足够定位问题

---

## 2.1.63

**EN (raw key changes)**
- Added `/simplify` and `/batch` bundled commands
- Added HTTP hooks (JSON in/out over HTTP)
- Added opt-out for Claude.ai MCP servers
- Multiple listener/cache memory leak fixes
- Fixed stale skill cache after `/clear`

**中文翻译**
- 新增 `/simplify`、`/batch` 内置命令
- 新增 HTTP hooks（可通过 HTTP 收发 JSON）
- 可禁用 Claude.ai MCP servers
- 修复大量监听器/缓存泄漏
- 修复 `/clear` 后 skill 缓存未刷新问题

**What to watch**
- Hook 安全：HTTP hook 的目标地址、鉴权和重试策略
- 会话重置：`/clear` 后上下文是否真的“干净”
- 内存：监听器数量是否持续增长

---

## 2.1.59 → 2.1.50（合并看点）

**EN (raw key changes)**
- Auto-memory, `/copy`, better always-allow suggestions
- `claude remote-control` improvements and security hardening
- Tool result spill-to-disk threshold lowered (50K)
- Added `--worktree`, agent worktree isolation, `claude agents`
- Extensive long-session memory leak fixes and startup optimizations
- Added/expanded 1M context controls and model capability metadata

**中文翻译**
- 自动记忆与 `/copy` 能力增强
- Remote Control 可用性和安全性提升
- 大结果更早落盘（50K）以减少上下文占用
- 增强 worktree 隔离与 agent 管理命令
- 大量修复长会话内存泄漏并优化启动性能
- 增强 1M 上下文控制与模型能力可发现性

**What to watch**
- 数据治理：自动记忆目录、保留策略、隐私边界
- 资源控制：大结果落盘后的磁盘占用与清理
- worktree 流程：创建/切换/退出是否不污染主分支

---

## 2.1.49 / 2.1.47（稳定性与交互）

**EN (raw key changes)**
- Better agent/background-task controls (`Ctrl+F`, isolation)
- Better startup and MCP auth behavior
- Many Windows rendering/newline/path fixes
- More compaction reliability with image/PDF-heavy sessions
- Better hook fields and behavior consistency

**中文翻译**
- 后台 agent 控制和隔离能力增强
- 启动与 MCP 认证链路更稳
- Windows 终端渲染、换行、路径类问题大量修复
- 图像/PDF 密集会话下压缩可靠性提升
- hooks 字段更完整，行为更一致

**What to watch**
- 跨平台一致性：Windows/Linux/macOS 行为差异
- 重度多媒体会话：压缩后是否可继续稳定执行
- Hook 兼容：旧脚本是否需要改字段解析

---

# 每次升级 Claude Code 最值得关注的 10 件事（Checklist）

1. **权限与策略是否被绕过**：`ask/allow/deny`、managed settings、skill allowed-tools。
2. **内存与长会话稳定性**：是否仍有 RSS 增长、监听器泄漏、缓存泄漏。
3. **模型映射与版本漂移**：自定义 provider/Bedrock/Vertex 是否被静默降级或迁移。
4. **MCP 与 OAuth 链路**：证书、代理、端口占用、token 刷新失败处理。
5. **Worktree 隔离安全**：是否有 symlink 越界写、CWD 恢复异常。
6. **插件与市场供应链**：submodule、marketplace 源、严格白名单策略。
7. **后台任务与并发工具**：失败级联、清理时机、队列消息完整性。
8. **跨平台兼容性**：Windows 路径/编码/终端渲染、Linux glibc/native 模块。
9. **上下文成本控制**：`/context` 提示、tool result 落盘、compaction 缓存命中。
10. **破坏性行为变更**：命令废弃、默认模型切换、effort 默认值变化。

---

# 升级建议（给你可直接执行）

- 升级前：
  - 记录当前版本：`claude --version`
  - 备份关键配置：`.claude/settings*.json`、hooks、agents、plugins
- 升级后 10 分钟回归：
  - 运行一次 `/context` 看容量提示
  - 跑一条复杂 Bash + 一次 MCP OAuth 登录
  - 跑一个 subagent/worktree 任务
  - 在你常用环境（本地/SSH/VSCode）各验证 1 次
- 如你愿意，我下一步可以给你做一份**你当前环境专用的“升级验收脚本”**（一键检查上面 10 项）。
