import React from 'react';

import { appRegistry } from '../src/lib/appRegistry';
import { Game2048Icon } from './Game2048/Game2048Icon';
import { StartIcon } from './AppIcons';
import { StartApp } from './StartApp';

const LazyGame2048 = React.lazy(() =>
  import('./Game2048/Game2048').then((m) => ({
    default: m.Game2048,
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

}
