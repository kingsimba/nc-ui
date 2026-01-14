/**
 * Simple built-in localization for nc-ui components.
 * Supports: en, zh, de, th, es
 * 
 * By default, auto-detects locale from document.documentElement.lang.
 * Can be manually overridden with setLocale().
 */

export type SupportedLocale = 'en' | 'zh' | 'de' | 'th' | 'es';

const translations: Record<SupportedLocale, Record<string, string>> = {
    en: {
        default: 'default',
        noResults: 'No results',
        close: 'Close',
        clear: 'Clear',
        open: 'Open',
        ok: 'OK',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        connect: 'Connect',
        gotit: 'Got it',
    },
    zh: {
        default: '默认',
        noResults: '无结果',
        close: '关闭',
        clear: '清除',
        open: '打开',
        ok: '确定',
        cancel: '取消',
        save: '保存',
        delete: '删除',
        connect: '连接',
        gotit: '知道了',
    },
    de: {
        default: 'Standard',
        noResults: 'Keine Ergebnisse',
        close: 'Schließen',
        clear: 'Löschen',
        open: 'Öffnen',
        ok: 'OK',
        cancel: 'Abbrechen',
        save: 'Speichern',
        delete: 'Löschen',
        connect: 'Verbinden',
        gotit: 'Verstanden',
    },
    th: {
        default: 'ค่าเริ่มต้น',
        noResults: 'ไม่พบผลลัพธ์',
        close: 'ปิด',
        clear: 'ล้าง',
        open: 'เปิด',
        ok: 'ตกลง',
        cancel: 'ยกเลิก',
        save: 'บันทึก',
        delete: 'ลบ',
        connect: 'เชื่อมต่อ',
        gotit: 'เข้าใจแล้ว',
    },
    es: {
        default: 'predeterminado',
        noResults: 'Sin resultados',
        close: 'Cerrar',
        clear: 'Borrar',
        open: 'Abrir',
        ok: 'Aceptar',
        cancel: 'Cancelar',
        save: 'Guardar',
        delete: 'Eliminar',
        connect: 'Conectar',
        gotit: 'Entendido',
    },
};

const supportedLocales: SupportedLocale[] = ['en', 'zh', 'de', 'th', 'es'];

let manualLocale: SupportedLocale | null = null;

/**
 * Detect locale from document.documentElement.lang attribute.
 * Falls back to 'en' if not supported.
 */
function detectLocale(): SupportedLocale {
    if (typeof document === 'undefined') return 'en';

    const htmlLang = document.documentElement.lang?.toLowerCase() || '';
    // Match exact or prefix (e.g., 'zh-CN' -> 'zh')
    const match = supportedLocales.find(
        (loc) => htmlLang === loc || htmlLang.startsWith(loc + '-')
    );
    return match ?? 'en';
}

/**
 * Set the locale for nc-ui components manually.
 * Pass `null` to use auto-detection from HTML lang attribute.
 * @param locale - One of: 'en', 'zh', 'de', 'th', 'es', or null for auto
 */
export function setLocale(locale: SupportedLocale | null): void {
    manualLocale = locale;
}

/**
 * Get the current locale.
 * Returns manual locale if set, otherwise detects from HTML lang.
 */
export function getLocale(): SupportedLocale {
    return manualLocale ?? detectLocale();
}

/**
 * Get a translated string by key.
 * Falls back to English if key not found.
 */
export function t(key: string): string {
    const locale = getLocale();
    return translations[locale]?.[key] ?? translations.en[key] ?? key;
}
