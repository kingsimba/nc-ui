import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import Editor from 'react-simple-code-editor';
import { Highlight, themes, Prism } from 'prism-react-renderer';
import { parse as yamlParse, parseDocument, visit, LineCounter } from 'yaml';
import type { Scalar } from 'yaml';

// Add YAML language support to Prism
// Define YAML grammar directly to avoid global Prism dependency issues
if (!Prism.languages.yaml) {
  Prism.languages.yaml = {
    scalar: {
      pattern:
        /([\-:]\s*(?:![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/,
      lookbehind: true,
      alias: 'string',
    },
    comment: /#.*/,
    key: {
      pattern:
        /(\s*(?:^|[:\-,[{\r\n?])[ \t]*(?:![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,
      lookbehind: true,
      alias: 'atrule',
    },
    directive: {
      pattern: /(^[ \t]*)%.+/m,
      lookbehind: true,
      alias: 'tag',
    },
    datetime: {
      pattern:
        /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?)(?=[ \t]*(?:$|,|\]|\}))/m,
      lookbehind: true,
      alias: 'number',
    },
    boolean: {
      pattern:
        /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:false|true)(?=[ \t]*(?:$|,|\]|\}|[\r\n]))/im,
      lookbehind: true,
      alias: 'boolean',
    },
    null: {
      pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:null|~)(?=[ \t]*(?:$|,|\]|\}|[\r\n]))/im,
      lookbehind: true,
      alias: 'constant',
    },
    string: {
      pattern:
        /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)("|')(?:(?!\2)[^\\\r\n]|\\.)*\2(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/m,
      lookbehind: true,
      greedy: true,
    },
    number: {
      pattern:
        /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)(?=[ \t]*(?:$|,|\]|\}|[\r\n]))/im,
      lookbehind: true,
    },
    tag: /![^\s]+/,
    anchor: /[&*][\w]+/,
    punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
  };
}

interface YamlTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  onValidationChange?: (isValid: boolean, error?: string) => void;
  readOnly?: boolean;
  minHeight?: number;
  maxHeight?: number;
  debounceMs?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Language for syntax highlighting and validation. Default: 'yaml'. */
  language?: 'yaml' | 'json';
  /**
   * Whether null values are considered valid. When false, any null value —
   * explicit (`null`, `~`) or implicit (an empty mapping/list value such as
   * `name:` with nothing after the colon) — is reported as a validation error.
   * Default: true.
   */
  allowNull?: boolean;
}

interface YamlError {
  line: number;
  message: string;
}

/** Find all lines that contain a null value using the YAML CST for precise line numbers. */
function findNullLines(text: string): number[] {
  const lineCounter = new LineCounter();
  const doc = parseDocument(text, { lineCounter });
  const lines: number[] = [];
  visit(doc, {
    Scalar(_key, node: Scalar) {
      if (node.value === null && node.range) {
        lines.push(lineCounter.linePos(node.range[0]).line);
      }
    },
  });
  return lines;
}

/** Find the first line containing a JSON null keyword. */
function findJsonNullLine(text: string): number {
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (/\bnull\b/.test(lines[i])) return i + 1;
  }
  return 0;
}

