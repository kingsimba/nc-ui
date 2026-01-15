import { useState } from 'react'
import { Button } from '../../../src'

export function ButtonSection() {
    const [loading, setLoading] = useState(false)
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

    const simulateLoading = () => {
        setLoading(true)
        setTimeout(() => setLoading(false), 2000)
    }

    const simulateLoadingFor = (key: string) => {
        setLoadingStates(prev => ({ ...prev, [key]: true }))
        setTimeout(() => setLoadingStates(prev => ({ ...prev, [key]: false })), 2000)
    }

    return (
        <>
            <section className="dev-section">
                <h2>Button Variants</h2>
                <div className="dev-row">
                    <Button>Default</Button>
                    <Button variant="primary">Primary</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="ghost">Ghost</Button>
                </div>
            </section>

            <section className="dev-section">
                <h2>Button Sizes</h2>
                <div className="dev-row">
                    <Button size="small">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="large">Large</Button>
                </div>
            </section>

            <section className="dev-section">
                <h2>Button States</h2>
                <div className="dev-row">
                    <Button disabled>Disabled</Button>
                    <Button variant="primary" disabled>Disabled Primary</Button>
                    <Button variant="primary" loading={loading} onClick={simulateLoading}>
                        {loading ? 'Loading...' : 'Click to Load'}
                    </Button>
                    <Button block>Block Button (Full Width)</Button>
                </div>
            </section>

            <section className="dev-section">
                <h2>Loading States</h2>
                <p style={{ marginBottom: '0.5rem', color: 'var(--nc-text-weak)' }}>
                    Click each button to see loading state with spinner
                </p>
                <div className="dev-row">
                    <Button loading={loadingStates['default']} onClick={() => simulateLoadingFor('default')}>
                        Default
                    </Button>
                    <Button variant="primary" loading={loadingStates['primary']} onClick={() => simulateLoadingFor('primary')}>
                        Primary
                    </Button>
                    <Button variant="danger" loading={loadingStates['danger']} onClick={() => simulateLoadingFor('danger')}>
                        Danger
                    </Button>
                    <Button variant="success" loading={loadingStates['success']} onClick={() => simulateLoadingFor('success')}>
                        Success
                    </Button>
                    <Button variant="ghost" loading={loadingStates['ghost']} onClick={() => simulateLoadingFor('ghost')}>
                        Ghost
                    </Button>
                </div>
                <div className="dev-row" style={{ marginTop: '0.5rem' }}>
                    <Button loading>Always Loading</Button>
                    <Button variant="primary" loading>Always Loading Primary</Button>
                </div>
            </section>

            <section className="dev-section">
                <h2>Text Selectable</h2>
                <p style={{ marginBottom: '0.5rem', color: 'var(--nc-text-weak)' }}>
                    Try selecting text in these buttons - click won't fire if text is selected
                </p>
                <div className="dev-row">
                    <Button textSelectable onClick={() => alert('Clicked!')}>
                        Select this text
                    </Button>
                    <Button variant="primary" textSelectable onClick={() => alert('Clicked!')}>
                        Or select this one
                    </Button>
                    <Button variant="success" textSelectable onClick={() => alert('Clicked!')}>
                        Copy-friendly button
                    </Button>
                </div>
            </section>
        </>
    )
}
