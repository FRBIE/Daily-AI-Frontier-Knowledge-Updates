# Claude Code Changelog Bilingual (Part 5)

Range: `2.0.57` -> `2.1.25` (earliest to latest in this part)

## 2.0.57

**EN (raw bullets)**
- Added feedback input when rejecting plans, allowing users to tell Claude what to change
- VSCode: Added streaming message support for real-time response display

**中文摘要**
- 本版以跨平台/IDE为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.58

**EN (raw bullets)**
- Pro users now have access to Opus 4.5 as part of their subscription!
- Fixed timer duration showing "11m 60s" instead of "12m 0s"
- Windows: Managed settings now prefer `C:\Program Files\ClaudeCode` if it exists. Support for `C:\ProgramData\ClaudeCode` will be removed in a future version.

**中文摘要**
- 本版以跨平台/IDE、模型/推理配置为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.59

**EN (raw bullets)**
- Added --agent CLI flag to override the agent setting for the current session
- Added `agent` setting to configure main thread with a specific agent's system prompt, tool restrictions, and model
- VS Code: Fixed .claude.json config file being read from incorrect location

**中文摘要**
- 本版以模型/推理配置为主。
- 变更计数：新增 2、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.60

**EN (raw bullets)**
- Added background agent support. Agents run in the background while you work
- Added --disable-slash-commands CLI flag to disable all slash commands
- Added model name to "Co-Authored-By" commit messages
- Enabled "/mcp enable [server-name]" or "/mcp disable [server-name]" to quickly toggle all servers
- Updated Fetch to skip summarization for pre-approved websites
- VSCode: Added support for multiple terminal clients connecting to the IDE server simultaneously

**中文摘要**
- 本版以安全/权限、跨平台/IDE、模型/推理配置为主。
- 变更计数：新增 3、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.61

**EN (raw bullets)**
- Reverted VSCode support for multiple terminal clients due to responsiveness issues.

**中文摘要**
- 本版以跨平台/IDE为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.62

**EN (raw bullets)**
- Added "(Recommended)" indicator for multiple-choice questions, with the recommended option moved to the top of the list
- Added `attribution` setting to customize commit and PR bylines (deprecates `includeCoAuthoredBy`)
- Fixed duplicate slash commands appearing when ~/.claude is symlinked to a project directory
- Fixed slash command selection not working when multiple commands share the same name
- Fixed an issue where skill files inside symlinked skill directories could become circular symlinks
- Fixed running versions getting removed because lock file incorrectly going stale
- Fixed IDE diff tab not closing when rejecting file changes

**中文摘要**
- 本版以安全/权限、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 2、修复 5、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.64

