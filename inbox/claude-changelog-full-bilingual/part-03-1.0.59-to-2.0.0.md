# Claude Code Changelog Bilingual (Part 3)

Range: `1.0.59` -> `2.0.0` (earliest to latest in this part)

## 1.0.59

**EN (raw bullets)**
- SDK: Added tool confirmation support with canUseTool callback
- SDK: Allow specifying env for spawned process
- Hooks: Exposed PermissionDecision to hooks (including "ask")
- Hooks: UserPromptSubmit now supports additionalContext in advanced JSON output
- Fixed issue where some Max users that specified Opus would still see fallback to Sonnet

**中文摘要**
- 本版以安全/权限、模型/推理配置为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.60

**EN (raw bullets)**
- You can now create custom subagents for specialized tasks! Run /agents to get started

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.61

**EN (raw bullets)**
- Transcript mode (Ctrl+R): Changed Esc to exit transcript mode rather than interrupt
- Settings: Added `--settings` flag to load settings from a JSON file
- Settings: Fixed resolution of settings files paths that are symlinks
- OTEL: Fixed reporting of wrong organization after authentication changes
- Slash commands: Fixed permissions checking for allowed-tools with Bash
- IDE: Added support for pasting images in VSCode MacOS using ⌘+V
- IDE: Added `CLAUDE_CODE_AUTO_CONNECT_IDE=false` for disabling IDE auto-connection
- Added `CLAUDE_CODE_SHELL_PREFIX` for wrapping Claude and user-provided shell commands run by Claude Code

**中文摘要**
- 本版以安全/权限、跨平台/IDE为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.62

**EN (raw bullets)**
- Added @-mention support with typeahead for custom agents. @<your-custom-agent> to invoke it
- Hooks: Added SessionStart hook for new session initialization
- /add-dir command now supports typeahead for directory paths
- Improved network connectivity check reliability

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 1、修复 0、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.63

**EN (raw bullets)**
- Windows: Fixed file search, @agent mentions, and custom slash commands functionality

**中文摘要**
- 本版以跨平台/IDE为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.64

**EN (raw bullets)**
- Agents: Added model customization support - you can now specify which model an agent should use
- Agents: Fixed unintended access to the recursive agent tool
- Hooks: Added systemMessage field to hook JSON output for displaying warnings and context
- SDK: Fixed user input tracking across multi-turn conversations
- Added hidden files to file search and @-mention suggestions

**中文摘要**
- 本版以模型/推理配置为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.65

**EN (raw bullets)**
- IDE: Fixed connection stability issues and error handling for diagnostics
- Windows: Fixed shell environment setup for users without .bashrc files

**中文摘要**
- 本版以跨平台/IDE为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.68

**EN (raw bullets)**
- Fix incorrect model names being used for certain commands like `/pr-comments`
- Windows: improve permissions checks for allow / deny tools and project trust. This may create a new project entry in `.claude.json` - manually merge the history field if desired.
- Windows: improve sub-process spawning to eliminate "No such file or directory" when running commands like pnpm
- Enhanced /doctor command with CLAUDE.md and MCP tool context for self-serve debugging
- SDK: Added canUseTool callback support for tool confirmation
- Added `disableAllHooks` setting
- Improved file suggestions performance in large repos

**中文摘要**
- 本版以安全/权限、跨平台/IDE、模型/推理配置为主。
- 变更计数：新增 1、修复 0、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.69

**EN (raw bullets)**
- Upgraded Opus to version 4.1

**中文摘要**
- 本版以模型/推理配置为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.70

**EN (raw bullets)**
- Performance: Optimized message rendering for better performance with large contexts
- Windows: Fixed native file search, ripgrep, and subagent functionality
- Added support for @-mentions in slash command arguments

**中文摘要**
- 本版以跨平台/IDE为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.71

**EN (raw bullets)**
- Background commands: (Ctrl-b) to run any Bash command in the background so Claude can keep working (great for dev servers, tailing logs, etc.)
- Customizable status line: add your terminal prompt to Claude Code with /statusline

**中文摘要**
- 本版以跨平台/IDE为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.72

**EN (raw bullets)**
- Ask permissions: have Claude Code always ask for confirmation to use specific tools with /permissions

**中文摘要**
- 本版以安全/权限为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.73