function YamlTextArea({
  value,
  onChange,
  onValidationChange,
  readOnly = false,
  minHeight = 100,
  maxHeight,
  debounceMs = 500,
  className = '',
  style = {},
  language = 'yaml',
  allowNull = true,
}: YamlTextAreaProps) {
  const [error, setError] = useState<YamlError | null>(null);
  const validationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onValidationChangeRef = useRef(onValidationChange);
  const isUserInputRef = useRef(false);

  // Keep callback ref up to date
  onValidationChangeRef.current = onValidationChange;

  // Validate content and extract error line based on language
  const validateYaml = useCallback((text: string): YamlError | null => {
    if (!text.trim()) return null;
    if (language === 'json') {
      try {
        JSON.parse(text);
        if (!allowNull) {
          const nullLine = findJsonNullLine(text);
          if (nullLine > 0) {
            return { line: nullLine, message: 'Null values are not allowed' };
          }
        }
        return null;
      } catch (e: any) {
        const message: string = e?.message || 'Invalid JSON';
        const posMatch = /position\s+(\d+)/i.exec(message);
        let line = 1;
        if (posMatch) {
          const pos = Math.min(parseInt(posMatch[1], 10), text.length);
          line = 1;
          for (let index = 0; index < pos; index++) {
            if (text.charCodeAt(index) === 10) line++;
          }
        } else {
          const lineMatch = /line\s+(\d+)/i.exec(message);
          if (lineMatch) line = parseInt(lineMatch[1], 10) || 1;
        }
        return { line, message };
      }
    }
    try {
      yamlParse(text);
      if (!allowNull) {
        const nullLines = findNullLines(text);
        if (nullLines.length > 0) {
          return { line: nullLines[0], message: 'Null values are not allowed' };
        }
      }
      return null;
    } catch (e: any) {
      return {
        line: e?.linePos?.[0]?.line ?? 1,
        message: e.message || 'Invalid YAML',
      };
    }
  }, [language, allowNull]);

  // Set error state and notify parent
  const setValidationState = useCallback((err: YamlError | null) => {
    setError(err);
    onValidationChangeRef.current?.(!err, err?.message);
  }, []);

  // Handle input change
  const handleChange = useCallback(
    (newValue: string) => {
      if (readOnly) return;

      isUserInputRef.current = true;

      // Clear existing timeout and start new debounced validation
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
      validationTimeoutRef.current = setTimeout(() => {
        setValidationState(validateYaml(newValue));
        validationTimeoutRef.current = null;
      }, debounceMs);

      onChange(newValue);
    },
    [onChange, validateYaml, setValidationState, debounceMs, readOnly]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
    };
  }, []);

  // Re-validate when value prop changes from parent (not user input)
  useEffect(() => {
    if (isUserInputRef.current) {
      isUserInputRef.current = false;
      return;
    }

    // Prop changed from parent - validate immediately
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
      validationTimeoutRef.current = null;
    }
    setValidationState(validateYaml(value));
  }, [value, validateYaml, setValidationState]);

  // Count lines for line numbers
  const lineCount = useMemo(() => {
    return value.split('\n').length;
  }, [value]);

  // Generate line numbers
  const lineNumbers = useMemo(() => {
    return Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
  }, [lineCount]);

  // Determine if we're in dark mode by checking CSS variable
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const checkDark = () => {
      const bg = getComputedStyle(document.documentElement).getPropertyValue('--nc-bg').trim();
      // Simple heuristic: if background is dark, we're in dark mode
      setIsDark(bg.startsWith('#0') || bg.startsWith('#1') || bg.startsWith('#2') || bg.startsWith('#3'));
    };
    checkDark();
    // Listen for theme changes
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  const theme = isDark ? themes.vsDark : themes.vsLight;

  const getCustomStyle = useCallback(
    (tokenTypes: string[]): React.CSSProperties => {
      const type = tokenTypes[0];
      if (type === 'boolean') {
        return { color: isDark ? '#569cd6' : '#0000ff' };
      }
      if (type === 'constant' || type === 'null') {
        return { color: isDark ? '#569cd6' : '#0000ff' };
      }
      return {};
    },
    [isDark]
  );

  // Re-create highlight function when theme or language changes
  const highlightWithTheme = useCallback(
    (code: string) => (
      <Highlight theme={theme} code={code} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <>
            {tokens.map((line, i) => {
              const lineNumber = i + 1;
              const isErrorLine = error?.line === lineNumber;
              return (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  style={{
                    background: isErrorLine ? 'color-mix(in srgb, var(--nc-danger) 15%, transparent)' : undefined,
                    textDecoration: isErrorLine ? 'underline wavy var(--nc-danger)' : undefined,
                  }}
                >
                  {line.map((token, key) => {
                    const props = getTokenProps({ token });
                    const customStyle = getCustomStyle(token.types);
                    return (
                      <span
                        key={key}
                        {...props}
                        style={{
                          ...props.style,
                          ...customStyle,
                          opacity: readOnly ? 0.7 : undefined,
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </>
        )}
      </Highlight>
    ),
    [error, theme, getCustomStyle, language, readOnly]
  );

  const editorContainerRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleEditorScroll = () => {
    if (editorContainerRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = editorContainerRef.current.scrollTop;
    }
  };

  return (
    <div
      className={`nc-yaml-textarea ${className}`.trim()}
      style={{ display: 'flex', flexDirection: 'column', gap: 4, ...style }}
    >
      {/* CSS to prevent wrapping in editor */}
      <style>{`
        .yaml-editor-container,
        .yaml-editor-container * {
          white-space: pre !important;
          overflow-wrap: normal !important;
          word-wrap: normal !important;
          word-break: keep-all !important;
        }
        .yaml-editor-container textarea,
        .yaml-editor-container pre {
          white-space: pre !important;
          overflow-wrap: normal !important;
          word-wrap: normal !important;
          word-break: keep-all !important;
          overflow-x: visible !important;
          resize: none !important;
        }
        .yaml-editor-container.read-only textarea {
          caret-color: transparent !important;
          color: var(--nc-text-weak) !important;
        }
      `}</style>
      <div
        className={`nc-yaml-textarea-container${error ? ' error' : ''}`}
        style={{
          border: `1px solid ${error ? 'var(--nc-danger)' : 'var(--nc-border)'}`,
          background: readOnly ? 'var(--nc-bg-secondary)' : 'var(--nc-bg-tertiary)',
          minHeight,
          maxHeight,
        }}
      >
        {/* Line numbers gutter */}
        <div
          ref={lineNumbersRef}
          style={{
            padding: '10px 8px',
            paddingRight: 12,
            background: 'var(--nc-bg-tertiary)',
            borderRight: '1px solid var(--nc-border)',
            color: 'var(--nc-text-weak)',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: 13,
            lineHeight: '1.5',
            textAlign: 'right',
            userSelect: 'none',
            whiteSpace: 'pre',
            minWidth: 40,
            overflow: 'hidden',
          }}
        >
          {lineNumbers}
        </div>

        {/* Editor */}
        <div
          ref={editorContainerRef}
          className={`yaml-editor-container${readOnly ? ' read-only' : ''}`}
          style={{
            flex: 1,
            overflowX: 'auto',
            overflowY: 'auto',
            color: 'var(--nc-text)',
          }}
          onScroll={handleEditorScroll}
        >
          <Editor
            value={value}
            onValueChange={handleChange}
            highlight={highlightWithTheme}
            padding={10}
            readOnly={readOnly}
            style={{
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
              fontSize: 13,
              lineHeight: '1.5',
              minHeight: Math.max(minHeight - 2, 0),
              background: 'transparent',
              color: 'var(--nc-text)',
              whiteSpace: 'pre',
              minWidth: 'max-content',
            }}
            textareaClassName="yaml-editor-textarea"
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div
          style={{
            color: 'var(--nc-danger)',
            fontSize: 12,
            padding: '4px 8px',
            background: 'color-mix(in srgb, var(--nc-danger) 10%, transparent)',
            borderRadius: 4,
          }}
        >
          Line {error.line}: {error.message}
        </div>
      )}
    </div>
  );
}

export { YamlTextArea };
export type { YamlTextAreaProps };
export default YamlTextArea;
