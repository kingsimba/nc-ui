# Component Migration Guide

## CSS Class Prefix

All classes must use `nc-` prefix:

```css
/* ✅ */ .nc-button, .nc-checkbox-label, .nc-combo-dropdown
/* ❌ */ .button, .checkbox-label, .combo-dropdown
```

## CSS Variables

Replace unprefixed variables with `nc-` prefixed ones:

| Original | Replace with |
|----------|--------------|
| `--text` | `--nc-text` |
| `--text-weak` | `--nc-text-weak` |
| `--primary` | `--nc-primary` |
| `--danger` | `--nc-danger` |
| `--button-bg` | `--nc-button-bg` |
| `--button-border` | `--nc-button-border` |
| `--button-hover` | `--nc-button-hover` |

## Size Modifiers

Use `nc-small`, `nc-default`, `nc-large` instead of `small`, `default`, `large`:

```tsx
className={`nc-checkbox-box ${isSmall ? 'nc-small' : ''}`}
```

## File Locations

- Components: `src/components/ComponentName.tsx`
- Icons: `src/components/icons/`
- Styles: `src/styles/theme.css` (all styles go here, no separate CSS files per component)

## Component Checklist

1. Update all `className` to use `nc-` prefix
2. Update all CSS variable references to use `nc-` prefix
3. Remove external dependencies (e.g., `react-i18next`) - use props instead
4. Export props interface with JSDoc comments
5. Add styles to `src/styles/theme.css`
6. Export from `src/index.ts`
7. Add demo to `dev/App.tsx`

## Export Pattern

```ts
// src/index.ts
export { ComponentName } from './components/ComponentName'
export type { ComponentNameProps } from './components/ComponentName'
```

## Props Pattern

Convert internal dependencies to props:

```tsx
// ❌ Before: uses react-i18next
const { t } = useTranslation();
const text = t('common.default');

// ✅ After: use prop with default
interface Props {
  defaultText?: string;
}
function Component({ defaultText = 'default' }: Props) { ... }
```