**EN (raw bullets)**
- MCP: Support multiple config files with `--mcp-config file1.json file2.json`
- MCP: Press Esc to cancel OAuth authentication flows
- Bash: Improved command validation and reduced false security warnings
- UI: Enhanced spinner animations and status line visual hierarchy
- Linux: Added support for Alpine and musl-based distributions (requires separate ripgrep installation)

**中文摘要**
- 本版以安全/权限、跨平台/IDE、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.77

**EN (raw bullets)**
- Bash tool: Fix heredoc and multiline string escaping, improve stderr redirection handling
- SDK: Add session support and permission denial tracking
- Fix token limit errors in conversation summarization
- Opus Plan Mode: New setting in `/model` to run Opus only in plan mode, Sonnet otherwise

**中文摘要**
- 本版以安全/权限、模型/推理配置为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.80

**EN (raw bullets)**
- UI improvements: Fix text contrast for custom subagent colors and spinner rendering issues

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.81

**EN (raw bullets)**
- Released output styles, including new built-in educational output styles "Explanatory" and "Learning". Docs: https://code.claude.com/docs/en/output-styles
- Agents: Fix custom agent loading when agent files are unparsable

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.82

**EN (raw bullets)**
- SDK: Add request cancellation support
- SDK: New additionalDirectories option to search custom paths, improved slash command processing
- Settings: Validation prevents invalid fields in .claude/settings.json files
- MCP: Improve tool name consistency
- Bash: Fix crash when Claude tries to automatically read large files

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.83

**EN (raw bullets)**
- @-mention: Support files with spaces in path
- New shimmering spinner

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.84

**EN (raw bullets)**
- Fix tool_use/tool_result id mismatch error when network is unstable
- Fix Claude sometimes ignoring real-time steering when wrapping up a task
- @-mention: Add ~/.claude/\* files to suggestions for easier agent, output style, and slash command editing
- Use built-in ripgrep by default; to opt out of this behavior, set USE_BUILTIN_RIPGREP=0

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.85

**EN (raw bullets)**
- Status line input now includes session cost info
- Hooks: Introduced SessionEnd hook

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.86

**EN (raw bullets)**
- Added /context to help users self-serve debug context issues
- SDK: Added UUID support for all SDK messages
- SDK: Added `--replay-user-messages` to replay user messages back to stdout

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.88

**EN (raw bullets)**
- Fixed issue causing "OAuth authentication is currently not supported"
- Status line input now includes `exceeds_200k_tokens`
- Fixed incorrect usage tracking in /cost.
- Introduced `ANTHROPIC_DEFAULT_SONNET_MODEL` and `ANTHROPIC_DEFAULT_OPUS_MODEL` for controlling model aliases opusplan, opus, and sonnet.
- Bedrock: Updated default Sonnet model to Sonnet 4

**中文摘要**
- 本版以安全/权限、模型/推理配置为主。
- 变更计数：新增 0、修复 2、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.90

**EN (raw bullets)**
- Settings file changes take effect immediately - no restart required

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.93

**EN (raw bullets)**
- Windows: Add alt + v shortcut for pasting images from clipboard
- Support NO_PROXY environment variable to bypass proxy for specified hostnames and IPs

**中文摘要**
- 本版以跨平台/IDE为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.94

**EN (raw bullets)**
- Vertex: add support for global endpoints for supported models
- /memory command now allows direct editing of all imported memory files
- SDK: Add custom tools as callbacks
- Added /todos command to list current todo items

**中文摘要**
- 本版以内存/稳定性、模型/推理配置为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.97

**EN (raw bullets)**
- Settings: /doctor now validates permission rule syntax and suggests corrections

**中文摘要**
- 本版以安全/权限为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.106

**EN (raw bullets)**
- Windows: Fixed path permission matching to consistently use POSIX format (e.g., `Read(//c/Users/...)`)

**中文摘要**
- 本版以安全/权限、跨平台/IDE为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.109

**EN (raw bullets)**
- SDK: Added partial message streaming support via `--include-partial-messages` CLI flag

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.110

**EN (raw bullets)**
- /terminal-setup command now supports WezTerm
- MCP: OAuth tokens now proactively refresh before expiration
- Fixed reliability issues with background Bash processes

**中文摘要**
- 本版以安全/权限、跨平台/IDE、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.111

