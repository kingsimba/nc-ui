import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Button,
    ComboBox,
    AppPanel,
    AppTaskbar,
    ViewportProvider,
    NotificationContainer,
    useViewport,
} from '../src'
import { runningAppsStore } from '../src/lib/runningAppsStore'
import i18n from './i18n'
import type { UIComponentsRef } from './UIComponentsDemo'
import './dev.css'

type SupportedLocale = 'en' | 'zh' | 'de' | 'th' | 'es';

function AppContent() {
    const { t } = useTranslation()
    const { isMobile } = useViewport()
    const [theme, setTheme] = useState<'dark' | 'light'>('light')
    const [lang, setLang] = useState<SupportedLocale>('en')
    const [layoutMode, setLayoutMode] = useState<'overlay' | 'side-by-side'>('overlay')

    const langOptions = [
        { label: 'English', value: 'en' },
        { label: '中文', value: 'zh' },
        { label: 'Deutsch', value: 'de' },
        { label: 'ไทย', value: 'th' },
        { label: 'Español', value: 'es' },
    ]

    // Apply light theme class on initial mount
    useEffect(() => {
        document.documentElement.classList.add('light')
    }, [])

    // Handle URL parameters for deep linking
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const appParam = params.get('app')
        const tabParam = params.get('tab')

        if (appParam) {
            // Launch the app specified in URL
            const launchApp = async () => {
                if (appParam === 'ui-components') {
                    const app = await runningAppsStore.launchApp<UIComponentsRef>(appParam)

                    // If tab parameter is provided, set the tab
                    if (tabParam && app?.ref) {
                        app.ref.setTab(tabParam as any);
                    }
                } else {
                    await runningAppsStore.launchApp(appParam)
                }
            }
            launchApp()
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        document.documentElement.classList.toggle('light', newTheme === 'light')
    }

    const changeLanguage = (newLang: string | undefined) => {
        if (newLang) {
            setLang(newLang as SupportedLocale)
            i18n.changeLanguage(newLang)
        }
    }

    return (
        <div className="dev-app-framework">
            {/* Header with logo, language, theme toggle */}
            <header className="dev-framework-header">
                <div className="dev-header-content">
                    <div className="dev-header-left">
                        <h1>nc-ui Library</h1>
                        <a
                            href="https://github.com/kingsimba/nc-ui"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dev-github-link"
                            title="View on GitHub"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span className="dev-github-text">Github</span>
                        </a>
                    </div>
                    <div className="dev-header-controls">
                        <ComboBox
                            options={langOptions}
                            value={lang}
                            onChange={changeLanguage}
                            size="small"
                            clearable={false}
                            style={{ width: 120 }}
                        />
                        <ComboBox
                            options={[
                                { label: 'Overlay', value: 'overlay' },
                                { label: 'Side by Side', value: 'side-by-side' },
                            ]}
                            value={layoutMode}
                            onChange={(v) => v && setLayoutMode(v as 'overlay' | 'side-by-side')}
                            size="small"
                            clearable={false}
                            style={{ width: 130 }}
                            className="dev-desktop-only"
                        />
                        <Button variant="ghost" size="small" onClick={toggleTheme}>
                            {theme === 'dark' ? t('theme.light') : t('theme.dark')}
                        </Button>
                    </div>
                </div>
            </header>

            {/* App Framework - main demo */}
            <div className="dev-framework-container">
                <AppTaskbar pinnedAppIds={['start', 'ui-components', 'calculator', '2048']} />

                {/* Content area with conditional overlay/side-by-side layout */}
                <div style={{ position: 'relative', flex: 1, display: 'flex', minHeight: 0 }}>
                    {layoutMode === 'side-by-side' && !isMobile ? (
                        // Side-by-side: AppPanel inline with content
                        <>
                            <AppPanel autoWidth={true} style={{ borderRight: '1px solid var(--nc-border)' }} />
                            <div className="dev-framework-content">
                                <div className="dev-welcome">
                                    <h1 style={{ textAlign: 'center' }}>{t('welcome.title')}</h1>
                                    <p className="weak">{t('welcome.subtitle')}</p>

                                    <div className="block">
                                        <h3>{t('welcome.features.title')}</h3>
                                        <ul className="no-dots">
                                            <li>{t('welcome.features.aiGuide')}</li>
                                            <li>{t('welcome.features.lightweight')}</li>
                                            <li>{t('welcome.features.framework')}</li>
                                            <li>{t('welcome.features.crossPlatform')}</li>
                                            <li>{t('welcome.features.components')}</li>
                                        </ul>
                                    </div>

                                    <div style={{ textAlign: 'center' }}>
                                        <Button
                                            variant="primary"
                                            size="large"
                                            onClick={() => runningAppsStore.launchApp('start')}
                                        >
                                            {t('welcome.startBtn')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        // Overlay: AppPanel covers content (mobile always uses this)
                        <>
                            <AppPanel
                                autoWidth={true}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    bottom: isMobile ? 56 : 0,
                                    zIndex: 10,
                                }}
                            />
                            <div className="dev-framework-content">
                                <div className="dev-welcome">
                                    <h1 style={{ textAlign: 'center' }}>{t('welcome.title')}</h1>
                                    <p className="weak">{t('welcome.subtitle')}</p>

                                    <div className="block">
                                        <h3>{t('welcome.features.title')}</h3>
                                        <ul className="no-dots">
                                            <li>{t('welcome.features.aiGuide')}</li>
                                            <li>{t('welcome.features.lightweight')}</li>
                                            <li>{t('welcome.features.framework')}</li>
                                            <li>{t('welcome.features.crossPlatform')}</li>
                                            <li>{t('welcome.features.components')}</li>
                                        </ul>
                                    </div>

                                    <div style={{ textAlign: 'center' }}>
                                        <Button
                                            variant="primary"
                                            size="large"
                                            onClick={() => runningAppsStore.launchApp('start')}
                                        >
                                            {t('welcome.startBtn')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <ViewportProvider>
            <AppContent />
            <NotificationContainer />
        </ViewportProvider>
    )
}
