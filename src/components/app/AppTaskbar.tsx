import { useState, useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { appStateStore } from '../../stores/appStateStore';
import { runningAppsStore, RunningApp } from '../../lib/runningAppsStore';
import { appRegistry, AppDefinition } from '../../lib/appRegistry';
import { useViewport } from '../../contexts/ViewportContext';

export type AppTaskbarSide = 'left' | 'right';
export type AppTaskbarBadgeTone = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export interface AppTaskbarBadge {
  /** Content displayed inside the badge, such as a count or short label */
  content: ReactNode;
  /** Visual tone of the badge */
  tone?: AppTaskbarBadgeTone;
  /** Accessible label for assistive technology */
  ariaLabel?: string;
}

export interface AppTaskbarItemState {
  /** Whether the app is currently the active app */
  isActive: boolean;
  /** Whether the app is currently running */
  isRunning: boolean;
  /** Whether the app is from pinnedAppIds */
  isPinned: boolean;
}

export interface AppTaskbarProps {
  /** Array of app IDs to pin to the taskbar (always visible) */
  pinnedAppIds: string[];
  /** Optional className for the taskbar container */
  className?: string;
  /** Whether to show the running and active indicator beneath app icons */
  showIndicators?: boolean;
  /** Desktop placement side. Mobile always renders the taskbar at the bottom. */
  side?: AppTaskbarSide;
  /** Optional badge resolver for app icons, useful for alerts or counts. */
  getBadge?: (app: AppDefinition, state: AppTaskbarItemState) => AppTaskbarBadge | null | undefined;
}

/**
 * AppTaskbar component - A Windows 11-style taskbar for launching and switching apps.
 * Displays pinned app icons that are always visible, plus any running non-pinned apps.
 * Clicking an icon launches the app or toggles its active state if already running.
 */
export function AppTaskbar({
  pinnedAppIds,
  className = '',
  showIndicators = true,
  side = 'left',
  getBadge,
}: AppTaskbarProps) {
  const { t } = useTranslation();
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

  const getAppTitle = (def: AppDefinition) => (def.titleKey ? String(t(def.titleKey)) : def.id);

  const formatBadgeContent = (content: ReactNode) => {
    if (typeof content === 'number' && content > 99) {
      return '99+';
    }

    return content;
  };

  const renderBadge = (def: AppDefinition, state: AppTaskbarItemState) => {
    const badge = getBadge?.(def, state);
    if (!badge) {
      return null;
    }

    return (
      <span
        className={`nc-app-taskbar-badge nc-${badge.tone ?? 'default'}`}
        aria-label={badge.ariaLabel}
      >
        {formatBadgeContent(badge.content)}
      </span>
    );
  };

  const iconSize = isMobile ? 24 : 28;

  return (
    <div className={`nc-app-taskbar ${isMobile ? 'nc-mobile' : 'nc-desktop'} nc-${side} ${className}`}>
      {/* Pinned app icons (always visible) */}
      {pinnedAppDefs.map((def) => {
        const Icon = def.icon;
        const isActive = activeAppId === def.id;
        const isRunning = isAppRunning(def.id);
        const itemState: AppTaskbarItemState = { isActive, isRunning, isPinned: true };

        return (
          <button
            key={def.id}
            className={`nc-app-taskbar-button ${isActive ? 'nc-active' : ''} ${isRunning ? 'nc-running' : ''}`}
            onClick={() => onClickApp(def.id)}
            title={getAppTitle(def)}
          >
            <Icon size={iconSize} />
            {renderBadge(def, itemState)}
            {showIndicators && isRunning && <span className="nc-app-taskbar-indicator" />}
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
        const itemState: AppTaskbarItemState = { isActive, isRunning: true, isPinned: false };

        return (
          <button
            key={running.appId}
            className={`nc-app-taskbar-button ${isActive ? 'nc-active' : ''} nc-running`}
            onClick={() => onClickApp(running.appId)}
            title={getAppTitle(def)}
          >
            <Icon size={iconSize} />
            {renderBadge(def, itemState)}
            {showIndicators && <span className="nc-app-taskbar-indicator" />}
          </button>
        );
      })}
    </div>
  );
}
