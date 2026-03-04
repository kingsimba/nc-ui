import { useState } from 'react';
import { CsvTextArea } from '../../../src/components/CsvTextArea';

const sampleCsv = [
    'Name\tAge\tCity\tOccupation\tEmail',
    'Alice\t30\tNew York\tEngineer\talice@example.com',
    'Bob\t25\tLondon\tDesigner\tbob@example.com',
    'Charlie\t35\tTokyo\tManager\tcharlie@example.com',
    'Diana\t28\tParis\tAnalyst\tdiana@example.com',
].join('\n');

export function CsvTextAreaSection() {
    const [value, setValue] = useState(sampleCsv);

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

        </>
    );
}
