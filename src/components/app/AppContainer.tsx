import React, { useState, useCallback, useMemo, useEffect, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { appRegistry } from '../../lib/appRegistry';
import { AppContext, AppContextValue } from './AppContext';
import { AppTitleBar } from './AppTitleBar';
import { backHandlerRegistry } from '../../utils/backHandlerRegistry';
import { ActivityIndicator } from '../ActivityIndicator';

interface AppContainerProps {
  /** The app ID to render */
  appId: string;
  /** Whether this app is currently active (visible) */
  isActive: boolean;
  /** Called when the close button is clicked */
  onClose: () => void;
}

interface AppErrorState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary for app loading failures.
 */
class AppErrorBoundary extends React.Component<
  { children: React.ReactNode; appId: string },
  AppErrorState
> {
  constructor(props: { children: React.ReactNode; appId: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): AppErrorState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error loading app ${this.props.appId}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'column',
            gap: '16px',
            padding: '20px',
            textAlign: 'center',
            color: 'var(--text-secondary)',
          }}
        >
          <div>Failed to load app</div>
          {this.state.error && (
            <div style={{ fontSize: '12px', opacity: 0.7 }}>
              {this.state.error.message}
            </div>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Container component that wraps an app with its title bar.
 * Provides AppContext to the app component, allowing any nested
 * component to control the title bar dynamically via useApp() hook.
 */
export function AppContainer({ appId, isActive, onClose }: AppContainerProps) {
  const { t } = useTranslation();
  const def = appRegistry.get(appId);

  // Dynamic title state - initialized from app definition
  const [title, setTitleState] = useState<string>('');
  const [backHandler, setBackHandlerState] = useState<(() => void) | null>(null);
  const [toolbar, setToolbarState] = useState<React.ReactNode>(null);
  const [hideBackButton, setHideBackButtonState] = useState<boolean>(false);
  const [hideTitleBar, setHideTitleBarState] = useState<boolean>(false);

  // Initialize title from definition when it changes
  React.useEffect(() => {
    if (def?.titleKey) {
      setTitleState(t(def.titleKey));
    }
  }, [def, t]);

  // Register back handler when app is active (priority 50)
  useEffect(() => {
    if (!isActive) return;

    return backHandlerRegistry.register(`app-${appId}`, 50, () => {
      if (backHandler) {
        // Has back handler = can go back in NavStack
        backHandler();
        return true;
      }
      // No back handler = at app root, close the app
      onClose();
      return true;
    });
  }, [isActive, backHandler, onClose, appId]);

  // Memoized callbacks for app component
  const setTitle = useCallback((newTitle: string) => {
    setTitleState(newTitle);
  }, []);

  const setBackHandler = useCallback((handler: () => void) => {
    setBackHandlerState(() => handler);
  }, []);

  const clearBackHandler = useCallback(() => {
    setBackHandlerState(null);
  }, []);

  const setToolbar = useCallback((newToolbar: React.ReactNode) => {
    setToolbarState(newToolbar);
  }, []);

  const clearToolbar = useCallback(() => {
    setToolbarState(null);
  }, []);

  const setHideBackButton = useCallback((hide: boolean) => {
    setHideBackButtonState(hide);
  }, []);

  const setHideTitleBar = useCallback((hide: boolean) => {
    setHideTitleBarState(hide);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const appContextValue: AppContextValue = useMemo(() => ({
    setTitle,
    setBackHandler,
    clearBackHandler,
    setToolbar,
    clearToolbar,
    setHideBackButton,
    setHideTitleBar,
    close: onClose,
  }), [setTitle, setBackHandler, clearBackHandler, setToolbar, clearToolbar, setHideBackButton, setHideTitleBar, onClose]);

  if (!def) {
    return null;
  }

  const AppComp = def.component;
  // Title bar is shown if both the static definition allows it AND it's not dynamically hidden
  const showTitleBar = !def.hideTitleBar && !hideTitleBar;

  return (
    <div
      style={{
        display: isActive ? 'flex' : 'none',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
      }}
    >
      {showTitleBar && (
        <AppTitleBar
          title={title}
          onClose={onClose}
          onBack={backHandler ?? undefined}
          toolbar={toolbar}
          hideBackButton={hideBackButton}
        />
      )}
      <div
        className={showTitleBar ? 'nc-app-content-wrapper' : ''}
        style={{
          padding: def.padding,
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--nc-bg-secondary)',
          position: 'relative',
        }}
      >
        <AppContext.Provider value={appContextValue}>
          <AppErrorBoundary appId={appId}>
            <Suspense
              fallback={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}
                >
                  <ActivityIndicator />
                </div>
              }
            >
              <AppComp />
            </Suspense>
          </AppErrorBoundary>
        </AppContext.Provider>
      </div>
    </div>
  );
}
