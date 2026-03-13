# Claude Code Changelog Bilingual (Part 2)

Range: `1.0.6` -> `1.0.58` (earliest to latest in this part)

## 1.0.6

**EN (raw bullets)**
- Improved edit reliability for tab-indented files
- Respect CLAUDE_CONFIG_DIR everywhere
- Reduced unnecessary tool permission prompts
- Added support for symlinks in @file typeahead
- Bugfixes, UI polish, and tool reliability improvements

**中文摘要**
- 本版以安全/权限为主。
- 变更计数：新增 1、修复 0、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.7

**EN (raw bullets)**
- Renamed /allowed-tools -> /permissions
- Migrated allowedTools and ignorePatterns from .claude.json -> settings.json
- Deprecated claude config commands in favor of editing settings.json
- Fixed a bug where --dangerously-skip-permissions sometimes didn't work in --print mode
- Improved error handling for /install-github-app
- Bugfixes, UI polish, and tool reliability improvements

**中文摘要**
- 本版以安全/权限为主。
- 变更计数：新增 0、修复 1、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.8

**EN (raw bullets)**
- Fixed Vertex AI region fallback when using CLOUD_ML_REGION
- Increased default otel interval from 1s -> 5s
- Fixed edge cases where MCP_TIMEOUT and MCP_TOOL_TIMEOUT weren't being respected
- Fixed a regression where search tools unnecessarily asked for permissions
- Added support for triggering thinking non-English languages
- Improved compacting UI

**中文摘要**
- 本版以安全/权限、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 1、修复 3、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.10

**EN (raw bullets)**
- Added markdown table support
- Improved streaming performance

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 1、修复 0、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.11

**EN (raw bullets)**
- Claude Code can now also be used with a Claude Pro subscription
- Added /upgrade for smoother switching to Claude Max plans
- Improved UI for authentication from API keys and Bedrock/Vertex/external auth tokens
- Improved shell configuration error handling
- Improved todo list handling during compaction

**中文摘要**
- 本版以安全/权限为主。
- 变更计数：新增 1、修复 0、改进 3、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.17

**EN (raw bullets)**
- We now emit messages from sub-tasks in -p mode (look for the parent_tool_use_id property)
- Fixed crashes when the VS Code diff tool is invoked multiple times quickly
- MCP server list UI improvements
- Update Claude Code process title to display "claude" instead of "node"

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.18

**EN (raw bullets)**
- Added --add-dir CLI argument for specifying additional working directories
- Added streaming input support without require -p flag
- Improved startup performance and session storage performance
- Added CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR environment variable to freeze working directory for bash commands
- Added detailed MCP server tools display (/mcp)
- MCP authentication and permission improvements
- Added auto-reconnection for MCP SSE connections on disconnect
- Fixed issue where pasted content was lost when dialogs appeared

**中文摘要**
- 本版以安全/权限、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 5、修复 1、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.21

**EN (raw bullets)**
- Improved editing of files with tab-based indentation
- Fix for tool_use without matching tool_result errors
- Fixed a bug where stdio MCP server processes would linger after quitting Claude Code

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 1、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.22

**EN (raw bullets)**
- SDK: Renamed `total_cost` to `total_cost_usd`

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.23

**EN (raw bullets)**
- Released TypeScript SDK: import @anthropic-ai/claude-code to get started
- Released Python SDK: pip install claude-code-sdk to get started

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.24

**EN (raw bullets)**
- Improved /mcp output
- Fixed a bug where settings arrays got overwritten instead of merged

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 1、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.25

**EN (raw bullets)**
- Slash commands: moved "project" and "user" prefixes to descriptions
- Slash commands: improved reliability for command discovery
- Improved support for Ghostty
- Improved web search reliability

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 2、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.27

**EN (raw bullets)**
- Streamable HTTP MCP servers are now supported
- Remote MCP servers (SSE and HTTP) now support OAuth
- MCP resources can now be @-mentioned
- /resume slash command to switch conversations within Claude Code

**中文摘要**
- 本版以安全/权限、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.28

**EN (raw bullets)**
- Slash commands: Fix selector display during history navigation
- Resizes images before upload to prevent API size limit errors
- Added XDG_CONFIG_HOME support to configuration directory
- Performance optimizations for memory usage
- New attributes (terminal.type, language) in OpenTelemetry logging

**中文摘要**
- 本版以内存/稳定性、跨平台/IDE为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.29

**EN (raw bullets)**
- Improved CJK character support in cursor navigation and rendering

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.30

**EN (raw bullets)**
- Custom slash commands: Run bash output, @-mention files, enable thinking with thinking keywords
- Improved file path autocomplete with filename matching
- Added timestamps in Ctrl-r mode and fixed Ctrl-c handling
- Enhanced jq regex support for complex filters with pipes and select

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 1、修复 0、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.31

**EN (raw bullets)**
- Fixed a bug where ~/.claude.json would get reset when file contained invalid JSON

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.32

**EN (raw bullets)**
- Updated loopback config for litellm
- Added forceLoginMethod setting to bypass login selection screen

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.33

**EN (raw bullets)**
- Improved logging functionality with session ID support
- Added prompt input undo functionality (Ctrl+Z and vim 'u' command)
- Improvements to plan mode

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 1、修复 0、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.34

**EN (raw bullets)**
- Fixed a memory leak causing a MaxListenersExceededWarning message to appear

**中文摘要**
- 本版以内存/稳定性为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.35

**EN (raw bullets)**
- Added support for MCP OAuth Authorization Server discovery

**中文摘要**
- 本版以安全/权限、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.36

**EN (raw bullets)**
- Web search now takes today's date into context
- Fixed a bug where stdio MCP servers were not terminating properly on exit

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.37

