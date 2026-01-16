import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import { appRegistry, AppDefinition } from '../src/lib/appRegistry';
import { runningAppsStore } from '../src/lib/runningAppsStore';
import { createAppI18nFactory } from '../src/lib/appI18nFactory';

// App IDs - all available apps
const APP_IDS = ['ui-components', '2048', 'calculator'];

// i18n resources for StartApp
const startAppResources = {
  en: {
    apps: 'Apps',
    clickToLaunch: 'Click to launch',
    noApps: 'No apps registered',
    // App titles (needed for AppTile)
    'apps.start': 'Start',
    'apps.2048.name': '2048',
    'apps.calculator': 'Calculator',
    'UI Components': 'UI Components',
  },
  zh: {
    apps: '应用',
    clickToLaunch: '点击启动',
    noApps: '没有注册的应用',
    // App titles
    'apps.start': '开始',
    'apps.2048.name': '2048',
    'apps.calculator': '计算器',
    'UI Components': 'UI 组件',
  },
  de: {
    apps: 'Apps',
    clickToLaunch: 'Klicken zum Starten',
    noApps: 'Keine Apps registriert',
    // App titles
    'apps.start': 'Start',
    'apps.2048.name': '2048',
    'apps.calculator': 'Rechner',
    'UI Components': 'UI-Komponenten',
  },
  es: {
    apps: 'Aplicaciones',
    clickToLaunch: 'Haz clic para iniciar',
    noApps: 'No hay apps',
    // App titles
    'apps.start': 'Inicio',
    'apps.2048.name': '2048',
    'apps.calculator': 'Calculadora',
    'UI Components': 'Componentes UI',
  },
  th: {
    apps: 'แอป',
    clickToLaunch: 'คลิกเพื่อเปิด',
    noApps: 'ไม่มีแอป',
    // App titles
    'apps.start': 'เริ่ม',
    'apps.2048.name': '2048',
    'apps.calculator': 'เครื่องคิดเลข',
    'UI Components': 'คอมโพเนนต์ UI',
  },
};

const startAppI18n = createAppI18nFactory(startAppResources);

/** Individual app tile with hover state */
function AppTile({
  app,
  isRunning,
  onClick,
}: {
  app: AppDefinition;
  isRunning: boolean;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const Icon = app.icon;
  const title = app.titleKey ? t(app.titleKey) : app.id;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'baseline',
        padding: 4,
        height: 90,
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        background: 'transparent',
        transition: 'background 0.15s, transform 0.1s',
        transform: pressed ? 'scale(0.9)' : hovered ? 'scale(1.02)' : 'scale(1)',
        position: 'relative',
        color: 'var(--nc-text)',
      }}
      title={title}
    >
      {/* Running indicator */}
      {isRunning && (
        <div
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--nc-primary)',
          }}
        />
      )}
      <Icon size={40} />
      <span
        style={{
          marginTop: 8,
          fontSize: 12,
          textAlign: 'center',
          width: '100%',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          hyphens: 'auto',
          lineHeight: 1.3,
        }}
      >
        {title}
      </span>
    </button>
  );
}

/** Section of apps with title and grid layout */
function AppSection({
  title,
  subtitle,
  apps,
  onAppClick,
}: {
  title: string;
  subtitle?: string;
  apps: AppDefinition[];
  onAppClick: (appId: string) => void;
}) {
  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ margin: 0, marginBottom: 4, fontSize: 16, fontWeight: 600 }}>{title}</h3>
        {subtitle && <p style={{ margin: 0, fontSize: 12, color: 'var(--nc-text-weak)' }}>{subtitle}</p>}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 6,
          marginBottom: 24,
        }}
      >
        {apps.map((app) => (
          <AppTile
            key={app.id}
            app={app}
            isRunning={runningAppsStore.isRunning(app.id)}
            onClick={() => onAppClick(app.id)}
          />
        ))}
      </div>
    </>
  );
}

/**
 * StartApp - A Windows 11-style Start Menu for launching apps.
 * Shows a grid of app icons that can be clicked to launch/switch to apps.
 */
function StartAppContent() {
  const { t } = useTranslation();
  const [, forceUpdate] = useState({});

  // Subscribe to running apps changes to update running indicators
  useEffect(() => {
    const unsub = runningAppsStore.subscribe(() => forceUpdate({}));
    return unsub;
  }, []);

  const apps = APP_IDS
    .map(id => appRegistry.get(id))
    .filter((def): def is AppDefinition => !!def);

  const handleAppClick = (appId: string) => {
    runningAppsStore.launchApp(appId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--nc-bg-tertiary)', padding: 8 }}>
      {/* Scrollable apps area */}
      <div style={{ flex: 1, overflow: 'auto', padding: 8 }}>
        {apps.length > 0 ? (
          <AppSection
            title={t('apps')}
            subtitle={t('clickToLaunch')}
            apps={apps}
            onAppClick={handleAppClick}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--nc-text-weak)' }}>
            {t('noApps')}
          </div>
        )}
      </div>
    </div>
  );
}

export function StartApp() {
  return (
    <I18nextProvider i18n={startAppI18n}>
      <StartAppContent />
    </I18nextProvider>
  );
}
