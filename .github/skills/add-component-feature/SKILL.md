````skill
---
name: add-component-feature
description: Add a new prop or feature to an existing nc-ui component. Use this skill when the user wants to extend a component with new behavior, a new prop, a callback, or a visual option.
argument-hint: '[component name] [feature description]'
---

# Adding a Feature to an Existing Component

When extending an nc-ui component, changes must be made consistently across four places: the component source, the CSS theme, the dev demo section, and the AI reference docs.

## Checklist

1. **Component source** — add prop to interface + implement in render
2. **CSS** — add styles to `src/styles/theme.css`
3. **Demo** — update the corresponding section in `dev/UIComponentsDemo/sections/`
4. **Docs** — update `nc-ui-ai-reference/components-quick-reference.md`

---

## Step 1: Add the Prop

Open `src/components/<ComponentName>.tsx`.

### Add to the props interface

```tsx
export interface TabsProps {
  // ...existing props...

  /** Brief JSDoc description of what the new prop does. */
  newProp?: string;
}
```

Guidelines:
- Mark optional props with `?`
- Always add a JSDoc comment explaining purpose and behavior
- Export the updated interface (it is re-exported from `src/index.ts`)

### Destructure and use in the component

```tsx
export function Tabs({ ..., newProp }: TabsProps) {
  // implement behavior
}
```

---

## Step 2: Add CSS Styles

Open `src/styles/theme.css` and add styles near the existing styles for that component (search for its `nc-` prefix class).

Rules:
- All component class names use the `nc-` prefix: `.nc-tab-close`, `.nc-button-icon`, etc.
- Use CSS variables for all colors: `var(--nc-text)`, `var(--nc-primary)`, `var(--nc-border)`, etc.
- Never hardcode color values

```css
.nc-tab-close {
  opacity: 0.5;
  transition: opacity 120ms, background 120ms;
}

.nc-tab-close:hover {
  opacity: 1;
  background: var(--nc-bg-tertiary);
}
```

---

## Step 3: Update the Demo

Open the corresponding section file in `dev/UIComponentsDemo/sections/`, e.g. `TabsSection.tsx`.

- Add any new state variables needed (`useState`)
- Add a new `<section className="dev-section">` block to showcase the feature
- Include a description (`<p>`) explaining the prop and how to use it
- Show realistic usage: not just a toggle, but something that demonstrates real value

Example structure:
```tsx
<section className="dev-section">
  <h2>Closable Tabs</h2>
  <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
    Provide <code>onClose</code> to show a close button on each tab.
    Use <code>permanentTabs</code> to exclude specific tabs from being closable.
  </p>
  {/* demo JSX */}
</section>
```

---

## Step 4: Update the Quick Reference Doc

Open `nc-ui-ai-reference/components-quick-reference.md` and find the section for the component.

- Add the new prop to the code example with a comment explaining it
- Add it to the **Props** line at the bottom of the section

Before:
```markdown
**Props:** `tabs`, `active`, `onChange`, `orientation`, `toolbar`
```

After:
```markdown
**Props:** `tabs`, `active`, `onChange`, `onClose`, `permanentTabs`, `orientation`, `toolbar`
```

---

## Example: The `onClose` + `permanentTabs` Feature on `Tabs`

This feature was added following the checklist above:

**Component (`Tabs.tsx`):**
- Added `onClose?: (tab: string) => void` — triggers when a tab's × is clicked
- Added `permanentTabs?: string[]` — tabs in this list never show a close button
- In render: `const isClosable = onClose && !permanentTabs?.includes(t)`
- Rendered a `<span className="nc-tab-close">` SVG × icon inside closable tabs

**CSS (`theme.css`):**
- `.nc-tab-item.nc-closable` — flex layout with reduced right padding
- `.nc-tab-close` — always visible at 0.5 opacity, brightens on hover

**Demo (`TabsSection.tsx`):**
- New state: `closableTabs`, `closableActive`
- New section showing close behavior with "File 1" marked as permanent

**Docs (`components-quick-reference.md`):**
- Added `onClose` and `permanentTabs` to the Tabs example and props list

---

## Tips

- Always validate with `get_errors` after editing TypeScript files
- When reducing padding on a closable variant, use a specific override like `padding-right: 8px` rather than changing the base `.nc-tab-item`
- Use `position: relative; top: Npx` for fine pixel-level vertical adjustments to inline icons
- `e.stopPropagation()` is essential on close button click handlers to prevent triggering the parent tab's `onClick`
````
