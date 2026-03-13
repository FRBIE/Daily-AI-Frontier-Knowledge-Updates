# Claude Code Changelog Bilingual (Part 4)

Range: `2.0.1` -> `2.0.56` (earliest to latest in this part)

## 2.0.1

**EN (raw bullets)**
- Skip Sonnet 4.5 default model setting change for Bedrock and Vertex
- Various bug fixes and presentation improvements

**中文摘要**
- 本版以模型/推理配置为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.5

**EN (raw bullets)**
- IDE: Fix IME unintended message submission with Enter and Tab
- IDE: Add "Open in Terminal" link in login screen
- Fix unhandled OAuth expiration 401 API errors
- SDK: Added SDKUserMessageReplay.isReplay to prevent duplicate messages

**中文摘要**
- 本版以安全/权限、跨平台/IDE为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.8

**EN (raw bullets)**
- Update Bedrock default Sonnet model to `global.anthropic.claude-sonnet-4-5-20250929-v1:0`
- IDE: Add drag-and-drop support for files and folders in chat
- /context: Fix counting for thinking blocks
- Improve message rendering for users with light themes on dark terminals
- Remove deprecated .claude.json allowedTools, ignorePatterns, env, and todoFeatureEnabled config options (instead, configure these in your settings.json)

**中文摘要**
- 本版以跨平台/IDE、模型/推理配置为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.9

**EN (raw bullets)**
- Fix regression where bash backgrounding stopped working

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.10

**EN (raw bullets)**
- Rewrote terminal renderer for buttery smooth UI
- Enable/disable MCP servers by @mentioning, or in /mcp
- Added tab completion for shell commands in bash mode
- PreToolUse hooks can now modify tool inputs
- Press Ctrl-G to edit your prompt in your system's configured text editor
- Fixes for bash permission checks with environment variables in the command

**中文摘要**
- 本版以安全/权限、跨平台/IDE、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.11

**EN (raw bullets)**
- Reduced system prompt size by 1.4k tokens
- IDE: Fixed keyboard shortcuts and focus issues for smoother interaction
- Fixed Opus fallback rate limit errors appearing incorrectly
- Fixed /add-dir command selecting wrong default tab

**中文摘要**
- 本版以模型/推理配置为主。
- 变更计数：新增 0、修复 2、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.12

**EN (raw bullets)**
- **Plugin System Released**: Extend Claude Code with custom commands, agents, hooks, and MCP servers from marketplaces
- `/plugin install`, `/plugin enable/disable`, `/plugin marketplace` commands for plugin management
- Repository-level plugin configuration via `extraKnownMarketplaces` for team collaboration
- `/plugin validate` command for validating plugin structure and configuration
- Plugin announcement blog post at https://www.anthropic.com/news/claude-code-plugins
- Plugin documentation available at https://code.claude.com/docs/en/plugins
- Comprehensive error messages and diagnostics via `/doctor` command
- Avoid flickering in `/model` selector
- Improvements to `/help`
- Avoid mentioning hooks in `/resume` summaries
- Changes to the "verbose" setting in `/config` now persist across sessions

**中文摘要**
- 本版以模型/推理配置、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.13

**EN (raw bullets)**
- Fixed `/plugin` not working on native build

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.14

**EN (raw bullets)**
- Fix @-mentioning MCP servers to toggle them on/off
- Improve permission checks for bash with inline env vars
- Fix ultrathink + thinking toggle
- Reduce unnecessary logins
- Document --system-prompt
- Several improvements to rendering
- Plugins UI polish

**中文摘要**
- 本版以安全/权限、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.15

**EN (raw bullets)**
- Fixed bug with resuming where previously created files needed to be read again before writing
- Fixed bug with `-p` mode where @-mentioned files needed to be read again before writing

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 2、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.17

**EN (raw bullets)**
- Added Haiku 4.5 to model selector!
- Haiku 4.5 automatically uses Sonnet in plan mode, and Haiku for execution (i.e. SonnetPlan by default)
- 3P (Bedrock and Vertex) are not automatically upgraded yet. Manual upgrading can be done through setting `ANTHROPIC_DEFAULT_HAIKU_MODEL`
- Introducing the Explore subagent. Powered by Haiku it'll search through your codebase efficiently to save context!
- OTEL: support HTTP_PROXY and HTTPS_PROXY
- `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` now disables release notes fetching

