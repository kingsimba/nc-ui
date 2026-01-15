import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from './app/AppContext';

// ============================================================================
// Types
// ============================================================================

export interface NavView {
  /** Unique identifier for the view */
  id: string;
  /** i18n key for the title (preferred - updates on language change) */
  titleKey?: string;
  /** Static title string (used when titleKey is not provided, e.g., for dynamic data like SSID) */
  title?: string;
  /** The view component to render */
  component: React.ReactNode;
}

export interface NavStackContextValue {
  /** Push a new view onto the stack */
  push: (view: NavView) => void;
  /** Go back one level (pop the current view) */
  pop: () => void;
  /** Reset to root view (clear entire stack) */
  reset: () => void;
  /** Current stack depth (1 = root only) */
  depth: number;
  /** Whether back navigation is possible */
  canGoBack: boolean;
  /** Current view's title */
  currentTitle: string;
}

/**
 * Per-view context for toolbar management.
 * Each view gets its own setToolbar/clearToolbar that only affects its stack slot.
 */
export interface NavViewContextValue {
  /** Set toolbar for THIS view only */
  setToolbar: (toolbar: React.ReactNode) => void;
  /** Clear toolbar for THIS view */
  clearToolbar: () => void;
}

interface NavStackProviderProps {
  /** The root view (always shown at the bottom of the stack) */
  rootView: NavView;
  /** Child components (typically NavStackContainer) */
  children: React.ReactNode;
}

// ============================================================================
// Context
// ============================================================================

const NavStackContext = createContext<NavStackContextValue | null>(null);
const NavViewContext = createContext<NavViewContextValue | null>(null);

/**
 * Hook to access navigation stack controls.
 * Must be used within a NavStackProvider.
 */
export function useNavStack(): NavStackContextValue {
  const context = useContext(NavStackContext);
  if (!context) {
    throw new Error('useNavStack must be used within a NavStackProvider');
  }
  return context;
}

/**
 * Hook to access per-view toolbar controls.
 * Must be used within a NavStack view.
 */
export function useNavView(): NavViewContextValue {
  const context = useContext(NavViewContext);
  if (!context) {
    throw new Error('useNavView must be used within NavStack');
  }
  return context;
}

// ============================================================================
// Internal Context for Provider Communication
// ============================================================================

interface NavStackInternalValue {
  stack: NavView[];
  toolbarStack: (React.ReactNode | null)[];
  updateToolbar: (index: number, toolbar: React.ReactNode) => void;
  clearToolbarAt: (index: number) => void;
  topIndex: number;
}

const NavStackInternalContext = createContext<NavStackInternalValue | null>(null);

// ============================================================================
// NavStackProvider
// ============================================================================

/**
 * Provides navigation stack context to child components.
 * Manages the view stack and exposes push/pop/reset operations.
 * Syncs title and back button with AppContainer via useApp() hook.
 * Also manages a parallel toolbar stack for stack-based toolbar management.
 */
