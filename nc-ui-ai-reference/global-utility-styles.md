# nc-ui Global Utility Styles

> **Important:** nc-ui provides global utility styles WITHOUT the `nc-` prefix for common HTML elements and reusable classes.

## Overview

Unlike component-specific styles (which use `nc-` prefix), these are **global utility styles** that work with standard HTML elements and simple class names. They're automatically available after importing `@kingsimba/nc-ui/styles.css`.

---

## Typography

### Headings

All heading styles can be applied either via element or class:

```tsx
// Using HTML elements
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h4>Small Heading</h4>

// Using classes (on any element)
<div className="h1">Main Title</div>
<p className="h2">Section Title</p>
<span className="h3">Subsection Title</span>
```

**Sizes:**

- `.h1` - 2rem (32px), font-weight 700
- `.h2` - 1.5rem (24px), font-weight 600
- `.h3` - 1.25rem (20px), font-weight 600
- `.h4` - 1rem (16px), font-weight 600

**Auto-spacing:** First child headings have no top margin.

---

## Text Colors

### Paragraph Modifiers

```tsx
<p>Normal text (--nc-text)</p>
<p className="weak">Secondary text (--nc-text-weak)</p>
<p className="weaker">Tertiary text (--nc-text-weaker)</p>
```

**CSS Variables:**

- `--nc-text` - Primary text color
- `--nc-text-weak` - Secondary/muted text
- `--nc-text-weaker` - Tertiary/very muted text

---

## Code

### Inline Code

Automatically styled `<code>` elements:

```tsx
<p>
  Use <code>const value = 42</code> for inline code.
  Variables like <code>--nc-primary</code> are styled.
</p>

// Or use .code class
<span className="code">variableName</span>
```

**Style:** Monospace font, background, rounded border

### Code Blocks

For multi-line code:

```tsx
<div className="code-block">
  {`function hello() {
  console.log('Hello, world!')
}`}
</div>

<pre className="code-block">
  <code>{codeString}</code>
</pre>
```

**Features:**

- Monospace font (SF Mono, Menlo, Monaco, Consolas)
- Horizontal scrolling for long lines
- Pre-formatted whitespace
- Themed background and border

---

## Tags (Badges)

Colored tags for status indicators and labels:

```tsx
<span className="tag">Default</span>
<span className="tag red">Error</span>
<span className="tag yellow">Warning</span>
<span className="tag green">Success</span>
<span className="tag blue">Info</span>
```

**Variants:**

- `.tag` - Default (gray)
- `.tag.red` - Error/danger states
- `.tag.yellow` - Warning states
- `.tag.green` - Success states
- `.tag.blue` - Info states

**Use Cases:**

- Status badges ("Active", "Pending", "Error")
- Category labels
- Notification counts
- Feature flags

---

## Blocks (Callouts)

Styled containers for semantic notices, tips, warnings, and danger states.

### Basic Block

```tsx
<div className="block">A solid block container with background and border.</div>
```

### Note Block

For informational content:

```tsx
<div className="block note">
  This is a block with blue info styling.
</div>

<div className="block note icon">
  This block includes an info icon.
</div>
```

### Warning Block

For important notices:

```tsx
<div className="block warning">
  Important: Please review your settings.
</div>

<div className="block warning icon">
  This warning includes an icon.
</div>
```

### Danger Block

For critical warnings:

```tsx
<div className="block danger">
  Error: This action cannot be undone.
</div>

<div className="block danger icon">
  Critical error with icon.
</div>
```

### Dashed Block

For drop zones or placeholders:

```tsx
<div className="block dashed">
  Drop files here
</div>

<div className="block danger dashed">
  Danger zone with dashed border
</div>
```

**Block Variants:**

- `.block` - Basic container
- `.block.note` - Blue info styling
- `.block.warning` - Yellow warning styling
- `.block.danger` - Red danger styling
- `.block.icon` - Adds icon (combine with note/warning/danger)
- `.block.dashed` - Dashed border style

**Icons:**

- `.note.icon` → ℹ️
- `.warning.icon` → ⚠️
- `.danger.icon` → 🚨

---

## Cards (Surfaces)

Neutral containers for layouts, panels, and stacked surfaces.

### Basic Card

```tsx
<div className="card">A neutral card surface for related content.</div>
```

### Card Over Card

Nested cards create depth for dashboards, settings panels, and summary/detail layouts:

```tsx
<div className="card">
  <h3 className="h3">Project summary</h3>
  <p className="weak">Outer card provides the section surface.</p>

  <div className="card" style={{ marginTop: 12 }}>
    <strong>Revenue sync</strong>
    <p className="weak">Inner card isolates one important detail.</p>
  </div>
</div>
```

**Card Variants:**

- `.card` - Neutral surface for composition and hierarchy
- Nested `.card` - Elevated inner surface for card-over-card layouts

**Use Cases:**

- Dashboard tiles
- Settings panels
- Summary/detail stacks
- Card-over-card compositions

---

## Lists

### Standard Lists

```tsx
// Unordered list
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>

// Ordered list
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

**Auto-styling:**

- Muted list markers (bullets/numbers)
- Consistent spacing
- Uses `--nc-text` for content
- Uses `--nc-text-weak` for markers

### No Bullets

```tsx
<ul className="no-dots">
  <li>Clean item</li>
  <li>No bullet points</li>
  <li>Minimal style</li>
</ul>
```

---

## Complete Examples

### Documentation Section

```tsx
import { Button } from "@kingsimba/nc-ui";

