import { useState } from 'react';
import { Button, AppDialog } from '../../../src';

export function AppDialogSection() {
    const [calculatorOpen, setCalculatorOpen] = useState(false);

    return (
        <>
            <section className="dev-section">
                <h2>AppDialog</h2>
                <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
                    AppDialog renders an app inside a fullscreen dialog overlay. It preserves all app
                    functionality including the title bar, AppContext, and back handlers.
                </p>
                <div className="dev-row">
                    <Button onClick={() => setCalculatorOpen(true)}>
                        Open Calculator in Dialog
                    </Button>
                </div>
            </section>

            <AppDialog
                appId="calculator"
                open={calculatorOpen}
                onClose={() => setCalculatorOpen(false)}
                style={{ maxWidth: 480, maxHeight: 700 }}
            />
        </>
    );
}
