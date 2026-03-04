import { useRef, useCallback } from 'react';
import './CsvTextArea.css';

// 10 distinct column colors – use CSS custom properties so light/dark themes
// can each have legible values (see CsvTextArea.css).
const COLUMN_COLORS = [
    'var(--nc-csv-col-0)',
    'var(--nc-csv-col-1)',
    'var(--nc-csv-col-2)',
    'var(--nc-csv-col-3)',
    'var(--nc-csv-col-4)',
    'var(--nc-csv-col-5)',
    'var(--nc-csv-col-6)',
    'var(--nc-csv-col-7)',
    'var(--nc-csv-col-8)',
    'var(--nc-csv-col-9)',
];

export interface CsvTextAreaProps {
    /** The raw tab-separated text */
    value: string;
    /** Called when the text changes */
    onChange: (value: string) => void;
    /** Placeholder text shown when the textarea is empty */
    placeholder?: string;
    /** Additional CSS class name(s) */
    className?: string;
    /** Inline styles applied to the container element */
    style?: React.CSSProperties;
}

/**
 * A textarea-like component that renders tab-separated text
 * with different colors for each column.
 *
 * Uses a transparent `<textarea>` layered on top of a colored
 * `<pre>` backdrop so that editing works natively while the
 * user sees syntax-highlighted columns.
 */
export function CsvTextArea({ value, onChange, placeholder, className, style }: CsvTextAreaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    // Keep backdrop scroll in sync with textarea
    const handleScroll = useCallback(() => {
        if (textareaRef.current && backdropRef.current) {
            backdropRef.current.scrollTop = textareaRef.current.scrollTop;
            backdropRef.current.scrollLeft = textareaRef.current.scrollLeft;
        }
    }, []);

    /**
     * Build highlighted HTML from the raw text.
     * Each tab-separated token gets a <span> with its column color.
     * Newlines are preserved. Tabs are rendered as visual separators.
     */
    const renderHighlighted = (text: string) => {
        if (!text) return null;

        const lines = text.split('\n');
        return lines.map((line, lineIdx) => {
            const cols = line.split('\t');
            return (
                <div className="nc-csv-line" key={lineIdx}>
                    {cols.map((col, colIdx) => (
                        <span key={colIdx}>
                            {colIdx > 0 && <span className="nc-csv-tab-char">{'\t'}</span>}
                            <span style={{ color: COLUMN_COLORS[colIdx % COLUMN_COLORS.length] }}>
                                {col}
                            </span>
                        </span>
                    ))}
                    {/* Ensure empty trailing line still takes up space */}
                    {line === '' && '\n'}
                </div>
            );
        });
    };

    return (
        <div className={`nc-csv-textarea-container ${className ?? ''}`} style={style}>
            {/* Colored backdrop */}
            <div className="nc-csv-textarea-backdrop" ref={backdropRef}>
                <pre className="nc-csv-textarea-highlights">
                    {renderHighlighted(value)}
                </pre>
            </div>

            {/* Transparent textarea on top */}
            <textarea
                ref={textareaRef}
                className="nc-csv-textarea-input"
                value={value}
                onChange={e => onChange(e.target.value)}
                onScroll={handleScroll}
                placeholder={placeholder}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
            />
        </div>
    );
}
