# GitHub Copilot Instructions for nc-ui

This is a React UI component library. Follow these conventions when contributing.

## Project Overview

- **Purpose**: Reusable UI components for React applications
- **Package Name**: `nc-ui`
- **Build Tool**: Vite (library mode)
- **Language**: TypeScript + React

## Naming Conventions

### CSS Classes & Variables

**UI Component styles** use the `nc-` prefix to avoid conflicts:

```css
/* ✅ Component styles - use nc- prefix */
.nc-button { }
.nc-button.nc-primary { }
.nc-dialog { }
```

**Reusable public styles** (typography, tags, utilities) don't need the prefix:

```css
/* ✅ Public utility styles - no prefix needed */
.h1, .h2, .h3, .h4 { }
.code { }
.code-block { }
.tag { }
.tag.red { }
```

**CSS variables** always use the `nc-` prefix:

```css
/* ✅ Variables - always use nc- prefix */
--nc-primary: #3b82f6;
--nc-text: #e8eef6;
```

### Component Files

- Use PascalCase for component files: `Button.tsx`, `ActivityIndicator.tsx`
- Export components from `src/index.ts`
- Place all components in `src/components/`

## Component Structure

When creating a new component:

```tsx
// src/components/MyComponent.tsx
export interface MyComponentProps {
  /** Document each prop with JSDoc */
  size?: 'small' | 'default' | 'large';
  className?: string;
}

export function MyComponent({
  size = 'default',
  className = '',
}: MyComponentProps) {
  return (
    <div className={`nc-my-component nc-${size} ${className}`}>
      {/* content */}
    </div>
  );
}
```

## Styling Guidelines

1. **All styles go in `src/styles/theme.css`**
2. **Use CSS variables** for colors, not hardcoded values
3. **Support dark/light themes** via `:root` and `:root.light`
4. **Component styles** use `nc-` prefix (e.g., `.nc-button`, `.nc-dialog`)
5. **Public utility styles** don't need prefix (e.g., `.h1`, `.code`, `.tag`)

### CSS Variable Categories

```css
:root {
  /* Core colors */
  --nc-primary: ...;
  --nc-danger: ...;
  --nc-warning: ...;
  --nc-success: ...;
  --nc-text: ...;
  --nc-text-weak: ...;
  
  /* Component-specific */
  --nc-button-bg: ...;
  --nc-button-border: ...;
}
```

## Adding a New Component

1. Create `src/components/NewComponent.tsx`
2. Add styles to `src/styles/theme.css` with `nc-` prefix
3. Export from `src/index.ts`:
   ```ts
   export { NewComponent } from './components/NewComponent'
   ```
4. Update README.md with usage examples

## TypeScript Guidelines

- Export prop types: `export interface ButtonProps { ... }`
- Use React's built-in types: `React.ButtonHTMLAttributes<HTMLButtonElement>`
- Document props with JSDoc comments
- Provide sensible defaults for optional props

## Testing Components Locally

```bash
npm run dev      # Start dev server
npm run build    # Build the library
```

## Do NOT

- Use inline styles for theming (use CSS variables)
- Forget `nc-` prefix for component styles
- Hardcode colors (use `--nc-*` variables)
- Forget to export new components from `index.ts`
- Use external UI libraries (this IS the UI library)