export function NavStackProvider({ rootView, children }: NavStackProviderProps) {
  const { t } = useTranslation();
  const appContext = useApp();
  const [stack, setStack] = useState<NavView[]>([rootView]);
  const [toolbarStack, setToolbarStack] = useState<(React.ReactNode | null)[]>([null]);

  const updateToolbar = useCallback((index: number, toolbar: React.ReactNode) => {
    setToolbarStack((prev) => {
      const newStack = [...prev];
      newStack[index] = toolbar;
      return newStack;
    });
  }, []);

  const clearToolbarAt = useCallback((index: number) => {
    setToolbarStack((prev) => {
      const newStack = [...prev];
      newStack[index] = null;
      return newStack;
    });
  }, []);

  const push = useCallback((view: NavView) => {
    setStack((prev) => [...prev, view]);
    setToolbarStack((prev) => [...prev, null]); // New view starts with no toolbar
  }, []);

  const pop = useCallback(() => {
    setStack((prev) => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, -1);
    });
    setToolbarStack((prev) => prev.slice(0, -1)); // Remove toolbar slot
  }, []);

  const reset = useCallback(() => {
    setStack([rootView]);
    setToolbarStack([null]);
  }, [rootView]);

  const depth = stack.length;
  const canGoBack = depth > 1;
  const topIndex = stack.length - 1;

  // Get current view and resolve title (titleKey takes precedence)
  const currentView = stack[stack.length - 1];
  const currentTitle = currentView?.titleKey
    ? t(currentView.titleKey)
    : (currentView?.title ?? '');

  // Sync with AppContainer title bar
  useEffect(() => {
    appContext.setTitle(currentTitle);
  }, [currentTitle, appContext]);

  // Sync back handler with AppContainer
  useEffect(() => {
    if (canGoBack) {
      appContext.setBackHandler(pop);
    } else {
      appContext.clearBackHandler();
    }
  }, [canGoBack, pop, appContext]);

  // Sync top toolbar to AppContainer
  useEffect(() => {
    const topToolbar = toolbarStack[toolbarStack.length - 1];
    if (topToolbar) {
      appContext.setToolbar(topToolbar);
    } else {
      appContext.clearToolbar();
    }
  }, [toolbarStack, appContext]);

  const contextValue: NavStackContextValue = {
    push,
    pop,
    reset,
    depth,
    canGoBack,
    currentTitle,
  };

  const internalValue: NavStackInternalValue = {
    stack,
    toolbarStack,
    updateToolbar,
    clearToolbarAt,
    topIndex,
  };

  return (
    <NavStackContext.Provider value={contextValue}>
      <NavStackInternalContext.Provider value={internalValue}>
        {children}
      </NavStackInternalContext.Provider>
    </NavStackContext.Provider>
  );
}

// ============================================================================
// NavViewProvider (Wraps Each View)
// ============================================================================

interface NavViewProviderProps {
  index: number;
  children: React.ReactNode;
}

function NavViewProvider({ index, children }: NavViewProviderProps) {
  const internalContext = useContext(NavStackInternalContext);

  if (!internalContext) {
    throw new Error('NavViewProvider must be used within NavStackProvider');
  }

  const { updateToolbar, clearToolbarAt, topIndex } = internalContext;

  // Only allow updates if this view is the active (top) view
  const setToolbar = useCallback((toolbar: React.ReactNode) => {
    if (index === topIndex) {
      updateToolbar(index, toolbar);
    }
  }, [index, topIndex, updateToolbar]);

  const clearToolbar = useCallback(() => {
    if (index === topIndex) {
      clearToolbarAt(index);
    }
  }, [index, topIndex, clearToolbarAt]);

  const contextValue: NavViewContextValue = {
    setToolbar,
    clearToolbar,
  };

  return (
    <NavViewContext.Provider value={contextValue}>
      {children}
    </NavViewContext.Provider>
  );
}

// ============================================================================
// NavStackContainer
// ============================================================================

/**
 * Renders the views in the navigation stack.
 * All views in the stack remain mounted (hidden with CSS) to preserve state.
 * Title bar is now handled by AppContainer, so showTitleBar is removed.
 * Each view is wrapped with NavViewProvider for stack-based toolbar management.
 */
export function NavStackContainer() {
  const navContext = useContext(NavStackContext);
  const internalContext = useContext(NavStackInternalContext);

  if (!navContext || !internalContext) {
    throw new Error('NavStackContainer must be used within a NavStackProvider');
  }

  const { stack } = internalContext;

  return (
    <div className="nav-stack-container">
      <div className="nav-stack-content">
        {/* Render all views but only show the current one */}
        {stack.map((view, index) => {
          const isActive = index === stack.length - 1;
          return (
            <NavViewProvider key={view.id} index={index}>
              <div
                style={{ display: isActive ? 'flex' : 'none', flexDirection: 'column', height: '100%' }}
              >
                {view.component}
              </div>
            </NavViewProvider>
          );
        })}
      </div>
    </div>
  );
}
