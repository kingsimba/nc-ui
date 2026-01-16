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
    'welcome.features.title': 'Main Features',
    'welcome.features.lightweight': '🚀 Lightweight: Only ~75KB bundle size',
    'welcome.features.framework': '🏗️ App Framework: Flexible windowed apps',
    'welcome.features.crossPlatform':
      '📱 Cross-Platform: Desktop & mobile ready',
    'welcome.features.components':
      '🛠️ 23+ Components: Library of UI essentials',
    'welcome.startBtn': 'Start',
    // Common notification titles
    'common.success': 'Success',
    'common.error': 'Error',
    'common.warning': 'Warning',
    'common.info': 'Info',
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
    'welcome.features.title': '核心特性',
    'welcome.features.lightweight': '🚀 轻量高效: 包体积仅 ~75KB',
    'welcome.features.framework': '🏗️ 应用框架: 灵活可扩展的窗口化应用',
    'welcome.features.crossPlatform': '📱 跨平台优化: 适配桌面端和移动端',
    'welcome.features.components': '🛠️ 19+ 组件: 开箱即用的 UI 组件库',
    'welcome.startBtn': '开始',
    // Common notification titles
    'common.success': '成功',
    'common.error': '错误',
    'common.warning': '警告',
    'common.info': '提示',
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
    // Common notification titles
    'common.success': 'Erfolg',
    'common.error': 'Fehler',
    'common.warning': 'Warnung',
    'common.info': 'Info',
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
    // Common notification titles
    'common.success': 'สำเร็จ',
    'common.error': 'ข้อผิดพลาด',
    'common.warning': 'คำเตือน',
    'common.info': 'ข้อมูล',
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
    'welcome.subtitle':
      'Una biblioteca de componentes React con estilo Windows 11',
    // Common notification titles
    'common.success': 'Éxito',
    'common.error': 'Error',
    'common.warning': 'Advertencia',
    'common.info': 'Información',
  },
};

export const demoI18n = createAppI18nFactory(demoResources);
