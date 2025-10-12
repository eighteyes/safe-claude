# Safe Claude

Run Claude Code in secure, isolated Docker containers with multi-project support.

### 🔒 Security & Isolation
- Each project runs in its own isolated Docker container

### 🚀 Multi-Project Support
- Automatic container naming based on project directory
- Containers persist between sessions (start/stop automatically)

### 🛠️ Pre-installed Tools
- **Search & Navigation**: ripgrep (rg), fd, fzf, ast-grep
- **Data Processing**: jq (JSON), aggregate
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
# Run Claude Code in current directory
./safe-claude

# Show help
./safe-claude --help

# Remove current project container
./safe-claude --rm

# Remove ALL containers and images
./safe-claude --rm --all

# Save configuration state
./safe-claude --save
```

### First Time Setup

1. Run `./safe-claude` in your project directory
2. The script will build the base Docker image (one-time setup)
3. Claude Code will prompt for permissions and authentication
4. After configuring, run `./safe-claude --save` to persist your settings

### Container Management

#### Container Naming
- Containers are named: `claude-dev-{directory-name}`
- Each project directory gets its own container
- Containers persist between sessions

#### Configuration
- Ready state can be saved globally with `--save`
- Creates a `claude:ready` image with permissions pre-approved and configured
- No need to re-configure for each project, though tokens may expire

## Mounted Directories

The script automatically mounts:
- **Current directory** → `/workspace/{directory-name}`
- **~/.claude/commands** → Shared command definitions
- **~/.claude/agents** → Shared agent configurations
- **~/.claude/settings.json** → Shared settings

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