**EN (raw bullets)**
- Made auto-compacting instant
- Agents and bash commands can run asynchronously and send messages to wake up the main agent
- /stats now provides users with interesting CC stats, such as favorite model, usage graph, usage streak
- Added named session support: use `/rename` to name sessions, `/resume <name>` in REPL or `claude --resume <name>` from the terminal to resume them
- Added support for .claude/rules/`.  See https://code.claude.com/docs/en/memory for details.
- Added image dimension metadata when images are resized, enabling accurate coordinate mappings for large images
- Fixed auto-loading .env when using native installer
- Fixed `--system-prompt` being ignored when using `--continue` or `--resume` flags
- Improved `/resume` screen with grouped forked sessions and keyboard shortcuts for preview (P) and rename (R)
- VSCode: Added copy-to-clipboard button on code blocks and bash tool inputs
- VSCode: Fixed extension not working on Windows ARM64 by falling back to x64 binary via emulation
- Bedrock: Improve efficiency of token counting
- Bedrock: Add support for `aws login` AWS Management Console credentials
- Unshipped AgentOutputTool and BashOutputTool, in favor of a new unified TaskOutputTool

**中文摘要**
- 本版以内存/稳定性、跨平台/IDE、模型/推理配置为主。
- 变更计数：新增 3、修复 2、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.65

**EN (raw bullets)**
- Added ability to switch models while writing a prompt using alt+p (linux, windows), option+p (macos).
- Added context window information to status line input
- Added `fileSuggestion` setting for custom `@` file search commands
- Added `CLAUDE_CODE_SHELL` environment variable to override automatic shell detection (useful when login shell differs from actual working shell)
- Fixed prompt not being saved to history when aborting a query with Escape
- Fixed Read tool image handling to identify format from bytes instead of file extension

**中文摘要**
- 本版以跨平台/IDE、模型/推理配置为主。
- 变更计数：新增 4、修复 2、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.67

**EN (raw bullets)**
- Thinking mode is now enabled by default for Opus 4.5
- Thinking mode configuration has moved to /config
- Added search functionality to `/permissions` command with `/` keyboard shortcut for filtering rules by tool name
- Show reason why autoupdater is disabled in `/doctor`
- Fixed false "Another process is currently updating Claude" error when running `claude update` while another instance is already on the latest version
- Fixed MCP servers from `.mcp.json` being stuck in pending state when running in non-interactive mode (`-p` flag or piped input)
- Fixed scroll position resetting after deleting a permission rule in `/permissions`
- Fixed word deletion (opt+delete) and word navigation (opt+arrow) not working correctly with non-Latin text such as Cyrillic, Greek, Arabic, Hebrew, Thai, and Chinese
- Fixed `claude install --force` not bypassing stale lock files
- Fixed consecutive @~/ file references in CLAUDE.md being incorrectly parsed due to markdown strikethrough interference
- Windows: Fixed plugin MCP servers failing due to colons in log directory paths

**中文摘要**
- 本版以安全/权限、跨平台/IDE、模型/推理配置为主。
- 变更计数：新增 1、修复 6、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.68

**EN (raw bullets)**
- Fixed IME (Input Method Editor) support for languages like Chinese, Japanese, and Korean by correctly positioning the composition window at the cursor
- Fixed a bug where disallowed MCP tools were visible to the model
- Fixed an issue where steering messages could be lost while a subagent is working
- Fixed Option+Arrow word navigation treating entire CJK (Chinese, Japanese, Korean) text sequences as a single word instead of navigating by word boundaries
- Improved plan mode exit UX: show simplified yes/no dialog when exiting with empty or missing plan instead of throwing an error
- Add support for enterprise managed settings. Contact your Anthropic account team to enable this feature.

**中文摘要**
- 本版以模型/推理配置、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 4、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.69

**EN (raw bullets)**
- Minor bugfixes

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.70

**EN (raw bullets)**
- Added Enter key to accept and submit prompt suggestions immediately (tab still accepts for editing)
- Added wildcard syntax `mcp__server__*` for MCP tool permissions to allow or deny all tools from a server
- Added auto-update toggle for plugin marketplaces, allowing per-marketplace control over automatic updates
- Added `current_usage` field to status line input, enabling accurate context window percentage calculations
- Fixed input being cleared when processing queued commands while the user was typing
- Fixed prompt suggestions replacing typed input when pressing Tab
- Fixed diff view not updating when terminal is resized
- Improved memory usage by 3x for large conversations
- Improved resolution of stats screenshots copied to clipboard (Ctrl+S) for crisper images
- Removed # shortcut for quick memory entry (tell Claude to edit your CLAUDE.md instead)
- Fix thinking mode toggle in /config not persisting correctly
- Improve UI for file creation permission dialog

**中文摘要**
- 本版以安全/权限、内存/稳定性、跨平台/IDE为主。
- 变更计数：新增 4、修复 3、改进 2、变更 0、移除 1。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.71

**EN (raw bullets)**
- Added /config toggle to enable/disable prompt suggestions
- Added `/settings` as an alias for the `/config` command
- Fixed @ file reference suggestions incorrectly triggering when cursor is in the middle of a path
- Fixed MCP servers from `.mcp.json` not loading when using `--dangerously-skip-permissions`
- Fixed permission rules incorrectly rejecting valid bash commands containing shell glob patterns (e.g., `ls *.txt`, `for f in *.png`)
- Bedrock: Environment variable `ANTHROPIC_BEDROCK_BASE_URL` is now respected for token counting and inference profile listing
- New syntax highlighting engine for native build

**中文摘要**
- 本版以安全/权限、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 2、修复 3、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.72

**EN (raw bullets)**
- Added Claude in Chrome (Beta) feature that works with the Chrome extension (https://claude.ai/chrome) to let you control your browser directly from Claude Code
- Reduced terminal flickering
- Added scannable QR code to mobile app tip for quick app downloads
- Added loading indicator when resuming conversations for better feedback
- Fixed `/context` command not respecting custom system prompts in non-interactive mode
- Fixed order of consecutive Ctrl+K lines when pasting with Ctrl+Y
- Improved @ mention file suggestion speed (~3× faster in git repositories)
- Improved file suggestion performance in repos with `.ignore` or `.rgignore` files
- Improved settings validation errors to be more prominent
- Changed thinking toggle from Tab to Alt+T to avoid accidental triggers

**中文摘要**
- 本版以跨平台/IDE为主。
- 变更计数：新增 3、修复 2、改进 3、变更 1、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.73

**EN (raw bullets)**
- Added clickable `[Image #N]` links that open attached images in the default viewer
- Added alt-y yank-pop to cycle through kill ring history after ctrl-y yank
- Added search filtering to the plugin discover screen (type to filter by name, description, or marketplace)
- Added support for custom session IDs when forking sessions with `--session-id` combined with `--resume` or `--continue` and `--fork-session`
- Fixed slow input history cycling and race condition that could overwrite text after message submission
- Improved `/theme` command to open theme picker directly
- Improved theme picker UI
- Improved search UX across resume session, permissions, and plugins screens with a unified SearchBox component
- [VSCode] Added tab icon badges showing pending permissions (blue) and unread completions (orange)

**中文摘要**
- 本版以安全/权限、跨平台/IDE、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 4、修复 1、改进 3、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.74

**EN (raw bullets)**
- Added LSP (Language Server Protocol) tool for code intelligence features like go-to-definition, find references, and hover documentation
- Added `/terminal-setup` support for Kitty, Alacritty, Zed, and Warp terminals
- Added ctrl+t shortcut in `/theme` to toggle syntax highlighting on/off
- Added syntax highlighting info to theme picker
- Added guidance for macOS users when Alt shortcuts fail due to terminal configuration
- Fixed skill `allowed-tools` not being applied to tools invoked by the skill
- Fixed Opus 4.5 tip incorrectly showing when user was already using Opus
- Fixed a potential crash when syntax highlighting isn't initialized correctly
- Fixed visual bug in `/plugins discover` where list selection indicator showed while search box was focused
- Fixed macOS keyboard shortcuts to display 'opt' instead of 'alt'
- Improved `/context` command visualization with grouped skills and agents by source, slash commands, and sorted token count
- [Windows] Fixed issue with improper rendering
- [VSCode] Added gift tag pictogram for year-end promotion message

**中文摘要**
- 本版以跨平台/IDE、模型/推理配置、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 5、修复 5、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.75

**EN (raw bullets)**
- Minor bugfixes

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.0.76

**EN (raw bullets)**
- Fixed issue with macOS code-sign warning when using Claude in Chrome integration

**中文摘要**
- 本版以跨平台/IDE为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.0

**EN (raw bullets)**
- Added automatic skill hot-reload - skills created or modified in `~/.claude/skills` or `.claude/skills` are now immediately available without restarting the session
- Added support for running skills and slash commands in a forked sub-agent context using `context: fork` in skill frontmatter
- Added support for `agent` field in skills to specify agent type for execution
- Added `language` setting to configure Claude's response language (e.g., language: "japanese")
- Changed Shift+Enter to work out of the box in iTerm2, WezTerm, Ghostty, and Kitty without modifying terminal configs
- Added `respectGitignore` support in `settings.json` for per-project control over @-mention file picker behavior
- Added `IS_DEMO` environment variable to hide email and organization from the UI, useful for streaming or recording sessions
- Fixed security issue where sensitive data (OAuth tokens, API keys, passwords) could be exposed in debug logs
- Fixed files and skills not being properly discovered when resuming sessions with `-c` or `--resume`
- Fixed pasted content being lost when replaying prompts from history using up arrow or Ctrl+R search
- Fixed Esc key with queued prompts to only move them to input without canceling the running task
- Reduced permission prompts for complex bash commands
- Fixed command search to prioritize exact and prefix matches on command names over fuzzy matches in descriptions
- Fixed PreToolUse hooks to allow `updatedInput` when returning `ask` permission decision, enabling hooks to act as middleware while still requesting user consent
- Fixed plugin path resolution for file-based marketplace sources
- Fixed LSP tool being incorrectly enabled when no LSP servers were configured
- Fixed background tasks failing with "git repository not found" error for repositories with dots in their names
- Fixed Claude in Chrome support for WSL environments
- Fixed Windows native installer silently failing when executable creation fails
- Improved CLI help output to display options and subcommands in alphabetical order for easier navigation
- Added wildcard pattern matching for Bash tool permissions using `*` at any position in rules (e.g., `Bash(npm *)`, `Bash(* install)`, `Bash(git * main)`)
- Added unified Ctrl+B backgrounding for both bash commands and agents - pressing Ctrl+B now backgrounds all running foreground tasks simultaneously
- Added support for MCP `list_changed` notifications, allowing MCP servers to dynamically update their available tools, prompts, and resources without requiring reconnection
- Added `/teleport` and `/remote-env` slash commands for claude.ai subscribers, allowing them to resume and configure remote sessions
- Added support for disabling specific agents using `Task(AgentName)` syntax in settings.json permissions or the `--disallowedTools` CLI flag
- Added hooks support to agent frontmatter, allowing agents to define PreToolUse, PostToolUse, and Stop hooks scoped to the agent's lifecycle
- Added hooks support for skill and slash command frontmatter
- Added new Vim motions: `;` and `,` to repeat f/F/t/T motions, `y` operator for yank with `yy`/`Y`, `p`/`P` for paste, text objects (`iw`, `aw`, `iW`, `aW`, `i"`, `a"`, `i'`, `a'`, `i(`, `a(`, `i[`, `a[`, `i{`, `a{`), `>>` and `<<` for indent/dedent, and `J` to join lines
- Added `/plan` command shortcut to enable plan mode directly from the prompt
- Added slash command autocomplete support when `/` appears anywhere in input, not just at the beginning
- Added `--tools` flag support in interactive mode to restrict which built-in tools Claude can use during interactive sessions
- Added `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS` environment variable to override the default file read token limit
- Added support for `once: true` config for hooks
- Added support for YAML-style lists in frontmatter `allowed-tools` field for cleaner skill declarations
- Added support for prompt and agent hook types from plugins (previously only command hooks were supported)
- Added Cmd+V support for image paste in iTerm2 (maps to Ctrl+V)
- Added left/right arrow key navigation for cycling through tabs in dialogs
- Added real-time thinking block display in Ctrl+O transcript mode
- Added filepath to full output in background bash task details dialog
- Added Skills as a separate category in the context visualization
- Fixed OAuth token refresh not triggering when server reports token expired but local expiration check disagrees
- Fixed session persistence getting stuck after transient server errors by recovering from 409 conflicts when the entry was actually stored
- Fixed session resume failures caused by orphaned tool results during concurrent tool execution
- Fixed a race condition where stale OAuth tokens could be read from the keychain cache during concurrent token refresh attempts
- Fixed AWS Bedrock subagents not inheriting EU/APAC cross-region inference model configuration, causing 403 errors when IAM permissions are scoped to specific regions
- Fixed API context overflow when background tasks produce large output by truncating to 30K chars with file path reference
- Fixed a hang when reading FIFO files by skipping symlink resolution for special file types
- Fixed terminal keyboard mode not being reset on exit in Ghostty, iTerm2, Kitty, and WezTerm
- Fixed Alt+B and Alt+F (word navigation) not working in iTerm2, Ghostty, Kitty, and WezTerm
- Fixed `${CLAUDE_PLUGIN_ROOT}` not being substituted in plugin `allowed-tools` frontmatter, which caused tools to incorrectly require approval
- Fixed files created by the Write tool using hardcoded 0o600 permissions instead of respecting the system umask
- Fixed commands with `$()` command substitution failing with parse errors
- Fixed multi-line bash commands with backslash continuations being incorrectly split and flagged for permissions
- Fixed bash command prefix extraction to correctly identify subcommands after global options (e.g., `git -C /path log` now correctly matches `Bash(git log:*)` rules)
- Fixed slash commands passed as CLI arguments (e.g., `claude /context`) not being executed properly
- Fixed pressing Enter after Tab-completing a slash command selecting a different command instead of submitting the completed one
- Fixed slash command argument hint flickering and inconsistent display when typing commands with arguments
- Fixed Claude sometimes redundantly invoking the Skill tool when running slash commands directly
- Fixed skill token estimates in `/context` to accurately reflect frontmatter-only loading
- Fixed subagents sometimes not inheriting the parent's model by default
- Fixed model picker showing incorrect selection for Bedrock/Vertex users using `--model haiku`
- Fixed duplicate Bash commands appearing in permission request option labels
- Fixed noisy output when background tasks complete - now shows clean completion message instead of raw output
- Fixed background task completion notifications to appear proactively with bullet point
- Fixed forked slash commands showing "AbortError" instead of "Interrupted" message when cancelled
- Fixed cursor disappearing after dismissing permission dialogs
- Fixed `/hooks` menu selecting wrong hook type when scrolling to a different option
- Fixed images in queued prompts showing as "[object Object]" when pressing Esc to cancel
- Fixed images being silently dropped when queueing messages while backgrounding a task
- Fixed large pasted images failing with "Image was too large" error
- Fixed extra blank lines in multiline prompts containing CJK characters (Japanese, Chinese, Korean)
- Fixed ultrathink keyword highlighting being applied to wrong characters when user prompt text wraps to multiple lines
- Fixed collapsed "Reading X files…" indicator incorrectly switching to past tense when thinking blocks appear mid-stream
- Fixed Bash read commands (like `ls` and `cat`) not being counted in collapsed read/search groups, causing groups to incorrectly show "Read 0 files"
- Fixed spinner token counter to properly accumulate tokens from subagents during execution
- Fixed memory leak in git diff parsing where sliced strings retained large parent strings
- Fixed race condition where LSP tool could return "no server available" during startup
- Fixed feedback submission hanging indefinitely when network requests timeout
- Fixed search mode in plugin discovery and log selector views exiting when pressing up arrow
- Fixed hook success message showing trailing colon when hook has no output
- Multiple optimizations to improve startup performance
- Improved terminal rendering performance when using native installer or Bun, especially for text with emoji, ANSI codes, and Unicode characters
- Improved performance when reading Jupyter notebooks with many cells
- Improved reliability for piped input like `cat refactor.md | claude`
- Improved reliability for AskQuestion tool
- Improved sed in-place edit commands to render as file edits with diff preview
- Improved Claude to automatically continue when response is cut off due to output token limit, instead of showing an error message
- Improved compaction reliability
- Improved subagents (Task tool) to continue working after permission denial, allowing them to try alternative approaches
- Improved skills to show progress while executing, displaying tool uses as they happen
- Improved skills from `/skills/` directories to be visible in the slash command menu by default (opt-out with `user-invocable: false` in frontmatter)
- Improved skill suggestions to prioritize recently and frequently used skills
- Improved spinner feedback when waiting for the first response token
- Improved token count display in spinner to include tokens from background agents
- Improved incremental output for async agents to give the main thread more control and visibility
- Improved permission prompt UX with Tab hint moved to footer, cleaner Yes/No input labels with contextual placeholders
- Improved the Claude in Chrome notification with shortened help text and persistent display until dismissed
- Improved macOS screenshot paste reliability with TIFF format support
- Improved `/stats` output
- Updated Atlassian MCP integration to use a more reliable default configuration (streamable HTTP)
- Changed "Interrupted" message color from red to grey for a less alarming appearance
- Removed permission prompt when entering plan mode - users can now enter plan mode without approval
- Removed underline styling from image reference links
- [SDK] Changed minimum zod peer dependency to ^4.0.0
- [VSCode] Added currently selected model name to the context menu
- [VSCode] Added descriptive labels on auto-accept permission button (e.g., "Yes, allow npm for this project" instead of "Yes, and don't ask again")
- [VSCode] Fixed paragraph breaks not rendering in markdown content
- [VSCode] Fixed scrolling in the extension inadvertently scrolling the parent iframe
- [Windows] Fixed issue with improper rendering

**中文摘要**
- 本版以安全/权限、内存/稳定性、跨平台/IDE为主。
- 变更计数：新增 26、修复 51、改进 19、变更 2、移除 2。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.2

**EN (raw bullets)**
- Added source path metadata to images dragged onto the terminal, helping Claude understand where images originated
- Added clickable hyperlinks for file paths in tool output in terminals that support OSC 8 (like iTerm)
- Added support for Windows Package Manager (winget) installations with automatic detection and update instructions
- Added Shift+Tab keyboard shortcut in plan mode to quickly select "auto-accept edits" option
- Added `FORCE_AUTOUPDATE_PLUGINS` environment variable to allow plugin autoupdate even when the main auto-updater is disabled
- Added `agent_type` to SessionStart hook input, populated if `--agent` is specified
- Fixed a command injection vulnerability in bash command processing where malformed input could execute arbitrary commands
- Fixed a memory leak where tree-sitter parse trees were not being freed, causing WASM memory to grow unbounded over long sessions
- Fixed binary files (images, PDFs, etc.) being accidentally included in memory when using `@include` directives in CLAUDE.md files
- Fixed updates incorrectly claiming another installation is in progress
- Fixed crash when socket files exist in watched directories (defense-in-depth for EOPNOTSUPP errors)
- Fixed remote session URL and teleport being broken when using `/tasks` command
- Fixed MCP tool names being exposed in analytics events by sanitizing user-specific server configurations
- Improved Option-as-Meta hint on macOS to show terminal-specific instructions for native CSIu terminals like iTerm2, Kitty, and WezTerm
- Improved error message when pasting images over SSH to suggest using `scp` instead of the unhelpful clipboard shortcut hint
- Improved permission explainer to not flag routine dev workflows (git fetch/rebase, npm install, tests, PRs) as medium risk
- Changed large bash command outputs to be saved to disk instead of truncated, allowing Claude to read the full content
- Changed large tool outputs to be persisted to disk instead of truncated, providing full output access via file references
- Changed `/plugins` installed tab to unify plugins and MCPs with scope-based grouping
- Deprecated Windows managed settings path `C:\ProgramData\ClaudeCode\managed-settings.json` - administrators should migrate to `C:\Program Files\ClaudeCode\managed-settings.json`
- [SDK] Changed minimum zod peer dependency to ^4.0.0
- [VSCode] Fixed usage display not updating after manual compact

**中文摘要**
- 本版以安全/权限、内存/稳定性、跨平台/IDE为主。
- 变更计数：新增 6、修复 7、改进 3、变更 3、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.3

**EN (raw bullets)**
- Merged slash commands and skills, simplifying the mental model with no change in behavior
- Added release channel (`stable` or `latest`) toggle to `/config`
- Added detection and warnings for unreachable permission rules, with warnings in `/doctor` and after saving rules that include the source of each rule and actionable fix guidance
- Fixed plan files persisting across `/clear` commands, now ensuring a fresh plan file is used after clearing a conversation
- Fixed false skill duplicate detection on filesystems with large inodes (e.g., ExFAT) by using 64-bit precision for inode values
- Fixed mismatch between background task count in status bar and items shown in tasks dialog
- Fixed sub-agents using the wrong model during conversation compaction
- Fixed web search in sub-agents using incorrect model
- Fixed trust dialog acceptance when running from the home directory not enabling trust-requiring features like hooks during the session
- Improved terminal rendering stability by preventing uncontrolled writes from corrupting cursor state
- Improved slash command suggestion readability by truncating long descriptions to 2 lines
- Changed tool hook execution timeout from 60 seconds to 10 minutes
- [VSCode] Added clickable destination selector for permission requests, allowing you to choose where settings are saved (this project, all projects, shared with team, or session only)

**中文摘要**
- 本版以安全/权限、跨平台/IDE、模型/推理配置为主。
- 变更计数：新增 2、修复 6、改进 2、变更 1、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.4

**EN (raw bullets)**
- Added `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` environment variable to disable all background task functionality including auto-backgrounding and the Ctrl+B shortcut
- Fixed "Help improve Claude" setting fetch to refresh OAuth and retry when it fails due to a stale OAuth token

**中文摘要**
- 本版以安全/权限为主。
- 变更计数：新增 1、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.5

**EN (raw bullets)**
- Added `CLAUDE_CODE_TMPDIR` environment variable to override the temp directory used for internal temp files, useful for environments with custom temp directory requirements

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.6

**EN (raw bullets)**
- Added search functionality to `/config` command for quickly filtering settings
- Added Updates section to `/doctor` showing auto-update channel and available npm versions (stable/latest)
- Added date range filtering to `/stats` command - press `r` to cycle between Last 7 days, Last 30 days, and All time
- Added automatic discovery of skills from nested `.claude/skills` directories when working with files in subdirectories
- Added `context_window.used_percentage` and `context_window.remaining_percentage` fields to status line input for easier context window display
- Added an error display when the editor fails during Ctrl+G
- Fixed permission bypass via shell line continuation that could allow blocked commands to execute
- Fixed false "File has been unexpectedly modified" errors when file watchers touch files without changing content
- Fixed text styling (bold, colors) getting progressively misaligned in multi-line responses
- Fixed the feedback panel closing unexpectedly when typing 'n' in the description field
- Fixed rate limit warning appearing at low usage after weekly reset (now requires 70% usage)
- Fixed rate limit options menu incorrectly auto-opening when resuming a previous session
- Fixed numpad keys outputting escape sequences instead of characters in Kitty keyboard protocol terminals
- Fixed Option+Return not inserting newlines in Kitty keyboard protocol terminals
- Fixed corrupted config backup files accumulating in the home directory (now only one backup is created per config file)
- Fixed `mcp list` and `mcp get` commands leaving orphaned MCP server processes
- Fixed visual artifacts in ink2 mode when nodes become hidden via `display:none`
- Improved the external CLAUDE.md imports approval dialog to show which files are being imported and from where
- Improved the `/tasks` dialog to go directly to task details when there's only one background task running
- Improved @ autocomplete with icons for different suggestion types and single-line formatting
- Updated "Help improve Claude" setting fetch to refresh OAuth and retry when it fails due to a stale OAuth token
- Changed task notification display to cap at 3 lines with overflow summary when multiple background tasks complete simultaneously
- Changed terminal title to "Claude Code" on startup for better window identification
- Removed ability to @-mention MCP servers to enable/disable - use `/mcp enable <name>` instead
- [VSCode] Fixed usage indicator not updating after manual compact

**中文摘要**
- 本版以安全/权限、跨平台/IDE、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 6、修复 11、改进 3、变更 2、移除 1。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.7

**EN (raw bullets)**
- Added `showTurnDuration` setting to hide turn duration messages (e.g., "Cooked for 1m 6s")
- Added ability to provide feedback when accepting permission prompts
- Added inline display of agent's final response in task notifications, making it easier to see results without reading the full transcript file
- Fixed security vulnerability where wildcard permission rules could match compound commands containing shell operators
- Fixed false "file modified" errors on Windows when cloud sync tools, antivirus scanners, or Git touch file timestamps without changing content
- Fixed orphaned tool_result errors when sibling tools fail during streaming execution
- Fixed context window blocking limit being calculated using the full context window instead of the effective context window (which reserves space for max output tokens)
- Fixed spinner briefly flashing when running local slash commands like `/model` or `/theme`
- Fixed terminal title animation jitter by using fixed-width braille characters
- Fixed plugins with git submodules not being fully initialized when installed
- Fixed bash commands failing on Windows when temp directory paths contained characters like `t` or `n` that were misinterpreted as escape sequences
- Improved typing responsiveness by reducing memory allocation overhead in terminal rendering
- Enabled MCP tool search auto mode by default for all users. When MCP tool descriptions exceed 10% of the context window, they are automatically deferred and discovered via the MCPSearch tool instead of being loaded upfront. This reduces context usage for users with many MCP tools configured. Users can disable this by adding `MCPSearch` to `disallowedTools` in their settings.
- Changed OAuth and API Console URLs from console.anthropic.com to platform.claude.com
- [VSCode] Fixed `claudeProcessWrapper` setting passing the wrapper path instead of the Claude binary path

**中文摘要**
- 本版以安全/权限、内存/稳定性、跨平台/IDE为主。
- 变更计数：新增 3、修复 8、改进 1、变更 1、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.9

**EN (raw bullets)**
- Added `auto:N` syntax for configuring the MCP tool search auto-enable threshold, where N is the context window percentage (0-100)
- Added `plansDirectory` setting to customize where plan files are stored
- Added external editor support (Ctrl+G) in AskUserQuestion "Other" input field
- Added session URL attribution to commits and PRs created from web sessions
- Added support for `PreToolUse` hooks to return `additionalContext` to the model
- Added `${CLAUDE_SESSION_ID}` string substitution for skills to access the current session ID
- Fixed long sessions with parallel tool calls failing with an API error about orphan tool_result blocks
- Fixed MCP server reconnection hanging when cached connection promise never resolves
- Fixed Ctrl+Z suspend not working in terminals using Kitty keyboard protocol (Ghostty, iTerm2, kitty, WezTerm)

**中文摘要**
- 本版以内存/稳定性、跨平台/IDE、模型/推理配置为主。
- 变更计数：新增 6、修复 3、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.10

**EN (raw bullets)**
- Added new `Setup` hook event that can be triggered via `--init`, `--init-only`, or `--maintenance` CLI flags for repository setup and maintenance operations
- Added keyboard shortcut 'c' to copy OAuth URL when browser doesn't open automatically during login
- Fixed a crash when running bash commands containing heredocs with JavaScript template literals like `${index + 1}`
- Improved startup to capture keystrokes typed before the REPL is fully ready
- Improved file suggestions to show as removable attachments instead of inserting text when accepted
- [VSCode] Added install count display to plugin listings
- [VSCode] Added trust warning when installing plugins

**中文摘要**
- 本版以安全/权限、跨平台/IDE、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 2、修复 1、改进 2、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.11

**EN (raw bullets)**
- Fixed excessive MCP connection requests for HTTP/SSE transports

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.12

**EN (raw bullets)**
- Fixed message rendering bug

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.14

**EN (raw bullets)**
- Added history-based autocomplete in bash mode (`!`) - type a partial command and press Tab to complete from your bash command history
- Added search to installed plugins list - type to filter by name or description
- Added support for pinning plugins to specific git commit SHAs, allowing marketplace entries to install exact versions
- Fixed a regression where the context window blocking limit was calculated too aggressively, blocking users at ~65% context usage instead of the intended ~98%
- Fixed memory issues that could cause crashes when running parallel subagents
- Fixed memory leak in long-running sessions where stream resources were not cleaned up after shell commands completed
- Fixed `@` symbol incorrectly triggering file autocomplete suggestions in bash mode
- Fixed `@`-mention menu folder click behavior to navigate into directories instead of selecting them
- Fixed `/feedback` command generating invalid GitHub issue URLs when description is very long
- Fixed `/context` command to show the same token count and percentage as the status line in verbose mode
- Fixed an issue where `/config`, `/context`, `/model`, and `/todos` command overlays could close unexpectedly
- Fixed slash command autocomplete selecting wrong command when typing similar commands (e.g., `/context` vs `/compact`)
- Fixed inconsistent back navigation in plugin marketplace when only one marketplace is configured
- Fixed iTerm2 progress bar not clearing properly on exit, preventing lingering indicators and bell sounds
- Improved backspace to delete pasted text as a single token instead of one character at a time
- [VSCode] Added `/usage` command to display current plan usage

**中文摘要**
- 本版以内存/稳定性、跨平台/IDE、模型/推理配置为主。
- 变更计数：新增 3、修复 11、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.15

**EN (raw bullets)**
- Added deprecation notification for npm installations - run `claude install` or see https://docs.anthropic.com/en/docs/claude-code/getting-started for more options
- Improved UI rendering performance with React Compiler
- Fixed the "Context left until auto-compact" warning not disappearing after running `/compact`
- Fixed MCP stdio server timeout not killing child process, which could cause UI freezes

**中文摘要**
- 本版以扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 1、修复 2、改进 1、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.16

**EN (raw bullets)**
- Added new task management system, including new capabilities like dependency tracking
- [VSCode] Added native plugin management support
- [VSCode] Added ability for OAuth users to browse and resume remote Claude sessions from the Sessions dialog
- Fixed out-of-memory crashes when resuming sessions with heavy subagent usage
- Fixed an issue where the "context remaining" warning was not hidden after running `/compact`
- Fixed session titles on the resume screen not respecting the user's language setting
- [IDE] Fixed a race condition on Windows where the Claude Code sidebar view container would not appear on start

**中文摘要**
- 本版以安全/权限、内存/稳定性、跨平台/IDE为主。
- 变更计数：新增 1、修复 3、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.17

**EN (raw bullets)**
- Fixed crashes on processors without AVX instruction support

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.18

**EN (raw bullets)**
- Added customizable keyboard shortcuts. Configure keybindings per context, create chord sequences, and personalize your workflow. Run `/keybindings` to get started. Learn more at https://code.claude.com/docs/en/keybindings

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 1、修复 0、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.19

**EN (raw bullets)**
- Added env var `CLAUDE_CODE_ENABLE_TASKS`, set to `false` to keep the old system temporarily
- Added shorthand `$0`, `$1`, etc. for accessing individual arguments in custom commands
- Fixed crashes on processors without AVX instruction support
- Fixed dangling Claude Code processes when terminal is closed by catching EIO errors from `process.exit()` and using SIGKILL as fallback
- Fixed `/rename` and `/tag` not updating the correct session when resuming from a different directory (e.g., git worktrees)
- Fixed resuming sessions by custom title not working when run from a different directory
- Fixed pasted text content being lost when using prompt stash (Ctrl+S) and restore
- Fixed agent list displaying "Sonnet (default)" instead of "Inherit (default)" for agents without an explicit model setting
- Fixed backgrounded hook commands not returning early, potentially causing the session to wait on a process that was intentionally backgrounded
- Fixed file write preview omitting empty lines
- Changed skills without additional permissions or hooks to be allowed without requiring approval
- Changed indexed argument syntax from `$ARGUMENTS.0` to `$ARGUMENTS[0]` (bracket syntax)
- [SDK] Added replay of `queued_command` attachment messages as `SDKUserMessageReplay` events when `replayUserMessages` is enabled
- [VSCode] Enabled session forking and rewind functionality for all users

**中文摘要**
- 本版以安全/权限、跨平台/IDE、模型/推理配置为主。
- 变更计数：新增 2、修复 8、改进 0、变更 2、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.20

**EN (raw bullets)**
- Added arrow key history navigation in vim normal mode when cursor cannot move further
- Added external editor shortcut (Ctrl+G) to the help menu for better discoverability
- Added PR review status indicator to the prompt footer, showing the current branch's PR state (approved, changes requested, pending, or draft) as a colored dot with a clickable link
- Added support for loading `CLAUDE.md` files from additional directories specified via `--add-dir` flag (requires setting `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1`)
- Added ability to delete tasks via the `TaskUpdate` tool
- Fixed session compaction issues that could cause resume to load full history instead of the compact summary
- Fixed agents sometimes ignoring user messages sent while actively working on a task
- Fixed wide character (emoji, CJK) rendering artifacts where trailing columns were not cleared when replaced by narrower characters
- Fixed JSON parsing errors when MCP tool responses contain special Unicode characters
- Fixed up/down arrow keys in multi-line and wrapped text input to prioritize cursor movement over history navigation
- Fixed draft prompt being lost when pressing UP arrow to navigate command history
- Fixed ghost text flickering when typing slash commands mid-input
- Fixed marketplace source removal not properly deleting settings
- Fixed duplicate output in some commands like `/context`
- Fixed task list sometimes showing outside the main conversation view
- Fixed syntax highlighting for diffs occurring within multiline constructs like Python docstrings
- Fixed crashes when cancelling tool use
- Improved `/sandbox` command UI to show dependency status with installation instructions when dependencies are missing
- Improved thinking status text with a subtle shimmer animation
- Improved task list to dynamically adjust visible items based on terminal height
- Improved fork conversation hint to show how to resume the original session
- Changed collapsed read/search groups to show present tense ("Reading", "Searching for") while in progress, and past tense ("Read", "Searched for") when complete
- Changed `ToolSearch` results to appear as a brief notification instead of inline in the conversation
- Changed the `/commit-push-pr` skill to automatically post PR URLs to Slack channels when configured via MCP tools
- Changed the `/copy` command to be available to all users
- Changed background agents to prompt for tool permissions before launching
- Changed permission rules like `Bash(*)` to be accepted and treated as equivalent to `Bash`
- Changed config backups to be timestamped and rotated (keeping 5 most recent) to prevent data loss

**中文摘要**
- 本版以安全/权限、跨平台/IDE、扩展生态(MCP/插件/Skill)为主。
- 变更计数：新增 5、修复 12、改进 4、变更 7、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.21

**EN (raw bullets)**
- Added support for full-width (zenkaku) number input from Japanese IME in option selection prompts
- Fixed shell completion cache files being truncated on exit
- Fixed API errors when resuming sessions that were interrupted during tool execution
- Fixed auto-compact triggering too early on models with large output token limits
- Fixed task IDs potentially being reused after deletion
- Fixed file search not working in VS Code extension on Windows
- Improved read/search progress indicators to show "Reading…" while in progress and "Read" when complete
- Improved Claude to prefer file operation tools (Read, Edit, Write) over bash equivalents (cat, sed, awk)
- [VSCode] Added automatic Python virtual environment activation, ensuring `python` and `pip` commands use the correct interpreter (configurable via `claudeCode.usePythonEnvironment` setting)
- [VSCode] Fixed message action buttons having incorrect background colors

**中文摘要**
- 本版以内存/稳定性、跨平台/IDE、模型/推理配置为主。
- 变更计数：新增 1、修复 5、改进 2、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.22

**EN (raw bullets)**
- Fixed structured outputs for non-interactive (-p) mode

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.23

**EN (raw bullets)**
- Added customizable spinner verbs setting (`spinnerVerbs`)
- Fixed mTLS and proxy connectivity for users behind corporate proxies or using client certificates
- Fixed per-user temp directory isolation to prevent permission conflicts on shared systems
- Fixed a race condition that could cause 400 errors when prompt caching scope was enabled
- Fixed pending async hooks not being cancelled when headless streaming sessions ended
- Fixed tab completion not updating the input field when accepting a suggestion
- Fixed ripgrep search timeouts silently returning empty results instead of reporting errors
- Improved terminal rendering performance with optimized screen data layout
- Changed Bash commands to show timeout duration alongside elapsed time
- Changed merged pull requests to show a purple status indicator in the prompt footer
- [IDE] Fixed model options displaying incorrect region strings for Bedrock users in headless mode

**中文摘要**
- 本版以安全/权限、跨平台/IDE、模型/推理配置为主。
- 变更计数：新增 1、修复 6、改进 1、变更 2、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

## 2.1.25

**EN (raw bullets)**
- Fixed beta header validation error for gateway users on Bedrock and Vertex, ensuring `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1` avoids the error

**中文摘要**
- 本版以通用修复/体验优化为主。
- 变更计数：新增 0、修复 1、改进 0、变更 0、移除 0。
- 升级关注：优先回归你常用工作流（模型选择、权限策略、MCP/插件、长会话稳定性）。