**中文摘要**
- 本版以模型/推理配置为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.19

**EN (raw bullets)**
- Auto-background long-running bash commands instead of killing them. Customize with BASH_DEFAULT_TIMEOUT_MS
- Fixed a bug where Haiku was unnecessarily called in print mode

**中文摘要**
- 本版以模型/推理配置为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.20

**EN (raw bullets)**
- Added support for Claude Skills

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.21

**EN (raw bullets)**
- Support MCP `structuredContent` field in tool responses
- Added an interactive question tool
- Claude will now ask you questions more often in plan mode
- Added Haiku 4.5 as a model option for Pro users
- Fixed an issue where queued commands don't have access to previous messages' output

**中文摘要**
- 本版以模型/推理配置、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 2、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.22

**EN (raw bullets)**
- Fixed content layout shift when scrolling through slash commands
- IDE: Add toggle to enable/disable thinking.
- Fix bug causing duplicate permission prompts with parallel tool calls
- Add support for enterprise managed MCP allowlist and denylist

**中文摘要**
- 本版以安全/权限、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.24

**EN (raw bullets)**
- Fixed a bug where project-level skills were not loading when --setting-sources 'project' was specified
- Claude Code Web: Support for Web -> CLI teleport
- Sandbox: Releasing a sandbox mode for the BashTool on Linux & Mac
- Bedrock: Display awsAuthRefresh output when auth is required

**中文摘要**
- 本版以安全/权限、跨平台/IDE、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.25

**EN (raw bullets)**
- Removed legacy SDK entrypoint. Please migrate to @anthropic-ai/claude-agent-sdk for future SDK updates: https://platform.claude.com/docs/en/agent-sdk/migration-guide

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 1。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.27

**EN (raw bullets)**
- New UI for permission prompts
- Added current branch filtering and search to session resume screen for easier navigation
- Fixed directory @-mention causing "No assistant message found" error
- VSCode Extension: Add config setting to include .gitignored files in file searches
- VSCode Extension: Bug fixes for unrelated 'Warmup' conversations, and configuration/settings occasionally being reset to defaults

**中文摘要**
- 本版以安全/权限、跨平台/IDE为主。
- 变更计数：新增 1、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.28

**EN (raw bullets)**
- Plan mode: introduced new Plan subagent
- Subagents: claude can now choose to resume subagents
- Subagents: claude can dynamically choose the model used by its subagents
- SDK: added --max-budget-usd flag
- Discovery of custom slash commands, subagents, and output styles no longer respects .gitignore
- Stop `/terminal-setup` from adding backslash to `Shift + Enter` in VS Code
- Add branch and tag support for git-based plugins and marketplaces using fragment syntax (e.g., `owner/repo#branch`)
- Fixed a bug where macOS permission prompts would show up upon initial launch when launching from home directory
- Various other bug fixes

**中文摘要**
- 本版以安全/权限、跨平台/IDE、模型/推理配置为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.30

**EN (raw bullets)**
- Added helpful hint to run `security unlock-keychain` when encountering API key errors on macOS with locked keychain
- Added `allowUnsandboxedCommands` sandbox setting to disable the dangerouslyDisableSandbox escape hatch at policy level
- Added `disallowedTools` field to custom agent definitions for explicit tool blocking
- Added prompt-based stop hooks
- VSCode: Added respectGitIgnore configuration to include .gitignored files in file searches (defaults to true)
- Enabled SSE MCP servers on native build
- Deprecated output styles. Review options in `/output-style` and use --system-prompt-file, --system-prompt, --append-system-prompt, CLAUDE.md, or plugins instead
- Removed support for custom ripgrep configuration, resolving an issue where Search returns no results and config discovery fails
- Fixed Explore agent creating unwanted .md investigation files during codebase exploration
- Fixed a bug where `/context` would sometimes fail with "max_tokens must be greater than thinking.budget_tokens" error message
- Fixed `--mcp-config` flag to correctly override file-based MCP configurations
- Fixed bug that saved session permissions to local settings
- Fixed MCP tools not being available to sub-agents
- Fixed hooks and plugins not executing when using --dangerously-skip-permissions flag
- Fixed delay when navigating through typeahead suggestions with arrow keys
- VSCode: Restored selection indicator in input footer showing current file or code selection status

