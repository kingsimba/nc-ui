/**
 * Simple store for persisting app state (like active app ID) across sessions.
 * Uses localStorage for persistence.
 */

type Listener<T> = (value: T) => void;

const STORAGE_KEY = 'nc-ui-app-state';

interface AppState {
    activeAppId: string | null;
}

class AppStateStore {
    private state: AppState;
    private listeners = new Map<keyof AppState, Set<Listener<any>>>();

    constructor() {
        // Load persisted state
        this.state = this.loadState();
    }

    private loadState(): AppState {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            // ignore parse errors
        }
        return { activeAppId: null };
    }

    private saveState(): void {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
        } catch (e) {
            // ignore storage errors
        }
    }

    /**
     * Get the currently active app ID.
     */
    getActiveAppId(): string | null {
        return this.state.activeAppId;
    }

    /**
     * Set the active app ID (internal use by runningAppsStore).
     */
    _setActiveAppId(appId: string | null): void {
        if (this.state.activeAppId !== appId) {
            this.state.activeAppId = appId;
            this.saveState();
            this.notify('activeAppId', appId);
        }
    }

    /**
     * Subscribe to changes of a specific state key.
     */
    subscribe<K extends keyof AppState>(key: K, listener: Listener<AppState[K]>): () => void {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set());
        }
        this.listeners.get(key)!.add(listener);
        return () => {
            this.listeners.get(key)?.delete(listener);
        };
    }

    private notify<K extends keyof AppState>(key: K, value: AppState[K]): void {
        this.listeners.get(key)?.forEach((listener) => listener(value));
    }
}

export const appStateStore = new AppStateStore();
