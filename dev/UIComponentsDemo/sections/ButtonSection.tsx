import { useState } from 'react'
import { Button } from '../../../src'

export function ButtonSection() {
    const [loading, setLoading] = useState(false)

    const simulateLoading = () => {
        setLoading(true)
        setTimeout(() => setLoading(false), 2000)
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
                    <Button block>Block Button (Full Width)</Button>
                </div>
            </section>

            <section className="dev-section">
                <h2>Loading States</h2>
                <p style={{ marginBottom: '0.5rem', color: 'var(--nc-text-weak)' }}>
                    Click button to see loading state with spinner
                </p>
                <div className="dev-row">
                    <Button variant="primary" loading={loading} onClick={simulateLoading}>
                        Click to Load
                    </Button>
                    <Button loading>Always Loading</Button>
                </div>
            </section>

            <section className="dev-section">
                <h2>Text Selectable</h2>
                <p style={{ marginBottom: '0.5rem', color: 'var(--nc-text-weak)' }}>
                    Try selecting text in this button - click won't fire if text is selected
                </p>
                <div className="dev-row">
                    <Button textSelectable onClick={() => alert('Clicked!')}>
                        Select this text
                    </Button>
                </div>
            </section>
        </>
    )
}
