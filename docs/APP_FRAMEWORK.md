# App Framework Guide

nc-ui includes a complete app framework for building panel-based applications that run in a right-side panel. Apps can have their own i18n, state management, and integrate seamlessly with the container.

## Quick Start

### 1. Create Your App Component

```tsx
// MyApp.tsx
import { useApp } from '@kingsimba/nc-ui';

export function MyApp() {
  const { setTitle, close } = useApp();

  return (
    <div>
      <h1>Hello from MyApp!</h1>
      <button onClick={close}>Close App</button>
    </div>
  );
}
```

### 2. Register the App

```tsx
// registerApps.ts
import React from 'react';
import { appRegistry } from '@kingsimba/nc-ui';
import { MyAppIcon } from './MyAppIcon';

// Use React.lazy for code-splitting
const LazyMyApp = React.lazy(() =>
  import('./MyApp').then((m) => ({ default: m.MyApp }))
);

appRegistry.register({
  id: 'my-app',
  titleKey: 'apps.myApp.name',  // i18n key for title
  icon: MyAppIcon,
  component: LazyMyApp,
  width: 400,
});
```

### 3. Launch the App

```tsx
import { runningAppsStore } from '@kingsimba/nc-ui';

// Launch and wait for app to be ready
const app = await runningAppsStore.launchApp('my-app');

// Launch in background (not visible)
await runningAppsStore.launchApp('my-app', { launchInBackground: true });
```

---

## App Definition

Register apps using `appRegistry.register()`:

```tsx
interface AppDefinition {
  /** Unique identifier for the app */
  id: string;
  
  /** i18n key for the display title (e.g., 'apps.calculator') */
  titleKey?: string;
  
  /** Icon component displayed in the toolbar */
  icon: React.ComponentType<{ size?: number; className?: string }>;
  
  /** The main component to render */
  component: React.ComponentType;
  
  /** Panel width when active (default: 400) */
  width?: number;
  
  /** Padding inside the container (default: 12) */
  padding?: number;
  
  /** Hide title bar and close button (default: false) */
  hideTitleBar?: boolean;
}
```

### Example Registrations

```tsx
// Standard app with title bar
appRegistry.register({
  id: 'calculator',
  titleKey: 'apps.calculator',
  icon: CalculatorIcon,
  component: CalculatorApp,
  width: 360,
});

// Full-screen app without title bar
appRegistry.register({
  id: 'launcher',
  titleKey: 'apps.launcher',
  icon: LauncherIcon,
  component: LauncherApp,
  hideTitleBar: true,
  padding: 0,
  width: 420,
});
```

---

## useApp() Hook

The `useApp()` hook provides access to the app container controls from any component inside the app:

```tsx
import { useApp } from '@kingsimba/nc-ui';

function MyComponent() {
  const {
    setTitle,          // Update title bar text
    setBackHandler,    // Show back button with custom handler
    clearBackHandler,  // Hide back button
    setToolbar,        // Add toolbar content (right side of title bar)
    clearToolbar,      // Remove toolbar content
    setHideBackButton, // Temporarily hide back button
    setHideTitleBar,   // Show/hide entire title bar
    close,             // Close the app
  } = useApp();

  // ...
}
```

### Dynamic Title

```tsx
function ProfileScreen({ user }) {
  const { setTitle } = useApp();

  useEffect(() => {
    setTitle(user.name);
  }, [user.name, setTitle]);

  return <div>...</div>;
}
```

### Back Navigation

```tsx
function DetailScreen({ onBack }) {
  const { setBackHandler, clearBackHandler } = useApp();

  useEffect(() => {
    setBackHandler(onBack);
    return () => clearBackHandler();
  }, [onBack, setBackHandler, clearBackHandler]);

  return <div>...</div>;
}
```

### Toolbar Actions

```tsx
function EditorScreen() {
  const { setToolbar, clearToolbar } = useApp();

  useEffect(() => {
    setToolbar(
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleShare}>Share</button>
      </div>
    );
    return () => clearToolbar();
  }, [setToolbar, clearToolbar]);

  return <div>...</div>;
}
```

---

## Running Apps Store

Manage running app instances with `runningAppsStore`:

```tsx
import { runningAppsStore } from '@kingsimba/nc-ui';

// Launch an app (returns Promise)
const app = await runningAppsStore.launchApp('my-app');

// Launch in background
await runningAppsStore.launchApp('my-app', { launchInBackground: true });

// Close an app
runningAppsStore.closeApp('my-app');

// Check if running
const isRunning = runningAppsStore.isRunning('my-app');

// Get all running apps
const apps = runningAppsStore.getRunningApps();

// Get active app ID
const activeId = runningAppsStore.getActiveAppId();

// Subscribe to changes
const unsubscribe = runningAppsStore.subscribe(() => {
  console.log('Apps changed:', runningAppsStore.getRunningApps());
});
```

---

## App Lifecycle

1. **Registration** - App is registered with `appRegistry.register()`
2. **Launch** - `runningAppsStore.launchApp()` creates an instance
3. **Active** - App becomes visible when set as active
4. **Background** - App can run in background (state preserved)
5. **Close** - `runningAppsStore.closeApp()` or user clicks close button

### State Persistence

Apps are responsible for their own state persistence. Use localStorage or similar:

```tsx
function MyApp() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('my-app-data');
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('my-app-data', JSON.stringify(data));
  }, [data]);

  return <div>...</div>;
}
```

---

## AppPanel Component

The `AppPanel` component renders all running apps:

