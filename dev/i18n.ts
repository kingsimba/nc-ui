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
  },
  zh: {
    // App titles
    'apps.start': '开始',
    'apps.2048.name': '2048',
    'apps.calculator': '计算器',
  },
  de: {
    // App titles
    'apps.start': 'Start',
    'apps.2048.name': '2048',
    'apps.calculator': 'Rechner',
  },
  th: {
    // App titles
    'apps.start': 'เริ่ม',
    'apps.2048.name': '2048',
    'apps.calculator': 'เครื่องคิดเลข',
  },
  es: {
    // App titles
    'apps.start': 'Inicio',
    'apps.2048.name': '2048',
    'apps.calculator': 'Calculadora',
  },
};

export const demoI18n = createAppI18nFactory(demoResources);
