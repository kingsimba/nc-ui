import React from 'react';

import { appRegistry } from '../src/lib/appRegistry';
import { Game2048Icon } from './Game2048/Game2048Icon';
import { StartIcon, CalculatorIcon } from './AppIcons';
import { UIComponentsIcon } from './UIComponentsDemo/UIComponentsIcon';
import { StartApp } from './StartApp';

const LazyGame2048 = React.lazy(() =>
  import('./Game2048/Game2048').then((m) => ({
    default: m.Game2048,
  }))
);

const LazyCalculator = React.lazy(() =>
  import('./Calculator/Calculator').then((m) => ({
    default: m.Calculator,
  }))
);

const LazyUIComponents = React.lazy(() =>
  import('./UIComponentsDemo/UIComponentsDemo').then((m) => ({
    default: m.UIComponentsDemo,
  }))
);

/**
 * Register all built-in applications.
 * Call this once at app startup.
 */
export function registerBuiltinApps(): void {
  // ========== Start App (App Launcher) ==========
  appRegistry.register({
    id: 'start',
    titleKey: 'apps.start',
    icon: StartIcon,
    component: StartApp,
    hideTitleBar: true,
    padding: 0,
    width: 420,
  });

  // ========== 2048 Game ==========
  appRegistry.register({
    id: '2048',
    titleKey: 'apps.2048.name',
    icon: Game2048Icon,
    component: LazyGame2048,
    width: 420,
  });

  // ========== Calculator ==========
  appRegistry.register({
    id: 'calculator',
    titleKey: 'apps.calculator',
    icon: CalculatorIcon,
    component: LazyCalculator,
    width: 420,
  });

  // ========== UI Components ==========
  appRegistry.register({
    id: 'ui-components',
    titleKey: 'UI Components',
    icon: UIComponentsIcon,
    component: LazyUIComponents,
    width: 600,  // Wider for sidebar + content
  });

}
