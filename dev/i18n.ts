import { createAppI18nFactory } from '../src/lib/appI18nFactory';

/**
 * Demo-level i18n for app registry titles and demo-specific strings.
 * This is separate from the UI framework's internal i18n (src/lib/i18n.ts).
 */
const demoResources = {
  en: {
    common: {
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
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Info',
    },
    apps: {
      start: 'Start',
      '2048': {
        name: '2048',
      },
      calculator: 'Calculator',
    },
    theme: {
      light: '☀️ Light',
      dark: '🌙 Dark',
    },
    welcome: {
      title: 'Welcome to nc-ui',
      subtitle: 'A React component library with Windows 11 styling',
      features: {
        title: 'Main Features',
        lightweight: '🚀 Lightweight: Only ~75KB bundle size',
        framework: '🏗️ App Framework: Flexible windowed apps',
        crossPlatform: '📱 Cross-Platform: Desktop & mobile ready',
        components: '🛠️ 23+ Components: Library of UI essentials',
      },
      startBtn: 'Start',
    },
  },
  zh: {
    common: {
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
      success: '成功',
      error: '错误',
      warning: '警告',
      info: '提示',
    },
    apps: {
      start: '开始',
      '2048': {
        name: '2048',
      },
      calculator: '计算器',
    },
    theme: {
      light: '☀️ 浅色',
      dark: '🌙 深色',
    },
    welcome: {
      title: '欢迎使用 nc-ui',
      subtitle: '采用 Windows 11 风格的 React 组件库',
      features: {
        title: '核心特性',
        lightweight: '🚀 轻量高效: 包体积仅 ~75KB',
        framework: '🏗️ 应用框架: 灵活可扩展的窗口化应用',
        crossPlatform: '📱 跨平台优化: 适配桌面端和移动端',
        components: '🛠️ 19+ 组件: 开箱即用的 UI 组件库',
      },
      startBtn: '开始',
    },
  },
  de: {
    common: {
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
      success: 'Erfolg',
      error: 'Fehler',
      warning: 'Warnung',
      info: 'Info',
    },
    apps: {
      start: 'Start',
      '2048': {
        name: '2048',
      },
      calculator: 'Rechner',
    },
    theme: {
      light: '☀️ Hell',
      dark: '🌙 Dunkel',
    },
    welcome: {
      title: 'Willkommen bei nc-ui',
      subtitle: 'Eine React-Komponentenbibliothek im Windows 11-Stil',
      features: {
        title: 'Hauptmerkmale',
        lightweight: '🚀 Leichtgewichtig: Nur ~75KB Bundle-Größe',
        framework: '🏗️ App-Framework: Flexible fensterbasierte Apps',
        crossPlatform: '📱 Plattformübergreifend: Desktop und mobil ready',
        components: '🛠️ 23+ Komponenten: Wichtige UI-Komponenten',
      },
      startBtn: 'Start',
    },
  },
  th: {
    common: {
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
      success: 'สำเร็จ',
      error: 'ข้อผิดพลาด',
      warning: 'คำเตือน',
      info: 'ข้อมูล',
    },
    apps: {
      start: 'เริ่ม',
      '2048': {
        name: '2048',
      },
      calculator: 'เครื่องคิดเลข',
    },
    theme: {
      light: '☀️ สว่าง',
      dark: '🌙 มืด',
    },
    welcome: {
      title: 'ยินดีต้อนรับสู่ nc-ui',
      subtitle: 'ไลบรารีคอมโพเนนต์ React สไตล์ Windows 11',
      features: {
        title: 'คุณสมบัติหลัก',
        lightweight: '🚀 เบาน้อย: ขนาดกลุ่ม ~75KB เท่านั้น',
        framework: '🏗️ แฟรมเวิร์ก App: แอปแบบหน้าต่างที่ยืดหยุ่น',
        crossPlatform: '📱 ข้ามแพลตฟอร์ม: พร้อมใช้งานบนเดสก์ทอปและมือถือ',
        components: '🛠️ 23+ องค์ประกอบ: ไลบรารี UI ที่จำเป็น',
      },
      startBtn: 'เริ่ม',
    },
  },
  es: {
    common: {
      default: 'predeterminado',
      noResults: 'Sin resultados',
      close: 'Cerrar',
      clear: 'Limpiar',
      open: 'Abrir',
      ok: 'Aceptar',
      cancel: 'Cancelar',
      save: 'Guardar',
      delete: 'Eliminar',
      connect: 'Conectar',
      gotit: 'Entendido',
      success: 'Éxito',
      error: 'Error',
      warning: 'Advertencia',
      info: 'Información',
    },
    apps: {
      start: 'Inicio',
      '2048': {
        name: '2048',
      },
      calculator: 'Calculadora',
    },
    theme: {
      light: '☀️ Claro',
      dark: '🌙 Oscuro',
    },
    welcome: {
      title: 'Bienvenido a nc-ui',
      subtitle: 'Una biblioteca de componentes React con estilo Windows 11',
      features: {
        title: 'Características principales',
        lightweight: '🚀 Ligero: Solo ~75KB de tamaño de paquete',
        framework: '🏗️ Marco de aplicación: Aplicaciones ventanas flexibles',
        crossPlatform: '📱 Multiplataforma: Listo para escritorio y móvil',
        components: '🛠️ 23+ Componentes: Biblioteca UI esencial',
      },
      startBtn: 'Inicio',
    },
  },
};

export const demoI18n = createAppI18nFactory(demoResources);
