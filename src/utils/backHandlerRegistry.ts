/**
 * Registry for back button handlers.
 * Allows apps to register handlers that are called when the user presses back.
 * Handlers are called in priority order (higher priority first).
 */

type BackHandler = () => boolean; // Returns true if handled

interface RegisteredHandler {
    id: string;
    priority: number;
    handler: BackHandler;
}

class BackHandlerRegistry {
    private handlers: RegisteredHandler[] = [];

    /**
     * Register a back handler.
     * @param id - Unique identifier for this handler
     * @param priority - Higher priority handlers are called first
     * @param handler - Function that returns true if it handled the back action
     * @returns Unsubscribe function
     */
    register(id: string, priority: number, handler: BackHandler): () => void {
        // Remove existing handler with same id
        this.handlers = this.handlers.filter((h) => h.id !== id);

        // Add new handler
        this.handlers.push({ id, priority, handler });

        // Sort by priority (descending)
        this.handlers.sort((a, b) => b.priority - a.priority);

        return () => {
            this.handlers = this.handlers.filter((h) => h.id !== id);
        };
    }

    /**
     * Trigger the back action.
     * Calls handlers in priority order until one returns true.
     * @returns true if a handler processed the back action
     */
    handleBack(): boolean {
        for (const { handler } of this.handlers) {
            if (handler()) {
                return true;
            }
        }
        return false;
    }

    /**
     * Unregister a handler by id.
     */
    unregister(id: string): void {
        this.handlers = this.handlers.filter((h) => h.id !== id);
    }
}

export const backHandlerRegistry = new BackHandlerRegistry();

/**
 * Push a browser history entry for the app.
 * This enables the browser back button to close/navigate apps.
 */
export function setAppInUrl(appId: string): void {
    if (typeof window !== 'undefined' && window.history) {
        const url = new URL(window.location.href);
        url.searchParams.set('app', appId);
        window.history.pushState({ app: appId }, '', url.toString());
    }
}

/**
 * Clear the app from the URL when closing.
 */
export function clearAppInUrl(): void {
    if (typeof window !== 'undefined' && window.history) {
        const url = new URL(window.location.href);
        url.searchParams.delete('app');
        window.history.replaceState({}, '', url.toString());
    }
}
