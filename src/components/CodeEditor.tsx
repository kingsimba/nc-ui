import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { Highlight, themes } from 'prism-react-renderer';

export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  /** Prism language name (e.g. 'javascript', 'python', 'yaml'). Omit for plain text. */
  language?: string;
  readOnly?: boolean;
  minHeight?: number;
  maxHeight?: number;
  /** Show line numbers gutter. Default: true. */
  lineNumbers?: boolean;
  /** Show markers for spaces, tabs, and line endings. Default: false. */
  showWhitespace?: boolean;
  /** Number of columns occupied by a tab. Default: 8. */
  tabSize?: number;
  /** Prism color theme. Defaults to automatic document theme detection. */
  colorTheme?: 'light' | 'dark' | 'auto';
  className?: string;
  style?: React.CSSProperties;
}

interface RenderedToken {
  content: React.ReactNode;
  column: number;
}

function renderTokenContent(content: string, showWhitespace: boolean, tabSize: number, startColumn: number): RenderedToken {
  if (!showWhitespace) {
    return { content, column: startColumn + content.length };
  }

  let column = startColumn;
  const rendered = Array.from(content, (character, index) => {
    if (character === ' ') {
      column++;
      return <span key={index} className="nc-code-editor-whitespace" aria-hidden="true">·</span>;
    }
    if (character === '\t') {
      const width = tabSize - (column % tabSize);
      column += width;
      return (
        <span
          key={index}
          className="nc-code-editor-whitespace nc-code-editor-tab"
          style={{ width: `${width}ch` }}
          aria-hidden="true"
        >
          →
        </span>
      );
    }
    column++;
    return character;
  });

  return { content: rendered, column };
}

/**
 * Map a filename (or file extension) to a Prism language name.
 * Returns undefined if the language is not recognized.
 */
export function detectLanguage(filename: string): string | undefined {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (!ext) return undefined;

  const extMap: Record<string, string> = {
    ts: 'typescript',
    tsx: 'tsx',
    js: 'javascript',
    jsx: 'jsx',
    json: 'json',
    yaml: 'yaml',
    yml: 'yaml',
    py: 'python',
    rb: 'ruby',
    rs: 'rust',
    go: 'go',
    java: 'java',
    c: 'c',
    cpp: 'cpp',
    h: 'c',
    hpp: 'cpp',
    cs: 'csharp',
    sh: 'bash',
    bash: 'bash',
    zsh: 'bash',
    fish: 'bash',
    md: 'markdown',
    markdown: 'markdown',
    html: 'html',
    htm: 'html',
    css: 'css',
    scss: 'scss',
    sql: 'sql',
    xml: 'xml',
    svg: 'xml',
    toml: 'toml',
    ini: 'ini',
    cfg: 'ini',
    conf: 'ini',
    properties: 'properties',
    env: 'properties',
    nginx: 'nginx',
    dockerfile: 'docker',
    makefile: 'makefile',
    cmake: 'cmake',
    lua: 'lua',
    php: 'php',
    pl: 'perl',
    pm: 'perl',
    r: 'r',
    swift: 'swift',
    kt: 'kotlin',
    scala: 'scala',
    dart: 'dart',
    graphql: 'graphql',
    proto: 'protobuf',
  };

  // Check by extension first, then by full filename for special files
  if (extMap[ext]) return extMap[ext];

  const baseName = filename.toLowerCase();
  if (extMap[baseName]) return extMap[baseName];

  return undefined;
}

function CodeEditor({
  value,
  onChange,
  language,
  readOnly = false,
  minHeight = 100,
  maxHeight,
  lineNumbers: showLineNumbers = true,
  showWhitespace = false,
  tabSize = 8,
  colorTheme = 'auto',
  className = '',
  style = {},
}: CodeEditorProps) {
  const normalizedTabSize = Number.isFinite(tabSize) ? Math.max(1, Math.floor(tabSize)) : 8;

  // Count lines for line numbers
  const lineCount = useMemo(() => {
    return value.split('\n').length;
  }, [value]);

  // Generate line numbers
  const lineNumbers = useMemo(() => {
    return Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
  }, [lineCount]);

  // Determine if we're in dark mode
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const checkDark = () => {
      const bg = getComputedStyle(document.documentElement).getPropertyValue('--nc-bg').trim();
      setIsDark(bg.startsWith('#0') || bg.startsWith('#1') || bg.startsWith('#2') || bg.startsWith('#3'));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  const theme = (colorTheme === 'dark' || (colorTheme === 'auto' && isDark)) ? themes.vsDark : themes.vsLight;

  // Highlight function
  const highlightWithTheme = useCallback(
    (code: string) => {
      const highlightLanguage = language || 'text';
      return (
        <Highlight theme={theme} code={code} language={highlightLanguage}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <>
              {tokens.map((line, i) => {
                let column = 0;
                return (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => {
                      const props = getTokenProps({ token });
                      const renderedToken = renderTokenContent(
                        token.content,
                        showWhitespace,
                        normalizedTabSize,
                        column,
                      );
                      column = renderedToken.column;
                      return (
                        <span
                          key={key}
                          {...props}
                          style={{
                            ...props.style,
                            opacity: readOnly ? 0.7 : undefined,
                          }}
                        >
                          {renderedToken.content}
                        </span>
                      );
                    })}
                    {showWhitespace && i < tokens.length - 1 && (
                      <span className="nc-code-editor-line-ending" aria-hidden="true">↵</span>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </Highlight>
      );
    },
    [theme, language, normalizedTabSize, readOnly, showWhitespace]
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
      className={`nc-code-editor ${className}`.trim()}
      style={{ display: 'flex', flexDirection: 'column', gap: 4, ...style }}
    >
      <style>{`
        .code-editor-container,
        .code-editor-container * {
          white-space: pre !important;
          overflow-wrap: normal !important;
          word-wrap: normal !important;
          word-break: keep-all !important;
        }
        .code-editor-container textarea,
        .code-editor-container pre {
          white-space: pre !important;
          overflow-wrap: normal !important;
          word-wrap: normal !important;
          word-break: keep-all !important;
          overflow-x: visible !important;
          resize: none !important;
        }
        .code-editor-container.read-only textarea {
          caret-color: transparent !important;
          color: var(--nc-text-weak) !important;
        }
        .nc-code-editor .token.tag {
          display: inline;
          padding: 0;
          border: 0;
          border-radius: 0;
          background: transparent;
          color: inherit;
          font-size: inherit;
          font-weight: inherit;
          white-space: inherit;
        }
      `}</style>
      <div
        className="nc-code-editor-container"
        style={{
          border: '1px solid var(--nc-border)',
          background: readOnly ? 'var(--nc-bg-secondary)' : 'var(--nc-bg-tertiary)',
          minHeight,
          maxHeight,
          display: 'flex',
        }}
      >
        {/* Line numbers gutter */}
        {showLineNumbers && (
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
        )}

        {/* Editor */}
        <div
          ref={editorContainerRef}
          className={`code-editor-container${readOnly ? ' read-only' : ''}`}
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
            onValueChange={onChange}
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
              tabSize: normalizedTabSize,
            }}
            textareaClassName="code-editor-textarea"
          />
        </div>
      </div>
    </div>
  );
}

export { CodeEditor };
export default CodeEditor;
