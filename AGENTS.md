# AGENTS.md - Repository Guide for AI Agents

This is a **VitePress documentation website** for the smtc2web project (a live music display tool). Content is in Chinese.

## Build Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm docs:dev

# Build for production
pnpm docs:build

# Preview production build
pnpm docs:preview
```

## Project Structure

```
.
├── .vitepress/
│   ├── config.mts          # Site configuration
│   ├── theme/
│   │   ├── index.ts        # Custom theme entry
│   │   └── style.css       # Custom styles
│   ├── cache/              # Build cache (gitignored)
│   └── dist/               # Build output (gitignored)
├── index.md                # Homepage (Chinese)
├── download.md             # Download page
├── wiki/                   # Documentation
│   ├── compile/
│   ├── *.md
├── public/                 # Static assets
└── package.json
```

## Code Style Guidelines

### TypeScript/JavaScript

- Use double quotes for strings
- Use semicolons
- 2-space indentation
- Use `satisfies` keyword for type annotations (see `theme/index.ts`)

### Markdown

- Use YAML frontmatter for page metadata
- Chinese language content preferred
- Use level-2 (`##`) and level-3 (`###`) headings for structure
- Code blocks specify language when applicable

### VitePress Configuration

- Config file: `.vitepress/config.mts` (TypeScript)
- Theme config: `.vitepress/theme/index.ts`
- Follow existing navigation structure in `nav` and `sidebar`
- Use `cleanUrls: true` (URLs without `.html` extension)

### File Naming

- Use kebab-case for markdown files (e.g., `change-fonts.md`)
- Use descriptive names for content files
- Static assets go in `public/` directory

## Important Notes

- No test suite is configured
- No linting/formatting tools are set up
- This is a documentation site only (no application code)
- Site is deployed to GitHub Pages from `.vitepress/dist`
- Uses pnpm as package manager

## Common Tasks

Adding a new wiki page:
1. Create `.md` file in appropriate `wiki/` subdirectory
2. Add entry to sidebar in `.vitepress/config.mts`
3. Use frontmatter for metadata if needed

Updating navigation:
- Edit `nav` array in `.vitepress/config.mts` for top navigation
- Edit `sidebar` object for left sidebar structure

## Dependencies

- `vitepress`: ^1.6.4 (documentation framework)
- Vue 3 (via VitePress)

## Git

Never commit:
- `node_modules/`
- `.vitepress/dist/`
- `.vitepress/cache/`

These are already in `.gitignore`.
