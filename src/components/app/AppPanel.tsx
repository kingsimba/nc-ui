import React, { useState, useEffect } from 'react';
import { appStateStore } from '../../stores/appStateStore';
import { runningAppsStore, RunningApp } from '../../lib/runningAppsStore';
import { appRegistry } from '../../lib/appRegistry';
import { useViewport } from '../../contexts/ViewportContext';
import { cn } from '../../lib/utils';
import { AppContainer } from './AppContainer';

export interface AppPanelProps {
  /** When true, panel width is determined by the active app's registered width. When false, parent controls width via style/className. Default: true */
  autoWidth?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom styles (merged with internal styles, takes precedence) */
  style?: React.CSSProperties;
}

/**
 * AppPanel component - Renders the panel that displays running apps.
 * Each running app is rendered via AppContainer, but only the active app is visible.
 * Layout positioning is controlled by the parent via style/className props.
 */
export function AppPanel({ autoWidth = true, className, style }: AppPanelProps) {
  const [activeAppId, setActiveAppId] = useState<string | null>(() => appStateStore.getActiveAppId());
  const [runningApps, setRunningApps] = useState<RunningApp[]>(() => runningAppsStore.getRunningApps());
  const { isMobile } = useViewport();

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

  // Launch the persisted active app on mount (if not already running)
  // Skip restoration if URL parameters are present (for deep linking)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasAppParam = params.has('app');

    if (!hasAppParam) {
      const persistedAppId = appStateStore.getActiveAppId();
      if (persistedAppId && !runningAppsStore.isRunning(persistedAppId)) {
        runningAppsStore.launchApp(persistedAppId);
      }
    }
  }, []);

  const onCloseApp = (appId: string) => {
    runningAppsStore.closeApp(appId);
  };

  const activeAppDef = activeAppId ? appRegistry.get(activeAppId) : null;
  const defaultPanelWidth = 400;
  const fullPanelWidth = activeAppDef?.width ?? defaultPanelWidth;
  const expanded = activeAppId !== null;

  // Use full width on mobile, otherwise use registered width
  const panelWidth = isMobile ? '100%' : fullPanelWidth;

  // Internal styles - only layout essentials
  const internalStyle: React.CSSProperties = {
    overflow: 'hidden',
    display: expanded ? 'flex' : 'none',
    flexDirection: 'column',
    flexShrink: 0,
    // Only set width if autoWidth is enabled
    ...(autoWidth && expanded ? { width: panelWidth } : {}),
  };

  // Merge internal styles with prop styles (prop takes precedence)
  const panelStyle: React.CSSProperties = { ...internalStyle, ...style };

  return (
    <div className={cn('nc-app-panel', className)} style={panelStyle}>
      {/* Render all running apps via AppContainer */}
      {runningApps.map((ra) => (
        <AppContainer
          key={ra.appId}
          appId={ra.appId}
          isActive={activeAppId === ra.appId}
          onClose={() => onCloseApp(ra.appId)}
        />
      ))}
    </div>
  );
}
