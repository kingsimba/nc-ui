import { useState, useEffect } from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import {
    Button,
    ComboBox,
    AppPanel,
    AppTaskbar,
    ViewportProvider,
} from '../src'
import type { SupportedLocale } from '../src'
import { demoI18n } from './i18n'
import './dev.css'

function AppContent() {
    const { t } = useTranslation()
    const [theme, setTheme] = useState<'dark' | 'light'>('light')
    const [lang, setLang] = useState<SupportedLocale>('en')

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

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        document.documentElement.classList.toggle('light', newTheme === 'light')
    }

    const changeLanguage = (newLang: string | undefined) => {
        if (newLang) {
            setLang(newLang as SupportedLocale)
            document.documentElement.lang = newLang
        }
    }

    return (
        <ViewportProvider>
            <div className="dev-app-framework">
                {/* Header with logo, language, theme toggle */}
                <header className="dev-framework-header">
                    <div className="dev-header-content">
                        <div className="dev-header-left">
                            <h1>nc-ui Component Library</h1>
                            <a
                                href="https://github.com/kingsimba/nc-ui"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="dev-github-link"
                                title="View on GitHub"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
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
                            <Button variant="ghost" size="small" onClick={toggleTheme}>
                                {theme === 'dark' ? t('theme.light') : t('theme.dark')}
                            </Button>
                        </div>
                    </div>
                </header>

                {/* App Framework - main demo */}
                <div className="dev-framework-container">
                    <AppTaskbar pinnedAppIds={['start', 'ui-components', 'calculator', '2048']} />
                    <AppPanel />

                    {/* Welcome content (visible when no app active) */}
                    <div className="dev-framework-content">
                        <div className="dev-welcome">
                            <h2>{t('welcome.title')}</h2>
                            <p>{t('welcome.subtitle')}</p>
                            <p className="dev-instruction">
                                {t('welcome.instruction')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewportProvider>
    )
}

export default function App() {
    return (
        <I18nextProvider i18n={demoI18n}>
            <AppContent />
        </I18nextProvider>
    )
}