**EN (raw bullets)**
- Remove ability to set `Proxy-Authorization` header via ANTHROPIC_AUTH_TOKEN or apiKeyHelper

**中文摘要**
- 本版以安全/权限为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.38

**EN (raw bullets)**
- Released hooks. Special thanks to community input in https://github.com/anthropics/claude-code/issues/712. Docs: https://code.claude.com/docs/en/hooks

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.39

**EN (raw bullets)**
- New Active Time metric in OpenTelemetry logging

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.40

**EN (raw bullets)**
- Fixed a bug causing API connection errors with UNABLE_TO_GET_ISSUER_CERT_LOCALLY if `NODE_EXTRA_CA_CERTS` was set

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.41

**EN (raw bullets)**
- Hooks: Split Stop hook triggering into Stop and SubagentStop
- Hooks: Enabled optional timeout configuration for each command
- Hooks: Added "hook_event_name" to hook input
- Fixed a bug where MCP tools would display twice in tool list
- New tool parameters JSON for Bash tool in `tool_decision` event

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.42

**EN (raw bullets)**
- Added tilde (`~`) expansion support to `/add-dir` command

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.43

**EN (raw bullets)**
- Fixed a bug where the theme selector was saving excessively
- Hooks: Added EPIPE system error handling

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.44

**EN (raw bullets)**
- New /export command lets you quickly export a conversation for sharing
- MCP: resource_link tool results are now supported
- MCP: tool annotations and tool titles now display in /mcp view
- Changed Ctrl+Z to suspend Claude Code. Resume by running `fg`. Prompt input undo is now Ctrl+U.

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 0、改进 0、变更 1、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.45

**EN (raw bullets)**
- Redesigned Search (Grep) tool with new tool input parameters and features
- Disabled IDE diffs for notebook files, fixing "Timeout waiting after 1000ms" error
- Fixed config file corruption issue by enforcing atomic writes
- Updated prompt input undo to Ctrl+\_ to avoid breaking existing Ctrl+U behavior, matching zsh's undo shortcut
- Stop Hooks: Fixed transcript path after /clear and fixed triggering when loop ends with tool call
- Custom slash commands: Restored namespacing in command names based on subdirectories. For example, .claude/commands/frontend/component.md is now /frontend:component, not /component.

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.48

**EN (raw bullets)**
- Fixed a bug in v1.0.45 where the app would sometimes freeze on launch
- Added progress messages to Bash tool based on the last 5 lines of command output
- Added expanding variables support for MCP server configuration
- Moved shell snapshots from /tmp to ~/.claude for more reliable Bash tool calls
- Improved IDE extension path handling when Claude Code runs in WSL
- Hooks: Added a PreCompact hook
- Vim mode: Added c, f/F, t/T

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 2、修复 1、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.51

**EN (raw bullets)**
- Added support for native Windows (requires Git for Windows)
- Added support for Bedrock API keys through environment variable AWS_BEARER_TOKEN_BEDROCK
- Settings: /doctor can now help you identify and fix invalid setting files
- `--append-system-prompt` can now be used in interactive mode, not just --print/-p.
- Increased auto-compact warning threshold from 60% to 80%
- Fixed an issue with handling user directories with spaces for shell snapshots
- OTEL resource now includes os.type, os.version, host.arch, and wsl.version (if running on Windows Subsystem for Linux)
- Custom slash commands: Fixed user-level commands in subdirectories
- Plan mode: Fixed issue where rejected plan from sub-task would get discarded

**中文摘要**
- 本版以跨平台/IDE为主。
- 变更计数：新增 2、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.52

**EN (raw bullets)**
- Added support for MCP server instructions

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.53

**EN (raw bullets)**
- Updated @-mention file truncation from 100 lines to 2000 lines
- Add helper script settings for AWS token refresh: awsAuthRefresh (for foreground operations like aws sso login) and awsCredentialExport (for background operation with STS-like response).

**中文摘要**
- 本版以安全/权限为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.54

**EN (raw bullets)**
- Hooks: Added UserPromptSubmit hook and the current working directory to hook inputs
- Custom slash commands: Added argument-hint to frontmatter
- Windows: OAuth uses port 45454 and properly constructs browser URL
- Windows: mode switching now uses alt + m, and plan mode renders properly
- Shell: Switch to in-memory shell snapshot to fix file-related errors

**中文摘要**
- 本版以安全/权限、内存/稳定性、跨平台/IDE为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.55

**EN (raw bullets)**
- Clarified knowledge cutoff for Opus 4 and Sonnet 4 models
- Windows: fixed Ctrl+Z crash
- SDK: Added ability to capture error logging
- Add --system-prompt-file option to override system prompt in print mode

**中文摘要**
- 本版以跨平台/IDE、模型/推理配置为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.56

**EN (raw bullets)**
- Windows: Enabled shift+tab for mode switching on versions of Node.js that support terminal VT mode
- Fixes for WSL IDE detection
- Fix an issue causing awsRefreshHelper changes to .aws directory not to be picked up

**中文摘要**
- 本版以跨平台/IDE为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.57

**EN (raw bullets)**
- Added support for specifying a model in slash commands
- Improved permission messages to help Claude understand allowed tools
- Fix: Remove trailing newlines from bash output in terminal wrapping

**中文摘要**
- 本版以安全/权限、跨平台/IDE、模型/推理配置为主。
- 变更计数：新增 1、修复 0、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.58

**EN (raw bullets)**
- Added support for reading PDFs
- MCP: Improved server health status display in 'claude mcp list'
- Hooks: Added CLAUDE_PROJECT_DIR env var for hook commands

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

