import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import Editor from 'react-simple-code-editor';
import { Highlight, themes, Prism } from 'prism-react-renderer';
import yaml from 'js-yaml';

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
  style?: React.CSSProperties;
}

interface YamlError {
  line: number;
  message: string;
}

export function YamlTextArea({
  value,
  onChange,
  onValidationChange,
  readOnly = false,
  minHeight = 100,
  maxHeight,
  debounceMs = 500,
  style = {},
}: YamlTextAreaProps) {
  const [error, setError] = useState<YamlError | null>(null);
  const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onValidationChangeRef = useRef(onValidationChange);
  const isUserInputRef = useRef(false);

  // Keep callback ref up to date
  onValidationChangeRef.current = onValidationChange;

  // Validate YAML and extract error line
  const validateYaml = useCallback((yamlString: string): YamlError | null => {
    if (!yamlString.trim()) return null;
    try {
      yaml.load(yamlString);
      return null;
    } catch (e: any) {
      const mark = e.mark;
      return {
        line: mark?.line !== undefined ? mark.line + 1 : 1,
        message: e.message || 'Invalid YAML',
      };
    }
  }, []);

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

  // Highlight function for the editor
  const highlightCode = useCallback(
    (code: string) => (
      <Highlight theme={themes.vsLight} code={code} language="yaml">
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
                    background: isErrorLine ? 'var(--danger-bg, rgba(220, 53, 69, 0.15))' : undefined,
                    textDecoration: isErrorLine ? 'underline wavy var(--danger)' : undefined,
                  }}
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              );
            })}
          </>
        )}
      </Highlight>
    ),
    [error]
  );

  // Generate line numbers
  const lineNumbers = useMemo(() => {
    return Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
  }, [lineCount]);

  // Determine if we're in dark mode by checking CSS variable
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const checkDark = () => {
      const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
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

  // Re-create highlight function when theme changes
  const highlightWithTheme = useCallback(
    (code: string) => (
      <Highlight theme={theme} code={code} language="yaml">
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
                    background: isErrorLine ? 'var(--danger-bg, rgba(220, 53, 69, 0.15))' : undefined,
                    textDecoration: isErrorLine ? 'underline wavy var(--danger)' : undefined,
                  }}
                >
                  {line.map((token, key) => {
                    const props = getTokenProps({ token });
                    // Add CSS class based on token type for theme-aware coloring
                    const tokenClass = token.types.map(t => `nc-token-${t}`).join(' ');
                    return (
                      <span
                        key={key}
                        {...props}
                        className={tokenClass}
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
    [error, theme]
  );

  const editorContainerRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleEditorScroll = () => {
    if (editorContainerRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = editorContainerRef.current.scrollTop;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, ...style }}>
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
        }
      `}</style>
      <div
        style={{
          display: 'flex',
          border: `1px solid ${error ? 'var(--nc-danger)' : 'var(--nc-border)'}`,
          borderRadius: 4,
          overflow: 'hidden',
          background: 'var(--nc-bg-secondary)',
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
        <div ref={editorContainerRef} className="yaml-editor-container" style={{ flex: 1, overflowX: 'auto', overflowY: 'auto' }} onScroll={handleEditorScroll}>
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
              minHeight: minHeight - 2,
              background: 'transparent',
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
            color: 'var(--danger)',
            fontSize: 12,
            padding: '4px 8px',
            background: 'var(--danger-bg, rgba(220, 53, 69, 0.1))',
            borderRadius: 4,
          }}
        >
          Line {error.line}: {error.message}
        </div>
      )}
    </div>
  );
}

// Default export for lazy loading
export default YamlTextArea;
