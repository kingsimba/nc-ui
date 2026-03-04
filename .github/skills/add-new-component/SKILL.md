---
name: add-new-component
description: Add a brand-new UI component to the nc-ui library. Use this skill when the user wants to create a new reusable component from scratch and integrate it into the project.
argument-hint: '[component name]'
---

# Adding a New Component to nc-ui

When adding a new component, changes must be made across five places: the component source, CSS styles, the main export, the dev demo, and the AI reference docs.

## Checklist

1. **Component source** — create `src/components/<ComponentName>.tsx`
2. **CSS** — add styles (either in `src/styles/theme.css` or a standalone CSS file)
3. **Export** — add to `src/index.ts` (or as a separate entry point for heavy components)
4. **Demo** — create a section in `dev/UIComponentsDemo/sections/` and register it
5. **Docs** — update `nc-ui-ai-reference/components-quick-reference.md`
6. **README** — add a row to the components table in `README.md`

---

## Step 1: Create the Component

Create `src/components/<ComponentName>.tsx`.

```tsx
import React from 'react';

export interface MyComponentProps {
  /** Document each prop with JSDoc */
  value: string;
  /** Called when the value changes */
  onChange: (value: string) => void;
  /** Additional CSS class name(s) */
  className?: string;
  /** Inline styles applied to the container */
  style?: React.CSSProperties;
}

export function MyComponent({
  value,
  onChange,
  className = '',
  style,
}: MyComponentProps) {
  return (
    <div className={`nc-my-component ${className}`} style={style}>
      {/* content */}
    </div>
  );
}
```

Guidelines:

- Export both the component function and its props interface
- Document all props with JSDoc comments
- Mark optional props with `?` and provide sensible defaults
- Always accept `className` and optionally `style` for customization
- Use the `nc-` prefix for all CSS class names

---

## Step 2: Add CSS Styles

There are two patterns—choose based on component complexity.

### Pattern A: Styles in `theme.css` (standard components)

For most components, add styles to `src/styles/theme.css` near the end or grouped with similar components.

```css
.nc-my-component {
  border: 1px solid var(--nc-border);
  background: var(--nc-input-bg);
  color: var(--nc-text);
}
```

### Pattern B: Standalone CSS file (specialized components)

For components with heavy styling (e.g. `CsvTextArea`), keep a standalone `src/components/<ComponentName>.css` and import it from the component:

```tsx
import './MyComponent.css';
```

Rules for standalone CSS:

- CSS class names still use the `nc-` prefix: `.nc-csv-textarea-container`
- CSS custom properties use the `--nc-` prefix: `--nc-csv-col-0`
- Dark theme is the default (`:root`), light theme uses `:root.light`
- Reference existing theme variables (`var(--nc-border)`, `var(--nc-text)`, etc.) — never hardcode colors

---

## Step 3: Export from the Library

There are two patterns—choose based on bundle size impact.

### Pattern A: Export from `src/index.ts` (standard — most components)

Add the component and its types to `src/index.ts`:

```ts
export { MyComponent } from './components/MyComponent';
// ...in the types section:
export type { MyComponentProps } from './components/MyComponent';
```

### Pattern B: Separate entry point (heavy components with external deps)

For components with large dependencies (e.g. `YamlTextArea` depends on `js-yaml` + `prism-react-renderer`), create a separate entry point so consumers can lazy-load it:

1. Add entry in `vite.config.ts`:

   ```ts
   entry: {
     // ...existing entries...
     myComponent: resolve(__dirname, 'src/components/MyComponent.tsx'),
   },
   ```

2. Add export map in `package.json`:

   ```json
   "./my-component": {
     "import": "./dist/myComponent.js",
     "require": "./dist/myComponent.cjs",
     "types": "./dist/myComponent.d.ts"
   }
   ```

3. Do NOT add to `src/index.ts` — consumers import from `'@kingsimba/nc-ui/my-component'`

---

## Step 4: Create the Demo

### 4a. Create the demo section file

Create `dev/UIComponentsDemo/sections/<ComponentName>Section.tsx`:

```tsx
import { useState } from 'react';
import { MyComponent } from '../../../src/components/MyComponent';

export function MyComponentSection() {
  const [value, setValue] = useState('example');

  return (
    <section className='dev-section'>
      <h2>MyComponent</h2>
      <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
        Brief description of what the component does and when to use it.
      </p>

      <MyComponent value={value} onChange={setValue} />
    </section>
  );
}
```

Guidelines:

- Import the component from **source** (`../../../src/...`), not the built package
- For components with heavy deps (separate entry point), use `lazy()` + `<Suspense>`:
  ```tsx
  const MyComponent = lazy(() => import('../../../src/components/MyComponent'));
  ```
- Show realistic usage with meaningful sample data
- Add multiple sections if the component has several distinct features

### 4b. Register in UIComponentsDemo

Open `dev/UIComponentsDemo/UIComponentsDemo.tsx` and make three changes:

1. **Import** the section component:

   ```tsx
   import { MyComponentSection } from './sections/MyComponentSection';
   ```

2. **Add to `SectionId` type**:

   ```tsx
   type SectionId = '...' | 'my-component';
   ```

3. **Add to `sections` array**:
   ```tsx
   { id: 'my-component', label: 'MyComponent', component: MyComponentSection },
   ```

---

## Step 5: Update the Quick Reference Doc

Open `nc-ui-ai-reference/components-quick-reference.md` and add a section for the new component:

```markdown
### MyComponent

Brief description:

\`\`\`tsx
import { MyComponent } from '@kingsimba/nc-ui'

<MyComponent
  value={myValue}
  onChange={setMyValue}
  className="custom"
/>
\`\`\`

**Props:** `value`, `onChange`, `className`, `style`
```

Place it near similar components in the document.

---

## Step 6: Update README.md

Open `README.md` and add a row to the components table (keep alphabetical order):

```markdown
| [MyComponent](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=my-component) | Brief description of the component |
```

The `tab=` value must match the `SectionId` used in `UIComponentsDemo.tsx`.

---

## Example: Adding CsvTextArea

This component was added following the checklist above with Pattern B for CSS (standalone) and Pattern A for export (in `index.ts`, since it has no external deps):

**Component (`CsvTextArea.tsx`):**

- `CsvTextAreaProps` interface with `value`, `onChange`, `placeholder`, `className`, `style`
- Transparent `<textarea>` layered over a colored `<pre>` backdrop
- 10 column colors via CSS custom properties

**CSS (`CsvTextArea.css` — standalone):**

- Dark-theme column colors in `:root`, light-theme in `:root.light`
- All classes use `nc-csv-` prefix (e.g. `.nc-csv-textarea-container`)
- All variables use `--nc-csv-` prefix (e.g. `--nc-csv-col-0`)
- References theme variables like `var(--nc-border)`, `var(--nc-text)`

**Export (`index.ts`):**

- `export { CsvTextArea }` and `export type { CsvTextAreaProps }`
- No separate entry point needed (small component, no external deps)

**Demo (`CsvTextAreaSection.tsx`):**

- Sample tab-separated data with multiple columns
- Demonstrates `style` prop with custom `tabSize`

**Docs (`components-quick-reference.md`):**

- Added CsvTextArea section with usage example and props list

**README (`README.md`):**

- Added row to the components table in alphabetical order

---

## Tips

- Always validate with `get_errors` after editing TypeScript files
- Run `npm run build` to verify the full build succeeds
- Dark is the default theme (`:root`); light theme overrides go in `:root.light`
- Never hardcode colors — always use `var(--nc-*)` variables
- Keep component CSS scoped with the `nc-` prefix to avoid conflicts
