# Claude Code Changelog Bilingual (Part 1)

Range: `0.2.21` -> `1.0.4` (earliest to latest in this part)

## 0.2.21

**EN (raw bullets)**
- Fuzzy matching for /commands

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.26

**EN (raw bullets)**
- New /approved-tools command for managing tool permissions
- Word-level diff display for improved code readability
- Fuzzy matching for slash commands

**中文摘要**
- 本版以安全/权限为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.30

**EN (raw bullets)**
- Added ANSI color theme for better terminal compatibility
- Fixed issue where slash command arguments weren't being sent properly
- (Mac-only) API keys are now stored in macOS Keychain

**中文摘要**
- 本版以跨平台/IDE为主。
- 变更计数：新增 1、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.31

**EN (raw bullets)**
- Custom slash commands: Markdown files in .claude/commands/ directories now appear as custom slash commands to insert prompts into your conversation
- MCP debug mode: Run with --mcp-debug flag to get more information about MCP server errors

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.32

**EN (raw bullets)**
- Interactive MCP setup wizard: Run "claude mcp add" to add MCP servers with a step-by-step interface
- Fix for some PersistentShell issues

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.34

**EN (raw bullets)**
- Vim bindings for text input - enable with /vim or /config

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.36

**EN (raw bullets)**
- Import MCP servers from Claude Desktop with `claude mcp add-from-claude-desktop`
- Add MCP servers as JSON strings with `claude mcp add-json <n> <json>`

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.37

**EN (raw bullets)**
- New /release-notes command lets you view release notes at any time
- `claude config add/remove` commands now accept multiple values separated by commas or spaces

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.41

**EN (raw bullets)**
- MCP server startup timeout can now be configured via MCP_TIMEOUT environment variable
- MCP server startup no longer blocks the app from starting up

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.44

**EN (raw bullets)**
- Ask Claude to make a plan with thinking mode: just say 'think' or 'think harder' or even 'ultrathink'

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.47

**EN (raw bullets)**
- Press Tab to auto-complete file and folder names
- Press Shift + Tab to toggle auto-accept for file edits
- Automatic conversation compaction for infinite conversation length (toggle with /config)

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.49

**EN (raw bullets)**
- Previous MCP server scopes have been renamed: previous "project" scope is now "local" and "global" scope is now "user"

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.50

**EN (raw bullets)**
- New MCP "project" scope now allows you to add MCP servers to .mcp.json files and commit them to your repository

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.53

**EN (raw bullets)**
- New web fetch tool lets Claude view URLs that you paste in
- Fixed a bug with JPEG detection

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.54

**EN (raw bullets)**
- Quickly add to Memory by starting your message with '#'
- Press ctrl+r to see full output for long tool results
- Added support for MCP SSE transport

**中文摘要**
- 本版以内存/稳定性、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.59

**EN (raw bullets)**
- Copy+paste images directly into your prompt
- Improved progress indicators for bash and fetch tools
- Bugfixes for non-interactive mode (-p)

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.61

**EN (raw bullets)**
- Navigate menus with vim-style keys (j/k) or bash/emacs shortcuts (Ctrl+n/p) for faster interaction
- Enhanced image detection for more reliable clipboard paste functionality
- Fixed an issue where ESC key could crash the conversation history selector

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.63

**EN (raw bullets)**
- Fixed an issue where MCP tools were loaded twice, which caused tool call errors

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.66

**EN (raw bullets)**
- Print mode (-p) now supports streaming output via --output-format=stream-json
- Fixed issue where pasting could trigger memory or bash mode unexpectedly

**中文摘要**
- 本版以内存/稳定性为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.67

**EN (raw bullets)**
- Shared project permission rules can be saved in .claude/settings.json

**中文摘要**
- 本版以安全/权限为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.69

**EN (raw bullets)**
- Fixed UI glitches with improved Select component behavior
- Enhanced terminal output display with better text truncation logic

**中文摘要**
- 本版以跨平台/IDE为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.70