**中文摘要**
- 本版以安全/权限、跨平台/IDE、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 4、修复 7、改进 0、变更 0、移除 1。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.31

**EN (raw bullets)**
- Windows: native installation uses shift+tab as shortcut for mode switching, instead of alt+m
- Vertex: add support for Web Search on supported models
- VSCode: Adding the respectGitIgnore configuration to include .gitignored files in file searches (defaults to true)
- Fixed a bug with subagents and MCP servers related to "Tool names must be unique" error
- Fixed issue causing `/compact` to fail with `prompt_too_long` by making it respect existing compact boundaries
- Fixed plugin uninstall not removing plugins

**中文摘要**
- 本版以跨平台/IDE、模型/推理配置、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 3、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.32

**EN (raw bullets)**
- Un-deprecate output styles based on community feedback
- Added `companyAnnouncements` setting for displaying announcements on startup
- Fixed hook progress messages not updating correctly during PostToolUse hook execution

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 1、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.33

**EN (raw bullets)**
- Native binary installs now launch quicker.
- Fixed `claude doctor` incorrectly detecting Homebrew vs npm-global installations by properly resolving symlinks
- Fixed `claude mcp serve` exposing tools with incompatible outputSchemas

**中文摘要**
- 本版以安全/权限、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 2、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.34

**EN (raw bullets)**
- VSCode Extension: Added setting to configure the initial permission mode for new conversations
- Improved file path suggestion performance with native Rust-based fuzzy finder
- Fixed infinite token refresh loop that caused MCP servers with OAuth (e.g., Slack) to hang during connection
- Fixed memory crash when reading or writing large files (especially base64-encoded images)

**中文摘要**
- 本版以安全/权限、内存/稳定性、跨平台/IDE为主。
- 变更计数：新增 0、修复 2、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.35

**EN (raw bullets)**
- Improve fuzzy search results when searching commands
- Improved VS Code extension to respect `chat.fontSize` and `chat.fontFamily` settings throughout the entire UI, and apply font changes immediately without requiring reload
- Added `CLAUDE_CODE_EXIT_AFTER_STOP_DELAY` environment variable to automatically exit SDK mode after a specified idle duration, useful for automated workflows and scripts
- Migrated `ignorePatterns` from project config to deny permissions in the localSettings.
- Fixed menu navigation getting stuck on items with empty string or other falsy values (e.g., in the `/hooks` menu)

**中文摘要**
- 本版以安全/权限为主。
- 变更计数：新增 1、修复 1、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.36

**EN (raw bullets)**
- Fixed: DISABLE_AUTOUPDATER environment variable now properly disables package manager update notifications
- Fixed queued messages being incorrectly executed as bash commands
- Fixed input being lost when typing while a queued message is processed

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 2、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.37

**EN (raw bullets)**
- Fixed how idleness is computed for notifications
- Hooks: Added matcher values for Notification hook events
- Output Styles: Added `keep-coding-instructions` option to frontmatter

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.41

**EN (raw bullets)**
- Added `model` parameter to prompt-based stop hooks, allowing users to specify a custom model for hook evaluation
- Fixed slash commands from user settings being loaded twice, which could cause rendering issues
- Fixed incorrect labeling of user settings vs project settings in command descriptions
- Fixed crash when plugin command hooks timeout during execution
- Fixed: Bedrock users no longer see duplicate Opus entries in the /model picker when using `--model haiku`
- Fixed broken security documentation links in trust dialogs and onboarding
- Fixed issue where pressing ESC to close the diff modal would also interrupt the model
- ctrl-r history search landing on a slash command no longer cancels the search
- SDK: Support custom timeouts for hooks
- Allow more safe git commands to run without approval
- Plugins: Added support for sharing and installing output styles
- Teleporting a session from web will automatically set the upstream branch

**中文摘要**
- 本版以安全/权限、模型/推理配置、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 1、修复 5、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.42

**EN (raw bullets)**
- Added `agent_id` and `agent_transcript_path` fields to `SubagentStop` hooks.

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.43

