# GitHub Copilot Instructions for nc-ui

This is a React UI component library. Follow these conventions when contributing.

## Project Overview

- **Purpose**: Reusable UI components for React applications
- **Package Name**: `nc-ui`
- **Build Tool**: Vite (library mode)
- **Language**: TypeScript + React

## Naming Conventions

### CSS Classes & Variables

All CSS must use the `nc-` prefix to avoid conflicts with consumer applications:

```css
/* ✅ Correct */
.nc-button { }
.nc-button.nc-primary { }
--nc-primary: #3b82f6;

/* ❌ Wrong */
.button { }
.btn-primary { }
--primary: #3b82f6;
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
4. **Prefix everything** with `nc-`

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
- Create styles without `nc-` prefix
- Hardcode colors (use `--nc-*` variables)
- Forget to export new components from `index.ts`
- Use external UI libraries (this IS the UI library)
