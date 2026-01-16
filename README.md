# nc-ui

A high-performance, lightweight React UI component library and extensible application framework.

- 🚀 **Small Footprint**: Only ~75KB bundle size.
- 🏗️ **Application Framework**: Features a flexible, extensible framework for building windowed apps.
- 📱 **Cross-Platform**: Optimized for both desktop and mobile experiences.

Published on npm as [@kingsimba/nc-ui](https://www.npmjs.com/package/@kingsimba/nc-ui)

**[View Demo](https://kingsimba.github.io/nc-ui/)**

<div style="display: flex; gap: 1rem;">
  <img src="image-2.png" alt="alt text" height="400px" />
  <img src="./image.png" alt="Demo" height="300px" />
</div>

## Installation

```bash
npm install @kingsimba/nc-ui
# or
yarn add @kingsimba/nc-ui
# or
pnpm add @kingsimba/nc-ui
```

## Quick Start

```tsx
import { Button, ActivityIndicator } from '@kingsimba/nc-ui'
import '@kingsimba/nc-ui/styles.css'

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Button variant="danger" size="small">Delete</Button>
      <Button loading>Saving...</Button>
      <ActivityIndicator size="large" />
    </div>
  )
}
```

### Using Icons

Icons are imported from a separate entry point to keep the main bundle size small:

```tsx
import { CloseIcon, EditIcon, TrashIcon } from '@kingsimba/nc-ui/icons'

function MyComponent() {
  return (
    <div>
      <CloseIcon size={24} />
      <EditIcon size={20} color="#3b82f6" />
      <TrashIcon size={18} />
    </div>
  )
}
```

> **See the [live demo](https://kingsimba.github.io/nc-ui/) for interactive examples and complete API documentation for all components.**

## Components

nc-ui provides 23+ ready-to-use components. Click any component to see it in the interactive demo:

| Component | Description |
|-----------|-------------|
| [ActivityIndicator](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=activity) | Loading spinner with size variants and overlay mode |
| [Alert](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=alert) | Dismissible notification banners with status variants |
| [AppDialog](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=app-dialog) | Render any registered app inside a dialog overlay |
| [Battery](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=battery) | Visual battery level indicator |
| [Button](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=buttons) | Primary action button with variants, sizes, and loading states |
| [ButtonGroup](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=button-group) | Group related buttons with automatic styling |
| [Checkbox](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=checkbox) | Toggle selection with indeterminate state support |
| [CommonButtons](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=buttons-icon) | Pre-configured buttons (Close, Edit, Refresh, Trash) |
| [ComboBox](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=combobox) | Searchable dropdown with autocomplete |
| [ContextMenu](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=context-menu) | Right-click menu with customizable items |
| [Dialog](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=dialog) | Modal dialogs with header, footer, and action buttons |
| [Hyperlink](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=hyperlink) | Styled anchor/link component |
| [Icons](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=icons) | 50+ SVG icons (separate import path) |
| [Input](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=input) | Text input with validation states and prefix/suffix support |
| [ListGroup](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=list-group) | Styled list items with selection and actions |
| [MultiSelect](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=multi-select) | Multi-selection dropdown with tag display |
| [NavStack](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=nav-stack) | Stack-based navigation for mobile-style settings UIs |
| [Notification](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=notification) | Toast-style notifications with auto-dismiss and stacking |
| [NumberInput](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=number-input) | Numeric input with increment/decrement controls |
| [Slider](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=slider) | Range slider with value display |
| [Tabs](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=tabs) | Tabbed navigation component |
| [Toggle](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=toggle) | Switch/toggle with on/off states |
| [YamlTextArea](https://kingsimba.github.io/nc-ui/?app=ui-components&tab=yaml-textarea) | YAML editor with syntax highlighting and validation |

## App Framework

nc-ui includes a complete framework for building panel-based applications that run in a right-side panel. Apps can have their own state management, isolated i18n translations, and integrate seamlessly with the container.

### Key Features

- **Panel Management**: Apps run in a responsive panel (inline on desktop, overlay on mobile)
- **Lifecycle Control**: Launch, background, and close apps programmatically
- **Isolated i18n**: Each app can have its own translations using `createAppI18nFactory`
- **Title Bar API**: Control navigation, title, toolbar via `useApp()` hook
- **Code Splitting**: Lazy-load apps for optimal performance

### Quick Example

```tsx
import React from 'react'
import { appRegistry, runningAppsStore, useApp } from '@kingsimba/nc-ui'
import { MyAppIcon } from './MyAppIcon'

// 1. Create your app component
function MyApp() {
  const { setTitle, close } = useApp()
  
  return (
    <div>
      <h1>My App</h1>
      <button onClick={close}>Close</button>
    </div>
  )
}

// 2. Register the app (with lazy loading)
const LazyMyApp = React.lazy(() => 
  import('./MyApp').then(m => ({ default: m.MyApp }))
)

appRegistry.register({
  id: 'my-app',
  titleKey: 'apps.myApp.name',
  icon: MyAppIcon,
  component: LazyMyApp,
  width: 400,
})

// 3. Launch the app
await runningAppsStore.launchApp('my-app')
```

### App-Specific i18n

Each app can have isolated translations that won't conflict with other apps:

```tsx
import { createAppI18nFactory } from '@kingsimba/nc-ui'
import { I18nextProvider } from 'react-i18next'

const myAppI18n = createAppI18nFactory({
  en: { title: 'My App', save: 'Save' },
  zh: { title: '我的应用', save: '保存' },
})

export function MyApp() {
  return (
    <I18nextProvider i18n={myAppI18n}>
      <MyAppContent />
    </I18nextProvider>
  )
}
```

**[Read the complete App Framework guide →](docs/APP_FRAMEWORK.md)**

## Theming

The library uses CSS variables with `nc-` prefix. Override them in your app:

```css
:root {
  --nc-primary: #your-brand-color;
  --nc-danger: #your-danger-color;
  /* ... see theme.css for all variables */
}

/* Light theme - add .light class to :root */
:root.light {
  --nc-primary: #your-light-primary;
}
```

## Internationalization (i18n)

nc-ui components use `react-i18next` for translations. Components like `Dialog` and `ComboBox` use translation keys prefixed with `common.` (e.g., `common.ok`, `common.cancel`, `common.save`).

To provide translations, set up `react-i18next` in your app and include the common keys:

```tsx
// Your app's i18n setup
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        'common.ok': 'OK',
        'common.cancel': 'Cancel',
        'common.save': 'Save',
        'common.delete': 'Delete',
        'common.close': 'Close',
        'common.connect': 'Connect',
        'common.gotit': 'Got it',
        'common.default': 'default',
        'common.noResults': 'No results',
        // ... your other translations
      },
    },
    // Add other languages as needed
  },
  lng: 'en',
  fallbackLng: 'en',
});
```

If translations are not provided, the raw keys (e.g., `common.ok`) will be displayed.

## Documentation

- **[Live Demo](https://kingsimba.github.io/nc-ui/)** - Interactive component playground with all props and variants
- **[App Framework Guide](docs/APP_FRAMEWORK.md)** - Complete guide to building panel-based applications
- **[Migration Guide](MIGRATION_GUIDE.md)** - Upgrading from previous versions

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build

# Run linting
npm run lint
```

## Adding Components

1. Create your component in `src/components/`
2. Add styles to `src/styles/theme.css` with `nc-` prefix
3. Export it from `src/index.ts`

## Project Structure

```
src/
├── components/          # UI components
│   ├── Button.tsx
│   └── ActivityIndicator.tsx
├── styles/
│   └── theme.css        # All component styles with nc- prefix
├── lib/
│   └── utils.ts         # Utility functions (cn helper)
└── index.ts             # Main entry - exports all components
```

## CSS Naming Convention

All CSS classes and variables use `nc-` prefix to avoid conflicts:

- Variables: `--nc-primary`, `--nc-button-bg`, etc.
- Classes: `.nc-button`, `.nc-activity-indicator`, etc.
- Modifiers: `.nc-primary`, `.nc-small`, `.nc-loading`, etc.

