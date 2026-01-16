# nc-ui Project Context

This project uses `@kingsimba/nc-ui` - a lightweight (75KB), production-ready React UI component library with 23+ components.

## Essential Rules

### Component Substitution
**Replace ALL native HTML form elements with nc-ui components:**

| Native HTML | nc-ui Component | Import |
|-------------|----------------|--------|
| `<button>` | `<Button>` | `@kingsimba/nc-ui` |
| `<input type="text">` | `<Input>` | `@kingsimba/nc-ui` |
| `<textarea>` | `<Input multiline>` | `@kingsimba/nc-ui` |
| `<select>` | `<ComboBox>` | `@kingsimba/nc-ui` |
| `<input type="number">` | `<NumberInput>` | `@kingsimba/nc-ui` |
| `<input type="checkbox">` | `<Checkbox>` | `@kingsimba/nc-ui` |
| `<input type="range">` | `<Slider>` | `@kingsimba/nc-ui` |

### CSS Naming

#### Component Styles (WITH `nc-` prefix)
- **Classes:** `.nc-button`, `.nc-input`, `.nc-combo-dropdown`, `.nc-primary`
- **Variables:** `--nc-primary`, `--nc-text`, `--nc-danger`
- **Modifiers:** `.nc-small`, `.nc-large`, `.nc-danger`, `.nc-primary`

#### Global Utility Styles (WITHOUT `nc-` prefix)
nc-ui provides global styles for common HTML elements:
- **Headings:** `<h1>`, `<h2>`, `.h1`, `.h2`, `.h3`, `.h4`
- **Text:** `<p className="weak">`, `<p className="weaker">`
- **Code:** `<code>`, `.code-block`
- **Tags:** `.tag`, `.tag.red`, `.tag.yellow`, `.tag.green`, `.tag.blue`
- **Blocks:** `.block`, `.block.note`, `.block.warning`, `.block.danger`, `.block.icon`
- **Lists:** `<ul>`, `<ol>`, `<ul className="no-dots">`

**See `global-utility-styles.md` for complete details.**

### Import Patterns
```tsx
// Main components
import { Button, Input, ComboBox, Dialog, ActivityIndicator } from '@kingsimba/nc-ui'
import '@kingsimba/nc-ui/styles.css'

// Icons - SEPARATE entry point to keep bundle small
import { CloseIcon, EditIcon, TrashIcon } from '@kingsimba/nc-ui/icons'

// YAML editor - Optional
import { YamlTextArea } from '@kingsimba/nc-ui/yaml'
```

### Event Handling
Important: nc-ui components pass **values directly**, not event objects:

```tsx
// ✅ CORRECT
<Input
  value={text}
  onChange={setText}  // Receives: (value: string) => void
/>

<ComboBox
  value={selected}
  onChange={setSelected}  // Receives: (value: string | undefined) => void
  options={[...]}
/>

// ❌ WRONG - Don't treat like native HTML
<Input
  value={text}
  onChange={(e) => setText(e.target.value)}  // This won't work!
/>
```

**Exception:** `Button` keeps standard React onClick: `onClick={(e) => {...}}`

## Architecture Overview

### Styling System
- All styles use CSS variables with `nc-` prefix
- Theme can be overridden in root CSS
- Light/dark mode support via `.light` class on `:root`

### CSS Variables & Theming
- All theme colors use `--nc-` prefixed CSS variables
- Support for light/dark themes via `:root.light` selector
- Override variables to customize appearance

### App Framework (Optional)
If this project uses nc-ui's app framework:
```tsx
import { appRegistry, runningAppsStore, useApp } from '@kingsimba/nc-ui'

// Register apps with lazy loading
const LazyMyApp = React.lazy(() => import('./MyApp').then(m => ({ default: m.MyApp })))

appRegistry.register({
  id: 'my-app',
  titleKey: 'apps.myApp.name',
  icon: MyAppIcon,
  component: LazyMyApp,
  width: 400,
})

// Launch apps
await runningAppsStore.launchApp('my-app')

// Inside app components
function MyApp() {
  const { setTitle, setBackHandler, setToolbar, close } = useApp()
  // ...
}
```

## Common Patterns

### Form Example
```tsx
import { Button, Input, ComboBox } from '@kingsimba/nc-ui'

function MyForm() {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')

  return (
    <div className="nc-col" style={{ gap: 16 }}>
      <Input
        label="Name"
        value={name}
        onChange={setName}
        clearable
      />
      <ComboBox
        label="Country"
        value={country}
        onChange={setCountry}
        options={[
          { label: 'USA', value: 'us' },
          { label: 'Canada', value: 'ca' },
        ]}
      />
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )
}
```

### Dialog Pattern
```tsx
import { Dialog, Button } from '@kingsimba/nc-ui'

<Dialog
  open={isOpen}
  onClose={() => setOpen(false)}
  title="Confirm"
  footer={
    <>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
    </>
  }
>
  Are you sure?
</Dialog>
```

### Notification Pattern
```tsx
import { showNotification } from '@kingsimba/nc-ui'

showNotification({
  message: 'Saved successfully',
  type: 'success',
  duration: 3000,
})
```

## Common Mistakes to Avoid

1. **Using native HTML:** Never use `<button>`, `<input>`, `<select>`, etc.
2. **Wrong onChange:** Don't use `(e) => setState(e.target.value)` pattern
3. **Missing prefix:** Always use `nc-` prefix on classes and CSS variables
4. **Wrong imports:** Import icons from `@kingsimba/nc-ui/icons`, not main entry
5. **Hard-coded colors:** Use CSS variables or variant props
6. **No lazy loading:** Always use `React.lazy()` for app components

## Documentation References

For detailed information, see:
- `architecture.md` - Full architecture guide
- `components-quick-reference.md` - Complete component API
- `global-utility-styles.md` - Global utility styles (h1, p.weak, .tag, .block, etc.)
- `examples-and-antipatterns.md` - Usage examples and common mistakes
- `app-framework.md` - App framework documentation (if applicable)

**Live Demo:** https://kingsimba.github.io/nc-ui/

---

**Key Takeaway:** Always use nc-ui components instead of native HTML form elements, and remember that onChange receives values directly, not events.