**EN (raw bullets)**
- Added `permissionMode` field for custom agents
- Added `tool_use_id` field to `PreToolUseHookInput` and `PostToolUseHookInput` types
- Added skills frontmatter field to declare skills to auto-load for subagents
- Added the `SubagentStart` hook event
- Fixed nested `CLAUDE.md` files not loading when @-mentioning files
- Fixed duplicate rendering of some messages in the UI
- Fixed some visual flickers
- Fixed NotebookEdit tool inserting cells at incorrect positions when cell IDs matched the pattern `cell-N`

**中文摘要**
- 本版以安全/权限、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 4、修复 4、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.45

**EN (raw bullets)**
- Added support for Microsoft Foundry! See https://code.claude.com/docs/en/azure-ai-foundry
- Added `PermissionRequest` hook to automatically approve or deny tool permission requests with custom logic
- Send background tasks to Claude Code on the web by starting a message with `&`

**中文摘要**
- 本版以安全/权限为主。
- 变更计数：新增 2、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.46

**EN (raw bullets)**
- Fixed image files being reported with incorrect media type when format cannot be detected from metadata

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.47

**EN (raw bullets)**
- Improved error messages and validation for `claude --teleport`
- Improved error handling in `/usage`
- Fixed race condition with history entry not getting logged at exit
- Fixed Vertex AI configuration not being applied from `settings.json`

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 2、改进 2、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.49

**EN (raw bullets)**
- Added readline-style ctrl-y for pasting deleted text
- Improved clarity of usage limit warning message
- Fixed handling of subagent permissions

**中文摘要**
- 本版以安全/权限为主。
- 变更计数：新增 1、修复 1、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.50

**EN (raw bullets)**
- Fixed bug preventing calling MCP tools that have nested references in their input schemas
- Silenced a noisy but harmless error during upgrades
- Improved ultrathink text display
- Improved clarity of 5-hour session limit warning message

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 1、改进 2、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.51

**EN (raw bullets)**
- Added Opus 4.5! https://www.anthropic.com/news/claude-opus-4-5
- Introducing Claude Code for Desktop: https://claude.com/download
- To give you room to try out our new model, we've updated usage limits for Claude Code users. See the Claude Opus 4.5 blog for full details
- Pro users can now purchase extra usage for access to Opus 4.5 in Claude Code
- Plan Mode now builds more precise plans and executes more thoroughly
- Usage limit notifications now easier to understand
- Switched `/usage` back to "% used"
- Fixed handling of thinking errors
- Fixed performance regression

**中文摘要**
- 本版以模型/推理配置为主。
- 变更计数：新增 1、修复 2、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.52

**EN (raw bullets)**
- Fixed duplicate message display when starting Claude with a command line argument
- Fixed `/usage` command progress bars to fill up as usage increases (instead of showing remaining percentage)
- Fixed image pasting not working on Linux systems running Wayland (now falls back to wl-paste when xclip is unavailable)
- Permit some uses of `$!` in bash commands

**中文摘要**
- 本版以跨平台/IDE为主。
- 变更计数：新增 0、修复 3、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.54

**EN (raw bullets)**
- Hooks: Enable PermissionRequest hooks to process 'always allow' suggestions and apply permission updates
- Fix issue with excessive iTerm notifications

**中文摘要**
- 本版以安全/权限为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.55

**EN (raw bullets)**
- Fixed proxy DNS resolution being forced on by default. Now opt-in via `CLAUDE_CODE_PROXY_RESOLVES_HOSTS=true` environment variable
- Fixed keyboard navigation becoming unresponsive when holding down arrow keys in memory location selector
- Improved AskUserQuestion tool to auto-submit single-select questions on the last question, eliminating the extra review screen for simple question flows
- Improved fuzzy matching for `@` file suggestions with faster, more accurate results

**中文摘要**
- 本版以内存/稳定性为主。
- 变更计数：新增 0、修复 2、改进 2、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.56

**EN (raw bullets)**
- Added setting to enable/disable terminal progress bar (OSC 9;4)
- VSCode Extension: Added support for VS Code's secondary sidebar (VS Code 1.97+), allowing Claude Code to be displayed in the right sidebar while keeping the file explorer on the left. Requires setting sidebar as Preferred Location in the config.

**中文摘要**
- 本版以跨平台/IDE为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

