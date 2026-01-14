import React, { createContext, useContext } from 'react';

/**
 * Context value for app components.
 * Provides functions to control the app container from any nested component.
 */
export interface AppContextValue {
  /** Set the title bar text (should be already translated) */
  setTitle: (title: string) => void;
  /** Set a back button handler. When set, a back arrow appears in the title bar. */
  setBackHandler: (handler: () => void) => void;
  /** Clear the back button handler, hiding the back arrow. */
  clearBackHandler: () => void;
  /** Set toolbar content to render in the title bar (right-aligned, before close button) */
  setToolbar: (toolbar: React.ReactNode) => void;
  /** Clear the toolbar content */
  clearToolbar: () => void;
  /** Hide the back button temporarily (useful when in edit mode) */
  setHideBackButton: (hide: boolean) => void;
  /** Dynamically hide or show the title bar */
  setHideTitleBar: (hide: boolean) => void;
  /** Close the app */
  close: () => void;
}

export const AppContext = createContext<AppContextValue | null>(null);

/**
 * Hook to access app context from within an app.
 * Returns functions to control the app container (setTitle, close, etc.)
 * Can be called from any component nested inside an app.
 * @throws Error if used outside of an app component
 */
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside an App');
  }
  return ctx;
}
