# AI Reference Documentation

This nc-ui project includes **portable AI reference documentation** in the `ai-reference/` folder to help AI assistants understand and correctly use nc-ui components in other projects.

## Quick Overview

The `ai-reference/` folder contains:

```
ai-reference/
├── README.md                         # Usage instructions
├── copilot-instructions.md          # GitHub Copilot entry point (copy to .github/)
├── claude-context.md                # Claude Code entry point (copy to .claude/)
├── architecture.md                  # Architecture & conventions
├── components-quick-reference.md    # All 23+ components API
├── global-utility-styles.md         # Global styles (h1, .tag, .block, etc.)
├── examples-and-antipatterns.md     # Usage examples & common mistakes
└── app-framework.md                 # App framework guide (optional)
```

## Purpose

When you use `@kingsimba/nc-ui` in a new project, AI assistants might default to using native HTML elements like `<button>` or `<select>`. This documentation helps them:

✅ Use `<Button>` instead of `<button>`
✅ Use `<ComboBox>` instead of `<select>`
✅ Use `<Input>` instead of `<input>` or `<textarea>`
✅ Follow nc-ui conventions (CSS prefix, import patterns, onChange behavior)
✅ Avoid common mistakes (wrong event handlers, missing prefixes, etc.)

## For nc-ui Users (Integrating into Your Project)

### Step 1: Copy to Your Project

```bash
# Copy the entire ai-reference folder
cp -r /path/to/nc-ui/ai-reference /path/to/your-project/ai-reference
```

### Step 2: Setup AI Entry Points

#### For GitHub Copilot:
```bash
mkdir -p .github
cp ai-reference/copilot-instructions.md .github/copilot-instructions.md
```

#### For Claude Code:
```bash
mkdir -p .claude
cp ai-reference/claude-context.md .claude/project-context.md
```

### Step 3: Commit Everything

```bash
git add ai-reference/ .github/ .claude/
git commit -m "Add nc-ui AI reference documentation"
```

### Result

Your project structure will be:

```
your-project/
├── ai-reference/              # ← Shared documentation
│   ├── README.md
│   ├── architecture.md
│   ├── components-quick-reference.md
│   ├── global-utility-styles.md
│   ├── examples-and-antipatterns.md
│   ├── app-framework.md
│   ├── copilot-instructions.md    # Template
│   └── claude-context.md          # Template
├── .github/
│   └── copilot-instructions.md    # ← For GitHub Copilot
└── .claude/
    └── project-context.md         # ← For Claude Code
```

## Benefits

### 🎯 Portable
- Copy once, use in any project using nc-ui
- Same documentation for all AI tools
- Easy to update across projects

### 🔍 Discoverable
- AI-specific entry points (Copilot, Claude)
- Shared core documentation (no duplication)
- Clear file organization

### 📚 Comprehensive
- Complete component API reference
- Architecture & conventions
- Real-world examples
- Common mistakes guide

### 🔧 Maintainable
- Single source of truth in nc-ui repo
- Update once, copy to projects
- Clear separation of concerns

## What Each File Does

### Entry Points (AI-Specific)

**`copilot-instructions.md`**
- Brief, focused guide for GitHub Copilot
- Critical rules at the top
- Quick component reference
- Copy to `.github/copilot-instructions.md`

**`claude-context.md`**
- Detailed guide for Claude Code
- Architecture overview
- Common patterns with examples
- Copy to `.claude/project-context.md`

### Core Documentation (Shared)

**`architecture.md`**
- CSS naming conventions (nc- prefix)
- Component patterns
- Styling system & theme variables
- Built-in i18n
- Project structure

**`components-quick-reference.md`**
- All 23+ components with examples
- Import patterns
- Props and TypeScript types
- Migration guide (HTML → nc-ui)

**`examples-and-antipatterns.md`**
- ❌ Common mistakes (with fixes)
- ✅ Correct usage patterns
- Complete real-world examples
- Best practices checklist

**`app-framework.md`** *(Optional)*
- Only needed if using nc-ui's app framework
- App registration & lifecycle
- `useApp()` hook API
- Isolated i18n per app

## Usage Example

After setup, tell your AI:

> "I'm using @kingsimba/nc-ui. Always use nc-ui components instead of native HTML elements. Check ai-reference/ for the API."

The AI should then automatically:
- Use `<Button>` instead of `<button>`
- Use `<Input>` instead of `<input>`
- Use `<ComboBox>` instead of `<select>`
- Follow all nc-ui conventions

## Updating Documentation

When nc-ui is updated:

1. **Update docs in nc-ui repo** (`ai-reference/` folder)
2. **Copy to your projects:**
   ```bash
   cp -r nc-ui/ai-reference /path/to/your-project/ai-reference
   ```
3. **Commit changes**

## Troubleshooting

**AI still using native HTML?**
1. Check entry files exist (`.github/copilot-instructions.md` or `.claude/project-context.md`)
2. Verify files are committed to git
3. Explicitly mention nc-ui in your prompt

**AI not finding docs?**
1. Ensure `ai-reference/` is in project root
2. Check files are committed and pushed
3. Reference files directly: "Check ai-reference/components-quick-reference.md"

## Additional Resources

- **Live Demo:** https://kingsimba.github.io/nc-ui/
- **npm Package:** https://www.npmjs.com/package/@kingsimba/nc-ui
- **Full README:** See `ai-reference/README.md` for detailed instructions

---

**For nc-ui maintainers:** Keep this documentation up-to-date when adding new components or changing APIs. Users will copy this folder to their projects.

**For nc-ui users:** Copy the `ai-reference/` folder to your project and follow the setup instructions above.