**EN (raw bullets)**
- Network commands like curl are now available for Claude to use
- Claude can now run multiple web queries in parallel
- Pressing ESC once immediately interrupts Claude in Auto-accept mode

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.72

**EN (raw bullets)**
- Updated spinner to indicate tokens loaded and tool usage

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.74

**EN (raw bullets)**
- Added support for refreshing dynamically generated API keys (via apiKeyHelper), with a 5 minute TTL
- Task tool can now perform writes and run bash commands

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.75

**EN (raw bullets)**
- Hit Enter to queue up additional messages while Claude is working
- Drag in or copy/paste image files directly into the prompt
- @-mention files to directly add them to context
- Run one-off MCP servers with `claude --mcp-config <path-to-file>`
- Improved performance for filename auto-complete

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 0、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.82

**EN (raw bullets)**
- Added support for --disallowedTools
- Renamed tools for consistency: LSTool -> LS, View -> Read, etc.

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.93

**EN (raw bullets)**
- Resume conversations from where you left off from with "claude --continue" and "claude --resume"
- Claude now has access to a Todo list that helps it stay on track and be more organized

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.96

**EN (raw bullets)**
- Claude Code can now also be used with a Claude Max subscription (https://claude.ai/upgrade)

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.98

**EN (raw bullets)**
- Fixed an issue where auto-compact was running twice

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.100

**EN (raw bullets)**
- Fixed a crash caused by a stack overflow error
- Made db storage optional; missing db support disables --continue and --resume

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.102

**EN (raw bullets)**
- Improved thinking triggering reliability
- Improved @mention reliability for images and folders
- You can now paste multiple large chunks into one prompt

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 2、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.105

**EN (raw bullets)**
- Claude can now search the web
- Moved system & account status to /status
- Added word movement keybindings for Vim
- Improved latency for startup, todo tool, and file edits

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 1、修复 0、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.106

**EN (raw bullets)**
- MCP SSE server configs can now specify custom headers
- Fixed a bug where MCP permission prompt didn't always show correctly

**中文摘要**
- 本版以安全/权限、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.107

**EN (raw bullets)**
- CLAUDE.md files can now import other files. Add @path/to/file.md to ./CLAUDE.md to load additional files on launch

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.108

**EN (raw bullets)**
- You can now send messages to Claude while it works to steer Claude in real-time
- Introduced BASH_DEFAULT_TIMEOUT_MS and BASH_MAX_TIMEOUT_MS env vars
- Fixed a bug where thinking was not working in -p mode
- Fixed a regression in /cost reporting
- Deprecated MCP wizard interface in favor of other MCP commands
- Lots of other bugfixes and improvements

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 2、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.117

**EN (raw bullets)**
- Breaking change: --print JSON output now returns nested message objects, for forwards-compatibility as we introduce new metadata fields
- Introduced settings.cleanupPeriodDays
- Introduced CLAUDE_CODE_API_KEY_HELPER_TTL_MS env var
- Introduced --debug mode

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 0.2.125

**EN (raw bullets)**
- Breaking change: Bedrock ARN passed to `ANTHROPIC_MODEL` or `ANTHROPIC_SMALL_FAST_MODEL` should no longer contain an escaped slash (specify `/` instead of `%2F`)
- Removed `DEBUG=true` in favor of `ANTHROPIC_LOG=debug`, to log all requests

**中文摘要**
- 本版以模型/推理配置为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 1。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.0

**EN (raw bullets)**
- Claude Code is now generally available
- Introducing Sonnet 4 and Opus 4 models

**中文摘要**
- 本版以模型/推理配置为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.1

**EN (raw bullets)**
- Added `DISABLE_INTERLEAVED_THINKING` to give users the option to opt out of interleaved thinking.
- Improved model references to show provider-specific names (Sonnet 3.7 for Bedrock, Sonnet 4 for Console)
- Updated documentation links and OAuth process descriptions

**中文摘要**
- 本版以安全/权限、模型/推理配置为主。
- 变更计数：新增 1、修复 0、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.4

**EN (raw bullets)**
- Fixed a bug where MCP tool errors weren't being parsed correctly

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

