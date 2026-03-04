import { useRef, useState } from 'react';
import { CsvTextArea } from '../../../src/components/CsvTextArea';
import type { CsvTextAreaHandle, CsvCursorPosition } from '../../../src/components/CsvTextArea';

const sampleCsv = [
    'Name\tAge\tCity\tOccupation\tEmail',
    'Alice\t30\tNew York\tEngineer\talice@example.com',
    'Bob\t25\tLondon\tDesigner\tbob@example.com',
    'Charlie\t35\tTokyo\tManager\tcharlie@example.com',
    'Diana\t28\tParis\tAnalyst\tdiana@example.com',
].join('\n');

export function CsvTextAreaSection() {
    const [value, setValue] = useState(sampleCsv);
    const [cursor, setCursor] = useState<CsvCursorPosition>({ line: 1, column: 1 });
    const [goToInput, setGoToInput] = useState('');
    const csvRef = useRef<CsvTextAreaHandle>(null);

    return (
        <>
            <section className="dev-section">
                <h2>CsvTextArea</h2>
                <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
                    A textarea-like component that renders tab-separated text with
                    different colors for each column. Uses a transparent textarea layered
                    on top of a colored backdrop so editing works natively while the user
                    sees syntax-highlighted columns.
                </p>

                <CsvTextArea
                    value={value}
                    onChange={setValue}
                    placeholder="Paste tab-separated data here…"
                    style={{ height: 260, tabSize: 8 }}
                />

                <p style={{ marginTop: 12, fontSize: '0.85rem', color: 'var(--nc-text-weak)' }}>
                    Columns: {value.split('\n')[0]?.split('\t').length ?? 0} &middot;
                    Rows: {value.split('\n').length}
                </p>
            </section>

            <section className="dev-section">
                <h2>Line Numbers &amp; Cursor Tracking</h2>
                <p style={{ marginBottom: 16, color: 'var(--nc-text-weak)' }}>
                    Enable <code>showLineNumbers</code> for a line-number gutter. Use{' '}
                    <code>onCursorChange</code> to track the cursor position, and{' '}
                    <code>ref.goToLine(n)</code> to jump to a specific line programmatically.
                </p>

                <CsvTextArea
                    ref={csvRef}
                    value={value}
                    onChange={setValue}
                    showLineNumbers
                    onCursorChange={setCursor}
                    placeholder="Paste tab-separated data here…"
                    style={{ height: 260, tabSize: 8 }}
                />

                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--nc-text-weak)' }}>
                        Cursor: Line {cursor.line}, Col {cursor.column}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <label style={{ color: 'var(--nc-text-weak)' }}>Go to line:</label>
                        <input
                            type="number"
                            min={1}
                            value={goToInput}
                            onChange={e => setGoToInput(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    const n = parseInt(goToInput, 10);
                                    if (!isNaN(n)) csvRef.current?.goToLine(n);
                                }
                            }}
                            style={{ width: 60 }}
                        />
                        <button
                            onClick={() => {
                                const n = parseInt(goToInput, 10);
                                if (!isNaN(n)) csvRef.current?.goToLine(n);
                            }}
                        >
                            Go
                        </button>
                    </span>
                </div>
            </section>
        </>
    );
}
