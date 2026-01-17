import { appRegistry, AppDefinition } from './appRegistry';
import { appStateStore } from '../stores/appStateStore';

/**
 * Options for launching an app.
 */
export interface LaunchAppOptions {
  /** If true, the app will be launched but not made active. Default: false */
  launchInBackground?: boolean;
}

/**
 * Represents a running app instance.
 * @template TRef - The type of the ref object exposed by the app
 */
export interface RunningApp<TRef = Record<string, unknown>> {
  /** The app definition id */
  appId: string;
  /** Timestamp when the app was launched */
  launchedAt: number;
  /** Reference object populated by the app component with methods/state */
  ref?: TRef;
}

type Listener = () => void;
type RefReadyResolver = (app: RunningApp) => void;

/**
 * Store for managing running applications.
 * Only one instance of each app is allowed.
 * Apps are not persisted across page refreshes.
 */
class RunningAppsStore {
  private apps: RunningApp[] = [];
  private activeAppId: string | null = null;
  private listeners = new Set<Listener>();
  private refReadyResolvers = new Map<string, RefReadyResolver[]>();

  /**
   * Launch an app and wait for it to be ready (ref populated).
   * If already running, activates it (unless launchInBackground is true) and returns the existing app.
   * @template TRef - The type of the ref object exposed by the app (optional, for type safety)
   * @param appId - The app id to launch
   * @param options - Launch options
   * @returns Promise that resolves with the RunningApp when ref is ready, or null if app not found
   */
  async launchApp<TRef = Record<string, unknown>>(
    appId: string,
    options?: LaunchAppOptions
  ): Promise<RunningApp<TRef> | null> {
    const { launchInBackground = false } = options || {};

    // Check if app is registered
    if (!appRegistry.has(appId)) {
      console.error(`Cannot launch app "${appId}": not registered`);
      return null;
    }

    // Check if already running with ref ready
    const existing = this.apps.find((a) => a.appId === appId);
    if (existing) {
      if (!launchInBackground) {
        this.setActiveApp(appId);
        appStateStore._setActiveAppId(appId);
      }
      if (existing.ref) {
        return existing as RunningApp<TRef>;
      }
      // Wait for ref to be ready
      return this.waitForRef(appId) as Promise<RunningApp<TRef>>;
    }

    // Launch new instance
    const runningApp: RunningApp = {
      appId,
      launchedAt: Date.now(),
    };
    this.apps.push(runningApp);

    if (!launchInBackground) {
      this.activeAppId = appId;
      appStateStore._setActiveAppId(appId);
    }

    this.notify();

    // Wait for ref to be ready
    return this.waitForRef(appId) as Promise<RunningApp<TRef>>;
  }

  private waitForRef(appId: string): Promise<RunningApp> {
    return new Promise((resolve) => {
      const resolvers = this.refReadyResolvers.get(appId) || [];
      resolvers.push(resolve);
      this.refReadyResolvers.set(appId, resolvers);
    });
  }

  /**
   * Called by app components to register their ref.
   * This resolves any pending launchApp promises.
   */
  setAppRef(appId: string, ref: Record<string, any>): void {
    const app = this.apps.find((a) => a.appId === appId);
    if (!app) {
      console.warn(`Cannot set ref for app "${appId}": not running`);
      return;
    }
    app.ref = ref;

    // Resolve any pending promises
    const resolvers = this.refReadyResolvers.get(appId);
    if (resolvers) {
      resolvers.forEach((resolve) => resolve(app));
      this.refReadyResolvers.delete(appId);
    }
  }

  /**
   * Get a running app by id.
   */
  getApp(appId: string): RunningApp | undefined {
    return this.apps.find((a) => a.appId === appId);
  }

  /**
   * Close a running app.
   */
  closeApp(appId: string): void {
    const index = this.apps.findIndex((a) => a.appId === appId);
    if (index === -1) return;

    // Clear ref before removing
    const app = this.apps[index];
    if (app.ref) {
      app.ref = undefined;
    }

    this.apps.splice(index, 1);

    // If the closed app was active, clear active state
    if (this.activeAppId === appId) {
      // On desktop (width >= 768px), go to last app; on mobile, set to null
      const isDesktop = window.innerWidth >= 768;
      this.activeAppId = isDesktop && this.apps.length > 0 ? this.apps[this.apps.length - 1].appId : null;
      appStateStore._setActiveAppId(this.activeAppId);
    }
    this.notify();
  }

  /**
   * Set the active app by its app id.
   */
  setActiveApp(appId: string | null): void {
    if (appId !== null && !this.apps.find((a) => a.appId === appId)) {
      console.warn(`Cannot activate app "${appId}": not running`);
      return;
    }
    if (this.activeAppId !== appId) {
      this.activeAppId = appId;
      this.notify();
      appStateStore._setActiveAppId(appId);
    }
  }

  /**
   * Toggle an app: if active, deactivate; if inactive, activate.
   */
  toggleApp(appId: string): void {
    if (this.activeAppId === appId) {
      this.setActiveApp(null);
    } else {
      this.launchApp(appId);
    }
  }

  /**
   * Get the currently active app id.
   */
  getActiveAppId(): string | null {
    return this.activeAppId;
  }

  /**
   * Get the currently active app definition.
   */
  getActiveApp(): AppDefinition | null {
    if (!this.activeAppId) return null;
    return appRegistry.get(this.activeAppId) ?? null;
  }

  /**
   * Get all running apps.
   */
  getRunningApps(): RunningApp[] {
    return [...this.apps];
  }

  /**
   * Check if an app is running.
   */
  isRunning(appId: string): boolean {
    return this.apps.some((a) => a.appId === appId);
  }

  /**
   * Subscribe to changes.
   */
  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((l) => l());
  }
}

export const runningAppsStore = new RunningAppsStore();