```tsx
import { AppPanel } from '@kingsimba/nc-ui';

function Layout() {
  return (
    <div className="layout">
      <main>Main content</main>
      <AppPanel />
    </div>
  );
}
```

Features:
- Renders all running apps (only active one visible)
- Responsive: inline on desktop, overlay on mobile
- Automatic width based on app definition
- Error boundary for app loading failures

---

## Best Practices

### Use Lazy Loading

Always use `React.lazy()` for app components to enable code-splitting:

```tsx
const LazyMyApp = React.lazy(() =>
  import('./MyApp').then((m) => ({ default: m.MyApp }))
);
```

### Clean Up Effects

Always clean up back handlers and toolbar when unmounting:

```tsx
useEffect(() => {
  setBackHandler(handleBack);
  setToolbar(<MyToolbar />);
  
  return () => {
    clearBackHandler();
    clearToolbar();
  };
}, []);
```

### Handle Mobile Layout

Use the `useViewport()` hook for responsive layouts:

```tsx
import { useViewport } from '@kingsimba/nc-ui';

function MyApp() {
  const { isMobile } = useViewport();
  
  return (
    <div style={{ padding: isMobile ? 8 : 16 }}>
      ...
    </div>
  );
}
```

---

## App-Specific i18n

Each app can have its own isolated translations using `createAppI18nFactory`. This prevents translation key conflicts between apps and allows each app to support different languages independently.

### Why Isolated i18n?

- **No namespace pollution** - Apps don't affect global translations
- **Independent development** - Each app manages its own translations
- **Different language support** - Apps can support different locales
- **No key conflicts** - Same keys in different apps won't clash

### Setup

1. Install peer dependencies:

```bash
npm install i18next react-i18next
```

2. Create your app's i18n configuration:

```tsx
// MyApp/i18n.ts
import { createAppI18nFactory } from '@kingsimba/nc-ui';

export const resources = {
  en: {
    title: 'My App',
    greeting: 'Hello {{name}}!',
    buttons: {
      save: 'Save',
      cancel: 'Cancel',
    },
  },
  zh: {
    title: '我的应用',
    greeting: '你好 {{name}}！',
    buttons: {
      save: '保存',
      cancel: '取消',
    },
  },
};

export const myAppI18n = createAppI18nFactory(resources);
```

3. Wrap your app with `I18nextProvider`:

```tsx
// MyApp/index.tsx
import { I18nextProvider } from 'react-i18next';
import { myAppI18n } from './i18n';
import { MyAppContent } from './MyAppContent';

export function MyApp() {
  return (
    <I18nextProvider i18n={myAppI18n}>
      <MyAppContent />
    </I18nextProvider>
  );
}
```

4. Use translations in components:

```tsx
// MyApp/MyAppContent.tsx
import { useTranslation } from 'react-i18next';

export function MyAppContent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('greeting', { name: 'World' })}</p>
      <button>{t('buttons.save')}</button>
      <button>{t('buttons.cancel')}</button>
    </div>
  );
}
```

### createAppI18nFactory API

```typescript
function createAppI18nFactory(resources: AppI18nResources): i18n;

type AppI18nResources = Record<string, Record<string, unknown>>;
```

**Parameters:**
- `resources` - Object with language codes as keys (e.g., `en`, `zh`, `de`) and translation objects as values

**Returns:**
- Initialized i18next instance ready for use with `I18nextProvider`

**Features:**
- Creates an isolated i18next instance (not the global singleton)
- Syncs language with `document.documentElement.lang`
- Falls back to English for unsupported languages
- Supports interpolation: `{{variableName}}`
- Supports nested keys: `buttons.save`

### Language Synchronization

The i18n instance automatically syncs with the document's `lang` attribute:

```tsx
// Change language globally
document.documentElement.lang = 'zh';

// All apps using createAppI18nFactory will update automatically
```

### Complete Example: Game 2048

```tsx
// Game2048/i18n.ts
import { createAppI18nFactory } from '@kingsimba/nc-ui';

export const resources = {
  en: {
    title: '2048',
    score: 'Score',
    best: 'Best',
    newGame: 'New Game',
    gameOver: 'Game Over!',
    youWin: 'You Win!',
    tryAgain: 'Try Again',
  },
  zh: {
    title: '2048',
    score: '分数',
    best: '最高分',
    newGame: '新游戏',
    gameOver: '游戏结束！',
    youWin: '你赢了！',
    tryAgain: '再试一次',
  },
};

export const game2048I18n = createAppI18nFactory(resources);

// Game2048/index.tsx
import { I18nextProvider } from 'react-i18next';
import { game2048I18n } from './i18n';
import { Game2048Content } from './Game2048';

export function Game2048() {
  return (
    <I18nextProvider i18n={game2048I18n}>
      <Game2048Content />
    </I18nextProvider>
  );
}

// Game2048/Game2048.tsx
import { useTranslation } from 'react-i18next';

export function Game2048Content() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <div>{t('score')}: 1234</div>
      <button>{t('newGame')}</button>
    </div>
  );
}

// Register the app
import { appRegistry } from '@kingsimba/nc-ui';

appRegistry.set('2048', {
  id: '2048',
  titleKey: '2048',
  component: Game2048,
  icon: <Game2048Icon />,
  width: 340,
});
```

---

## Complete Example

See the [Game2048](../dev/Game2048/) example in the dev folder for a complete app implementation with:

- App registration with lazy loading
- Custom app-specific i18n
- Game state persistence
- Touch and keyboard controls
- Dialog integration
