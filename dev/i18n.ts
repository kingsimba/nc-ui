import { createAppI18nFactory } from '../src/lib/appI18nFactory';

/**
 * Demo-level i18n for app registry titles and demo-specific strings.
 * This is separate from the UI framework's internal i18n (src/lib/i18n.ts).
 */
const demoResources = {
  en: {
    // App titles
    'apps.start': 'Start',
    'apps.2048.name': '2048',
    'apps.calculator': 'Calculator',
    // Theme toggle
    'theme.light': '☀️ Light',
    'theme.dark': '🌙 Dark',
    // Welcome page
    'welcome.title': 'Welcome to nc-ui',
    'welcome.subtitle': 'A React component library with Windows 11 styling',
    'welcome.instruction': '👈 Click an app icon to explore components',
  },
  zh: {
    // App titles
    'apps.start': '开始',
    'apps.2048.name': '2048',
    'apps.calculator': '计算器',
    // Theme toggle
    'theme.light': '☀️ 浅色',
    'theme.dark': '🌙 深色',
    // Welcome page
    'welcome.title': '欢迎使用 nc-ui',
    'welcome.subtitle': '采用 Windows 11 风格的 React 组件库',
    'welcome.instruction': '👈 点击应用图标探索组件',
  },
  de: {
    // App titles
    'apps.start': 'Start',
    'apps.2048.name': '2048',
    'apps.calculator': 'Rechner',
    // Theme toggle
    'theme.light': '☀️ Hell',
    'theme.dark': '🌙 Dunkel',
    // Welcome page
    'welcome.title': 'Willkommen bei nc-ui',
    'welcome.subtitle': 'Eine React-Komponentenbibliothek im Windows 11-Stil',
    'welcome.instruction': '👈 Klicken Sie auf ein App-Symbol, um Komponenten zu erkunden',
  },
  th: {
    // App titles
    'apps.start': 'เริ่ม',
    'apps.2048.name': '2048',
    'apps.calculator': 'เครื่องคิดเลข',
    // Theme toggle
    'theme.light': '☀️ สว่าง',
    'theme.dark': '🌙 มืด',
    // Welcome page
    'welcome.title': 'ยินดีต้อนรับสู่ nc-ui',
    'welcome.subtitle': 'ไลบรารีคอมโพเนนต์ React สไตล์ Windows 11',
    'welcome.instruction': '👈 คลิกไอคอนแอปเพื่อสำรวจคอมโพเนนต์',
  },
  es: {
    // App titles
    'apps.start': 'Inicio',
    'apps.2048.name': '2048',
    'apps.calculator': 'Calculadora',
    // Theme toggle
    'theme.light': '☀️ Claro',
    'theme.dark': '🌙 Oscuro',
    // Welcome page
    'welcome.title': 'Bienvenido a nc-ui',
    'welcome.subtitle': 'Una biblioteca de componentes React con estilo Windows 11',
    'welcome.instruction': '👈 Haz clic en un icono de aplicación para explorar componentes',
  },
};

export const demoI18n = createAppI18nFactory(demoResources);
