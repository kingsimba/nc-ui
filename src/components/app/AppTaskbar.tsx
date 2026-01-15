import { useState, useEffect } from 'react';
import { appStateStore } from '../../stores/appStateStore';
import { runningAppsStore, RunningApp } from '../../lib/runningAppsStore';
import { appRegistry, AppDefinition } from '../../lib/appRegistry';
import { useViewport } from '../../contexts/ViewportContext';

export interface AppTaskbarProps {
  /** Array of app IDs to pin to the taskbar (always visible) */
  pinnedAppIds: string[];
  /** Optional className for the taskbar container */
  className?: string;
}

/**
 * AppTaskbar component - A Windows 11-style taskbar for launching and switching apps.
 * Displays pinned app icons that are always visible, plus any running non-pinned apps.
 * Clicking an icon launches the app or toggles its active state if already running.
 */
export function AppTaskbar({ pinnedAppIds, className = '' }: AppTaskbarProps) {
  const { isMobile } = useViewport();
  const [activeAppId, setActiveAppId] = useState<string | null>(() => appStateStore.getActiveAppId());
  const [runningApps, setRunningApps] = useState<RunningApp[]>(() => runningAppsStore.getRunningApps());

  // Subscribe to appStateStore for active app
  useEffect(() => {
    const unsubActiveApp = appStateStore.subscribe('activeAppId', (appId) => {
      setActiveAppId(appId);
    });
    return () => {
      unsubActiveApp();
    };
  }, []);

  // Subscribe to runningAppsStore
  useEffect(() => {
    const unsub = runningAppsStore.subscribe(() => {
      setRunningApps(runningAppsStore.getRunningApps());
    });
    return unsub;
  }, []);

  const onClickApp = (appId: string) => {
    // If clicking on the active app, deactivate it
    if (activeAppId === appId) {
      runningAppsStore.setActiveApp(null);
    } else {
      runningAppsStore.launchApp(appId);
    }
  };

  // Get pinned app definitions
  const pinnedAppDefs = pinnedAppIds
    .map(id => appRegistry.get(id))
    .filter((def): def is AppDefinition => !!def);

  // Get non-pinned running app definitions (apps that are running but not pinned)
  const nonPinnedRunningAppDefs = runningApps
    .filter(ra => !pinnedAppIds.includes(ra.appId))
    .map(ra => ({ running: ra, def: appRegistry.get(ra.appId) }))
    .filter((item): item is { running: RunningApp; def: AppDefinition } => !!item.def);

  // Check if an app is running
  const isAppRunning = (appId: string) => runningApps.some(ra => ra.appId === appId);

  const iconSize = isMobile ? 24 : 28;

  return (
    <div className={`nc-app-taskbar ${isMobile ? 'nc-mobile' : 'nc-desktop'} ${className}`}>
      {/* Pinned app icons (always visible) */}
      {pinnedAppDefs.map((def) => {
        const Icon = def.icon;
        const isActive = activeAppId === def.id;
        const isRunning = isAppRunning(def.id);

        return (
          <button
            key={def.id}
            className={`nc-app-taskbar-button ${isActive ? 'nc-active' : ''} ${isRunning ? 'nc-running' : ''}`}
            onClick={() => onClickApp(def.id)}
            title={def.titleKey || def.id}
          >
            <Icon size={iconSize} />
            {isRunning && <span className="nc-app-taskbar-indicator" />}
          </button>
        );
      })}

      {/* Separator between pinned and non-pinned running apps */}
      {nonPinnedRunningAppDefs.length > 0 && (
        <div className="nc-app-taskbar-separator" />
      )}

      {/* Non-pinned running app icons */}
      {nonPinnedRunningAppDefs.map(({ running, def }) => {
        const Icon = def.icon;
        const isActive = activeAppId === running.appId;

        return (
          <button
            key={running.appId}
            className={`nc-app-taskbar-button ${isActive ? 'nc-active' : ''} nc-running`}
            onClick={() => onClickApp(running.appId)}
            title={def.titleKey || def.id}
          >
            <Icon size={iconSize} />
            <span className="nc-app-taskbar-indicator" />
          </button>
        );
      })}
    </div>
  );
}