function DocsSection() {
  return (
    <div>
      <h1>Getting Started</h1>
      <p className="weak">Learn how to use nc-ui in your project</p>

      <h2>Installation</h2>
      <div className="code-block">npm install @kingsimba/nc-ui</div>

      <h3>Import Components</h3>
      <p>Import the components you need:</p>
      <div className="code-block">
        {`import { Button, Input, Dialog } from '@kingsimba/nc-ui'
import '@kingsimba/nc-ui/styles.css'`}
      </div>

      <div className="block note icon">ℹ️ Make sure to import the styles.css file!</div>
    </div>
  );
}
```

### Feature Showcase

```tsx
function FeatureCard() {
  return (
    <div>
      <h3>New Features</h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <span className="tag green">New</span>
        <span className="tag blue">Beta</span>
      </div>

      <ul>
        <li>Dark mode support</li>
        <li>Keyboard navigation</li>
        <li>Accessibility improvements</li>
      </ul>

      <div className="block warning icon">
        ⚠️ Some features are still in beta. Use with caution in production.
      </div>
    </div>
  );
}
```

### Error Message

```tsx
function ErrorDisplay({ error }) {
  return (
    <div className="block danger icon">
      🚨 <strong>Error:</strong> {error.message}
      <p className="weak" style={{ marginTop: 8 }}>
        Error code: <code>{error.code}</code>
      </p>
    </div>
  );
}
```

### Code Example Display

```tsx
function CodeExample() {
  return (
    <div>
      <h4>Basic Usage</h4>
      <p className="weak">Here's how to create a simple button:</p>

      <div className="code-block">
        {`import { Button } from '@kingsimba/nc-ui'

<Button variant="primary" onClick={handleClick}>
  Click me
</Button>`}
      </div>

      <div className="block note">
        The <code>variant</code> prop controls the button's appearance. Available variants: primary,
        danger, warning, success, ghost.
      </div>
    </div>
  );
}
```

### Status Dashboard

```tsx
function StatusDashboard() {
  return (
    <div>
      <h2>System Status</h2>

      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <div>
          <span className="tag green">API</span>
          <p className="weak">Operational</p>
        </div>
        <div>
          <span className="tag yellow">Database</span>
          <p className="weak">Degraded</p>
        </div>
        <div>
          <span className="tag red">Cache</span>
          <p className="weak">Down</p>
        </div>
      </div>

      <div className="block warning icon">
        ⚠️ Some services are experiencing issues. We're working on it.
      </div>
    </div>
  );
}
```

---

## CSS Variables Reference

These global styles use nc-ui's theme variables:

### Colors

```css
--nc-text           /* Primary text */
--nc-text-weak      /* Secondary/muted text */
--nc-text-weaker    /* Tertiary text */
--nc-primary        /* Blue accent */
--nc-danger         /* Red */
--nc-warning        /* Yellow/orange */
--nc-success        /* Green */
```

### Backgrounds

```css
--nc-bg             /* Main background */
--nc-bg-secondary   /* Slightly elevated */
--nc-bg-tertiary    /* More elevated (code blocks) */
--nc-bg-quaternary  /* Most elevated (blocks) */
--nc-border         /* Border color */
```

---

## Styling Summary

### Component Styles (with `nc-` prefix)

```tsx
<Button className="nc-button nc-primary" />
<Input className="nc-input nc-small" />
<div className="nc-combo-dropdown" />
```

### Global Utility Styles (without prefix)

```tsx
<h1>Heading</h1>
<p className="weak">Text</p>
<code>inline code</code>
<div className="code-block">...</div>
<span className="tag red">Error</span>
<div className="block warning icon">Warning</div>
<ul className="no-dots">...</ul>
```

**Rule of Thumb:**

- **Components** → Use `nc-` prefix (Button, Input, ComboBox, etc.)
- **HTML elements & utilities** → No prefix (h1, p.weak, code, .tag, .block, .card)

---

## Best Practices

### ✅ DO:

- Use headings (`<h1>` - `<h4>`) for semantic structure
- Use `<p className="weak">` for secondary text
- Use `<code>` for inline code, `.code-block` for blocks
- Use `.block.note.icon` for helpful tips
- Use `.block.warning.icon` for important notices
- Use `.block.danger.icon` for critical errors
- Use `.tag` for status badges and labels
- Use `<ul className="no-dots">` when you don't need bullets

### ❌ DON'T:

- Don't add `nc-` prefix to these utility classes
- Don't style paragraphs with inline colors (use `.weak`/`.weaker`)
- Don't create custom code blocks (use `.code-block`)
- Don't create custom tags (use `.tag` with color variants)
- Don't create custom alert boxes (use `.block` variants)

---

## Light Theme Support

All global styles support light theme automatically when `:root.light` is applied. Tag colors adjust for better contrast in light mode.

```tsx
// Toggle light theme
document.documentElement.classList.add("light");

// All styles adapt automatically:
// - Tags get darker colors
// - Blocks adjust backgrounds
// - Text colors update
// - Code blocks adjust contrast
```

---

## Accessibility

- Semantic HTML elements (`<h1>`, `<p>`, `<ul>`, `<code>`) for screen readers
- Sufficient color contrast for all text
- Clear visual hierarchy with headings
- Icons in blocks are decorative (text remains clear)

---

**Summary:** nc-ui provides both component-specific styles (with `nc-` prefix) and global utility styles (without prefix) for common HTML elements and patterns. Use them together for consistent, themed UIs.
