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
    const [cursor, setCursor] = useState<CsvCursorPosition>({ line: 1, column: 1, character: 1, offset: 0 });
    const [goToLineInput, setGoToLineInput] = useState('');
    const [goToColInput, setGoToColInput] = useState('1');
    const [goToCharInput, setGoToCharInput] = useState('1');
    const [highlightLine, setHighlightLine] = useState<number | undefined>(3);
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
                    highlightLine={highlightLine}
                    onCursorChange={setCursor}
                    placeholder="Paste tab-separated data here…"
                    style={{ height: 260, tabSize: 8 }}
                />

                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.85rem' }}>
                    <div style={{ color: 'var(--nc-text-weak)', display: 'flex', gap: 16 }}>
                        <span>Cursor: Line {cursor.line}, Col {cursor.column}, Char {cursor.character}</span>
                        <span>Offset: {cursor.offset}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <label style={{ color: 'var(--nc-text-weak)' }}>L:</label>
                            <input
                                type="number"
                                min={1}
                                value={goToLineInput}
                                onChange={e => setGoToLineInput(e.target.value)}
                                style={{ width: 50 }}
                            />
                        </div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <label style={{ color: 'var(--nc-text-weak)' }}>C:</label>
                            <input
                                type="number"
                                min={1}
                                value={goToColInput}
                                onChange={e => setGoToColInput(e.target.value)}
                                style={{ width: 50 }}
                            />
                        </div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <label style={{ color: 'var(--nc-text-weak)' }}>Char:</label>
                            <input
                                type="number"
                                min={1}
                                value={goToCharInput}
                                onChange={e => setGoToCharInput(e.target.value)}
                                style={{ width: 50 }}
                            />
                        </div>
                        <button
                            onClick={() => {
                                const l = parseInt(goToLineInput, 10);
                                const c = parseInt(goToColInput, 10);
                                const ch = parseInt(goToCharInput, 10);
                                if (!isNaN(l) && !isNaN(c) && !isNaN(ch)) {
                                    csvRef.current?.goToPosition(l, c, ch);
                                    setHighlightLine(l);
                                } else if (!isNaN(l)) {
                                    csvRef.current?.goToLine(l);
                                    setHighlightLine(l);
                                }
                            }}
                        >
                            Go to Position
                        </button>
                        <button onClick={() => setHighlightLine(undefined)} style={{ marginLeft: 4 }}>
                            Clear Highlight
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
