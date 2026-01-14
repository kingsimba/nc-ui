import i18next from 'i18next';

/**
 * Type for app-specific i18n resources.
 * Supports arbitrary nesting of translation keys and objects.
 * Each key is a language code (e.g., 'en', 'zh'), and the value is an object of translation key-value pairs.
 */
export type AppI18nResources = Record<string, Record<string, unknown>>;

/**
 * Factory function to create an isolated i18next instance for an app.
 * This allows apps to have their own translations independent of the global nc-ui i18n system.
 *
 * Features:
 * - Creates isolated i18next instance using createInstance()
 * - Syncs language with document.documentElement.lang
 * - Falls back to English for unsupported languages
 * - Supports string interpolation like {{variableName}}
 *
 * @param resources - Translation resources object with language keys (en, zh, de, th, es, etc.)
 * @returns Initialized i18next instance ready for use with I18nextProvider
 *
 * @example
 * ```typescript
 * const resources = {
 *   en: { hello: 'Hello', greeting: 'Hello {{name}}' },
 *   zh: { hello: '你好', greeting: '你好 {{name}}' },
 * };
 * const appI18n = createAppI18nFactory(resources);
 * 
 * // Use with react-i18next:
 * <I18nextProvider i18n={appI18n}>
 *   <YourApp />
 * </I18nextProvider>
 * ```
 */
export function createAppI18nFactory(resources: AppI18nResources) {
    // Create isolated instance (not the global singleton)
    const instance = i18next.createInstance();

    // Wrap resources in translation namespace structure
    const wrappedResources: Record<string, { translation: Record<string, unknown> }> = {};
    for (const lang in resources) {
        wrappedResources[lang] = { translation: resources[lang] };
    }

    // Get initial language from document or fallback
    const initialLang = typeof document !== 'undefined'
        ? document.documentElement.lang || 'en'
        : 'en';

    // Initialize the instance
    instance.init({
        resources: wrappedResources,
        lng: initialLang,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React already escapes by default
        },
    });

    // Watch for language changes on document.documentElement.lang
    if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
                    const newLang = document.documentElement.lang || 'en';
                    instance.changeLanguage(newLang);
                }
            }
        });
        observer.observe(document.documentElement, { attributes: true });
    }

    return instance;
}
