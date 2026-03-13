# Claude Code Changelog Full-Range Guide (0.2.21 -> 2.1.74)

Source:
- https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md

This document covers the full range from the first available version to latest.

## EN/ZH Milestone Interpretation by Era

### Era A: 0.2.x (foundation)
- EN: Core CLI behavior, early toolchain reliability, and baseline UX were established.
- 中文：0.2.x 是打基础阶段，主要在 CLI 核心行为、工具链稳定性和基础体验上持续打磨。
- Watch:
  - EN: command correctness, shell/tool invocation edge cases, basic platform compatibility
  - 中文：重点看命令正确性、shell/工具调用边界和基础跨平台兼容

### Era B: 1.x (scale-up)
- EN: Expanded command surface, stronger session handling, and broader integration points.
- 中文：1.x 进入能力扩张阶段，命令面更广，会话管理和生态集成能力明显增强。
- Watch:
  - EN: settings migration, backward compatibility, plugin/skill behavior consistency
  - 中文：重点看配置迁移、兼容性和 plugin/skill 一致性

### Era C: 2.x early (platform hardening)
- EN: Security controls, memory management, and long-session stability became central.
- 中文：2.x 初期转向平台稳态与安全治理，内存管理和长会话稳定性成为主线。
- Watch:
  - EN: permission policy correctness, leaks, context compaction correctness
  - 中文：重点看权限策略准确性、泄漏修复、上下文压缩可靠性

### Era D: 2.1.x recent (high-velocity optimization)
- EN: Rapid improvements in MCP/OAuth, worktree isolation, multi-agent, VSCode parity, and performance.
- 中文：2.1.x 是高频优化期：MCP/OAuth、worktree 隔离、多代理、VSCode 体验和性能都在快速迭代。
- Watch:
  - EN: OAuth resilience under proxies/certs, model mapping drift, background task cleanup
  - 中文：重点看代理/证书下 OAuth 稳定性、模型映射漂移、后台任务回收

## Full-Range “What to Care Every Upgrade” (EN/ZH)

1) Permission safety
- EN: Verify ask/allow/deny and managed policy precedence.
- 中文：确认 ask/allow/deny 与托管策略优先级没有被绕过。

2) Memory and long-running sessions
- EN: Track RSS trend and listener/cache growth in long sessions.
- 中文：观察长会话 RSS 趋势、监听器/缓存是否持续增长。

3) Model routing correctness
- EN: Confirm model IDs and overrides resolve to intended backend models.
- 中文：确认模型 ID 与 override 映射到预期后端模型。

4) MCP/OAuth reliability
- EN: Test callback port collisions, refresh expiry, SSL/proxy cert chains.
- 中文：重点测回调端口冲突、刷新过期、SSL/代理证书链。

5) Worktree and filesystem safety
- EN: Validate no symlink escape or cwd restore regressions.
- 中文：确认无 symlink 越界写入、cwd 恢复异常。

6) Plugin/skill supply chain
- EN: Re-check marketplace sources, submodule updates, strict allowlists.
- 中文：复查市场源、submodule 更新、严格白名单策略。

7) Background and parallel tools
- EN: Ensure failed sibling calls do not cascade incorrectly.
- 中文：确认并行工具失败不会错误级联。

8) Cross-platform parity
- EN: Validate Windows terminal/path/encoding behavior after upgrades.
- 中文：升级后重点回归 Windows 终端/路径/编码。

9) Context/cost controls
- EN: Re-test compaction, spill-to-disk behavior, and cache hit rates.
- 中文：复测压缩、结果落盘和缓存命中率。

10) Breaking defaults
- EN: Watch model default shifts, removed commands, changed effort defaults.
- 中文：关注默认模型切换、命令废弃、effort 默认变化。

## Full version index reference
- See: `inbox/claude-code-changelog-full-range-versions.md`

## Notes
- The official changelog has 238 versions from `0.2.21` to `2.1.74`.
- I already prepared a recent detailed bilingual breakdown file:
  - `inbox/claude-code-changelog-zh-en-2026-03-13.md`
