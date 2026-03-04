import { useRef, useCallback, useImperativeHandle, forwardRef, useMemo, useEffect } from 'react';
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

/** Cursor position info emitted by `onCursorChange`. Lines and columns are 1-based. */
export interface CsvCursorPosition {
    /** 1-based line number */
    line: number;
    /** 1-based column number */
    column: number;
}

/** Imperative handle exposed via `ref` on CsvTextArea. */
export interface CsvTextAreaHandle {
    /** Move the cursor to the beginning of the given 1-based line and scroll it into view. */
    goToLine: (line: number) => void;
}

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
    /** Show a line-number gutter on the left side. Defaults to `false`. */
    showLineNumbers?: boolean;
    /** Called whenever the cursor position changes (click, arrow keys, typing). */
    onCursorChange?: (position: CsvCursorPosition) => void;
    /** 1-based line number to highlight with a background band. The line is scrolled into view automatically. */
    highlightLine?: number;
}

/** Compute {line, column} (both 1-based) from a character offset in `text`. */
function offsetToPosition(text: string, offset: number): CsvCursorPosition {
    const before = text.slice(0, offset);
    const line = before.split('\n').length;
    const lastNewline = before.lastIndexOf('\n');
    const column = offset - lastNewline; // works even when lastNewline is -1
    return { line, column };
}

/** Return the character offset of the start of a 1-based `line` in `text`. */
function lineToOffset(text: string, line: number): number {
    const lines = text.split('\n');
    const clamped = Math.max(1, Math.min(line, lines.length));
    let offset = 0;
    for (let i = 0; i < clamped - 1; i++) {
        offset += lines[i].length + 1; // +1 for '\n'
    }
    return offset;
}

/**
 * A textarea-like component that renders tab-separated text
 * with different colors for each column.
 *
 * Uses a transparent `<textarea>` layered on top of a colored
 * `<pre>` backdrop so that editing works natively while the
 * user sees syntax-highlighted columns.
 *
 * Supports an optional line-number gutter (`showLineNumbers`) and
 * cursor-position tracking (`onCursorChange`). Use a ref to access
 * the imperative `goToLine(line)` method.
 */
export const CsvTextArea = forwardRef<CsvTextAreaHandle, CsvTextAreaProps>(
    function CsvTextArea({ value, onChange, placeholder, className, style, showLineNumbers = false, onCursorChange, highlightLine }, ref) {
        const textareaRef = useRef<HTMLTextAreaElement>(null);
        const backdropRef = useRef<HTMLDivElement>(null);
        const gutterRef = useRef<HTMLDivElement>(null);

        // ── Imperative handle ──────────────────────────────────────────
        useImperativeHandle(ref, () => ({
            goToLine(line: number) {
                const ta = textareaRef.current;
                if (!ta) return;
                const offset = lineToOffset(value, line);
                ta.focus();
                ta.setSelectionRange(offset, offset);
                // Scroll the target line into view (approximate via line-height)
                const lineHeight = parseFloat(getComputedStyle(ta).lineHeight) || 18;
                ta.scrollTop = (Math.max(1, line) - 1) * lineHeight;
                handleScroll();
                emitCursor();
            },
        }), [value]); // eslint-disable-line react-hooks/exhaustive-deps

        // ── Cursor position helpers ────────────────────────────────────
        const emitCursor = useCallback(() => {
            if (!onCursorChange || !textareaRef.current) return;
            const pos = offsetToPosition(value, textareaRef.current.selectionStart);
            onCursorChange(pos);
        }, [onCursorChange, value]);

        // Keep backdrop (and gutter) scroll in sync with textarea
        const handleScroll = useCallback(() => {
            const ta = textareaRef.current;
            if (!ta) return;
            if (backdropRef.current) {
                backdropRef.current.scrollTop = ta.scrollTop;
                backdropRef.current.scrollLeft = ta.scrollLeft;
            }
            if (gutterRef.current) {
                gutterRef.current.scrollTop = ta.scrollTop;
            }
        }, []);

        // ── Highlight-line scroll-into-view ─────────────────────────────
        useEffect(() => {
            if (highlightLine == null || highlightLine < 1) return;
            const ta = textareaRef.current;
            if (!ta) return;
            const lineHeight = parseFloat(getComputedStyle(ta).lineHeight) || 18;
            const targetTop = (highlightLine - 1) * lineHeight;
            const targetBottom = targetTop + lineHeight;
            // Only scroll if the highlighted line is not already visible
            if (targetTop < ta.scrollTop || targetBottom > ta.scrollTop + ta.clientHeight) {
                // Center the line in the viewport when possible
                ta.scrollTop = targetTop - ta.clientHeight / 2 + lineHeight / 2;
            }
            handleScroll();
        }, [highlightLine]); // eslint-disable-line react-hooks/exhaustive-deps

        // ── Line numbers ───────────────────────────────────────────────
        const lineCount = useMemo(() => value.split('\n').length, [value]);

        const renderGutter = () => {
            const nums: React.ReactNode[] = [];
            for (let i = 1; i <= lineCount; i++) {
                nums.push(
                    <div className={`nc-csv-line-number ${highlightLine === i ? 'nc-csv-highlight' : ''}`} key={i}>
                        {i}
                    </div>,
                );
            }
            return (
                <div className="nc-csv-gutter" ref={gutterRef}>
                    {nums}
                </div>
            );
        };

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
                    <div className={`nc-csv-line ${highlightLine === lineIdx + 1 ? 'nc-csv-highlight' : ''}`} key={lineIdx}>
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
            <div className={`nc-csv-textarea-container ${showLineNumbers ? 'nc-csv-with-gutter' : ''} ${className ?? ''}`} style={style}>
                {/* Optional line-number gutter */}
                {showLineNumbers && renderGutter()}

                {/* Scrollable editor area */}
                <div className="nc-csv-textarea-editor">
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
                        onChange={e => {
                            onChange(e.target.value);
                            // cursor will move after onChange, let React flush first
                            requestAnimationFrame(emitCursor);
                        }}
                        onScroll={handleScroll}
                        onSelect={emitCursor}
                        onKeyUp={emitCursor}
                        onClick={emitCursor}
                        placeholder={placeholder}
                        spellCheck={false}
                        autoComplete="off"
                        autoCorrect="off"
                    />
                </div>
            </div>
        );
    },
);