**EN (raw bullets)**
- /model now validates provided model names
- Fixed Bash tool crashes caused by malformed shell syntax parsing

**中文摘要**
- 本版以模型/推理配置为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.112

**EN (raw bullets)**
- Transcript mode (Ctrl+R): Added the model used to generate each assistant message
- Addressed issue where some Claude Max users were incorrectly recognized as Claude Pro users
- Hooks: Added systemMessage support for SessionEnd hooks
- Added `spinnerTipsEnabled` setting to disable spinner tips
- IDE: Various improvements and bug fixes

**中文摘要**
- 本版以模型/推理配置为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.113

**EN (raw bullets)**
- Deprecated piped input in interactive mode
- Move Ctrl+R keybinding for toggling transcript to Ctrl+O

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.115

**EN (raw bullets)**
- Improve thinking mode display with enhanced visual effects
- Type /t to temporarily disable thinking mode in your prompt
- Improve path validation for glob and grep tools
- Show condensed output for post-tool hooks to reduce visual clutter
- Fix visual feedback when loading state completes
- Improve UI consistency for permission request dialogs

**中文摘要**
- 本版以安全/权限为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.117

**EN (raw bullets)**
- Add Ctrl-R history search to recall previous commands like bash/zsh
- Fix input lag while typing, especially on Windows
- Add sed command to auto-allowed commands in acceptEdits mode
- Fix Windows PATH comparison to be case-insensitive for drive letters
- Add permissions management hint to /add-dir output

**中文摘要**
- 本版以安全/权限、跨平台/IDE为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.119

**EN (raw bullets)**
- Fix Windows issue where process visually freezes on entering interactive mode
- Support dynamic headers for MCP servers via headersHelper configuration
- Fix thinking mode not working in headless sessions
- Fix slash commands now properly update allowed tools instead of replacing them

**中文摘要**
- 本版以跨平台/IDE、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.120

**EN (raw bullets)**
- Fix input lag during typing, especially noticeable with large prompts
- Improved VSCode extension command registry and sessions dialog user experience
- Enhanced sessions dialog responsiveness and visual feedback
- Fixed IDE compatibility issue by removing worktree support check
- Fixed security vulnerability where Bash tool permission checks could be bypassed using prefix matching

**中文摘要**
- 本版以安全/权限、跨平台/IDE为主。
- 变更计数：新增 0、修复 2、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.123

**EN (raw bullets)**
- Bash permission rules now support output redirections when matching (e.g., `Bash(python:*)` matches `python script.py > output.txt`)
- Fixed thinking mode triggering on negation phrases like "don't think"
- Fixed rendering performance degradation during token streaming
- Added SlashCommand tool, which enables Claude to invoke your slash commands. https://code.claude.com/docs/en/slash-commands#SlashCommand-tool
- Enhanced BashTool environment snapshot logging
- Fixed a bug where resuming a conversation in headless mode would sometimes enable thinking unnecessarily
- Migrated --debug logging to a file, to enable easy tailing & filtering

**中文摘要**
- 本版以安全/权限为主。
- 变更计数：新增 1、修复 3、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.124

**EN (raw bullets)**
- Set `CLAUDE_BASH_NO_LOGIN` environment variable to 1 or true to to skip login shell for BashTool
- Fix Bedrock and Vertex environment variables evaluating all strings as truthy
- No longer inform Claude of the list of allowed tools when permission is denied
- Fixed security vulnerability in Bash tool permission checks
- Improved VSCode extension performance for large files

**中文摘要**
- 本版以安全/权限、跨平台/IDE为主。
- 变更计数：新增 0、修复 1、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 1.0.126

**EN (raw bullets)**
- Enable /context command for Bedrock and Vertex
- Add mTLS support for HTTP-based OpenTelemetry exporters

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.0

**EN (raw bullets)**
- New native VS Code extension
- Fresh coat of paint throughout the whole app
- /rewind a conversation to undo code changes
- /usage command to see plan limits
- Tab to toggle thinking (sticky across sessions)
- Ctrl-R to search history
- Unshipped claude config command
- Hooks: Reduced PostToolUse 'tool_use' ids were found without 'tool_result' blocks errors
- SDK: The Claude Code SDK is now the Claude Agent SDK
- Add subagents dynamically with `--agents` flag

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

