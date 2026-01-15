import { useState, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
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

export default function App() {
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
        <I18nextProvider i18n={demoI18n}>
            <ViewportProvider>
                <div className="dev-app-framework">
                {/* Header with logo, language, theme toggle */}
                <header className="dev-framework-header">
                    <div className="dev-header-content">
                        <h1>nc-ui Component Library</h1>
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
                                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
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
                            <h2>Welcome to nc-ui</h2>
                            <p>A React component library with Windows 11 styling</p>
                            <p className="dev-instruction">
                                👈 Click an app icon to explore components
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewportProvider>
        </I18nextProvider>
    )
}
