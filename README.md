# Safe Claude

Run Claude Code in secure, isolated Docker containers with multi-project support.

### 🏠 Utilize Local Agents and Commands
- Copies your `~/.claude/{agents, commands, CLAUDE.md}` for use in every project.

### 🔒 Security & Isolation
- Each project runs in its own isolated Docker container

### 🚀 Multi-Project Support
- Automatic container naming based on project directory
- Containers persist between sessions (start/stop automatically)

### 🛠️ Pre-installed Tools
- **Search & Navigation**: ripgrep (rg), fd, fzf, ast-grep
- **Data Processing**: jq (JSON), yq (YAML)
- **Development**: git, gh (GitHub CLI), tmux, vim, nano
- **Shell**: zsh with oh-my-zsh, powerline10k theme
- **ccusage**: Track your Claude Code use
- **Node.js**: Node 20 with npm

## Installation

### Option 1: Install via npm (Recommended)

```bash
# Global installation
npm install -g safe-claude

# Or local installation
npm install safe-claude
```

### Option 2: Manual Installation

1. Ensure Docker is installed and running
2. Place the `safe-claude` script in your PATH or project directory
3. Make it executable:
   ```bash
   chmod +x safe-claude
   ```

## Usage

### Basic Commands

```bash
# Run Claude Code in current directory, drop into docker shell
./safe-claude

# Show help
./safe-claude --help

# Remove current project container
./safe-claude --rm

# Remove ALL containers and images
./safe-claude --rm --all

# Save current container state to image
./safe-claude --save
```

### First Time Setup

1. Run `safe-claude` in your project directory
2. The script builds the Docker image (one-time setup) and drops you into a `zsh` session
3. Run `claude` (pre-configured with `--dangerously-skip-permissions`) to authenticate
4. Exit the container and run `./safe-claude --save` to commit your configured state to the image
5. From now on, `safe-claude` will use your saved configuration in new project containers

### Container Management

#### Container Naming
- Containers are named: `claude-dev-{directory-name}`
- Each project directory gets its own isolated container
- Containers persist between sessions (auto-start/stop)

#### Configuration Persistence
- Use `--save` to commit current container state to the `claude-dev` image
- Saved state includes installed packages, configuration, and authentication
- All new containers start from your saved image state

## Mounted Directories

The script automatically mounts:
- **Current directory** → `/workspace/{directory-name}` (working directory)
- **~/.claude/commands** → Shared slash command definitions
- **~/.claude/agents** → Shared agent configurations
- **~/.claude/CLAUDE.md** → Global user instructions (read-only)

## Environment Variables
- `TERM` and `COLORTERM` - Preserved for proper terminal colors

## Aliases

Pre-configured aliases in containers:
- `c` - Shortcut for `claude --dangerously-skip-permissions`
- `claude` - Runs with `--dangerously-skip-permissions` flag
- `nrd` - Shortcut for `npm run build`

## CLAUDE.md suggestions
```
finding FILES? use 'fd'
finding TEXT/strings? use 'rg'
finding CODE STRUCTURE? use 'ast-grep'
interacting with JSON? use 'jq'
interacting with YAML or XML? use 'yq'
```


