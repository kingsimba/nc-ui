# nc-ui Project Guidelines

This project uses [@kingsimba/nc-ui](https://www.npmjs.com/package/@kingsimba/nc-ui) - a lightweight React UI component library.

## Critical Rules

### 1. Component Usage
**ALWAYS use nc-ui components instead of native HTML elements:**

- `<button>` → `<Button>` from `@kingsimba/nc-ui`
- `<input>` → `<Input>` from `@kingsimba/nc-ui`
- `<select>` → `<ComboBox>` from `@kingsimba/nc-ui`
- `<textarea>` → `<Input multiline>` from `@kingsimba/nc-ui`
- `<input type="number">` → `<NumberInput>` from `@kingsimba/nc-ui`
- `<input type="checkbox">` → `<Checkbox>` from `@kingsimba/nc-ui`

### 2. CSS Convention
All **component** classes and variables use `nc-` prefix:
- Classes: `.nc-button`, `.nc-input`, `.nc-primary`
- Variables: `--nc-primary`, `--nc-text`, `--nc-danger`

**Global utility styles** (WITHOUT `nc-` prefix):
- Headings: `<h1>`, `.h1`, `.h2`, `.h3`, `.h4`
- Text: `<p className="weak">`, `<p className="weaker">`
- Code: `<code>`, `.code-block`
- Tags: `.tag`, `.tag.red`, `.tag.green`, `.tag.yellow`, `.tag.blue`
- Blocks: `.block`, `.block.note`, `.block.warning`, `.block.danger`, `.block.icon`
- Lists: `<ul>`, `<ol>`, `<ul className="no-dots">`

### 3. Import Pattern
```tsx
// Components
import { Button, Input, ComboBox, Dialog } from '@kingsimba/nc-ui'
import '@kingsimba/nc-ui/styles.css'

// Icons (separate entry point)
import { CloseIcon, EditIcon } from '@kingsimba/nc-ui/icons'
```

### 4. onChange Handlers
nc-ui components pass values directly (not event objects):
```tsx
// ✅ Correct
<Input value={text} onChange={setText} />
<ComboBox value={id} onChange={setId} options={...} />

// ❌ Wrong
<Input onChange={(e) => setText(e.target.value)} />
```

## Quick Reference

### Common Components
- **Button**: `variant` (primary|danger|warning|success|ghost), `size` (small|default|large), `loading`, `block`
- **Input**: `clearable`, `type`, `multiline`, `showPasswordToggle`, `onEnter`
- **ComboBox**: `options`, `allowTyping`, `clearable`, `placeholder`
- **Dialog**: `open`, `onClose`, `title`, `footer`
- **ActivityIndicator**: `size`, `overlay`, `color`
- **Checkbox/Toggle**: `checked`, `onChange`, `label`
- **NumberInput**: `min`, `max`, `step`
- **Notification**: `showNotification({ message, type, duration })`

### CSS Variables
- `--nc-primary`, `--nc-danger`, `--nc-warning`, `--nc-success`
- `--nc-text`, `--nc-text-weak`
- `--nc-bg`, `--nc-button-bg`, `--nc-input-bg`

## Documentation

For complete documentation, see files in this directory:
- `architecture.md` - Architecture and patterns
- `components-quick-reference.md` - All components with examples
- `global-utility-styles.md` - Global styles (h1, p.weak, .tag, .block, etc.)
- `examples-and-antipatterns.md` - Usage examples and common mistakes
- `app-framework.md` - App framework guide (if using apps)

## Live Demo
https://kingsimba.github.io/nc-ui/

---

**Remember:** Always use nc-ui components, never native HTML form elements!
