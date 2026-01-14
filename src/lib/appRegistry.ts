import React from 'react';

/**
 * Definition of an application that can be launched in the right toolbar.
 * App components can use the useApp() hook to access container controls.
 */
export interface AppDefinition {
  /** Unique identifier for the app */
  id: string;
  /** i18n key for the display title (e.g., 'apps.calculator' or 'apps.maps.name') */
  titleKey?: string;
  /** Icon component displayed in the toolbar */
  icon: React.ComponentType<{ size?: number; className?: string }>;
  /** The main component to render. Use useApp() hook inside to access container controls. */
  component: React.ComponentType;
  /** Panel width when the app is active (default: 400) */
  width?: number;
  /** Padding inside the app container (default: 12) */
  padding?: number;
  /** If true, hides the title bar and close button. The app cannot be closed once launched. */
  hideTitleBar?: boolean;
}

/**
 * Registry for all available applications.
 * Apps must be registered before they can be launched.
 */
class AppRegistry {
  private apps = new Map<string, AppDefinition>();

  /**
   * Register an app definition.
   * Applies default values (e.g., width: 400) if not specified.
   */
  register(app: AppDefinition): void {
    if (this.apps.has(app.id)) {
      console.warn(`App "${app.id}" is already registered. Overwriting.`);
    }

    this.apps.set(app.id, {
      ...app,
      width: app.width ?? 400,
      padding: app.padding ?? 12,
    });
  }

  /**
   * Unregister an app by its id.
   */
  unregister(id: string): void {
    this.apps.delete(id);
  }

  /**
   * Get an app definition by id.
   */
  get(id: string): AppDefinition | undefined {
    return this.apps.get(id);
  }

  /**
   * Get all registered apps.
   */
  list(): AppDefinition[] {
    return Array.from(this.apps.values());
  }

  /**
   * Check if an app is registered.
   */
  has(id: string): boolean {
    return this.apps.has(id);
  }
}

export const appRegistry = new AppRegistry();
