import React, { useState, useEffect } from 'react';
import { appStateStore } from '../../stores/appStateStore';
import { runningAppsStore, RunningApp } from '../../lib/runningAppsStore';
import { appRegistry } from '../../lib/appRegistry';
import { AppContainer } from './AppContainer';
import { useViewport } from '../../contexts/ViewportContext';

/**
 * AppPanel component - Renders the right-side panel that displays running apps.
 * Each running app is rendered via AppContainer, but only the active app is visible.
 * On mobile devices, the panel overlays on top of the main area.
 * On desktop, the panel sits inline next to the main area.
 */
export function AppPanel() {
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

  // Mobile: overlay on top, Desktop: inline positioning
  const panelStyle: React.CSSProperties = {
    overflow: 'hidden',
    width: expanded ? (isMobile ? '100%' : fullPanelWidth) : 0,
    flexShrink: 0,
    display: expanded ? 'flex' : 'none',
    flexDirection: 'column',
    position: isMobile && expanded ? 'absolute' : 'relative',
    top: isMobile && expanded ? 0 : undefined,
    left: isMobile && expanded ? 0 : undefined,
    right: isMobile && expanded ? 0 : undefined,
    bottom: isMobile && expanded ? 56 : undefined,
    zIndex: isMobile && expanded ? 10 : undefined,
    maxHeight: isMobile && expanded ? 'calc(100% - 56px)' : '100%',
    borderRight: expanded && !isMobile ? '1px solid var(--nc-border)' : undefined,
  };

  return (
    <div className="panel" style={panelStyle}>
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
