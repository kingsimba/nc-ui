import { useState, Suspense, lazy } from 'react';
import { ActivityIndicator } from '../../../src';

// Lazy load CodeEditor as it has heavy dependencies
const CodeEditor = lazy(() => import('../../../src/components/CodeEditor'));

const sampleTs = `import React, { useState } from 'react';

interface CounterProps {
  initial?: number;
  label?: string;
}

export function Counter({ initial = 0, label = 'Count' }: CounterProps) {
  const [count, setCount] = useState(initial);
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      {label}: {count}
    </button>
  );
}`;

const samplePy = `def fibonacci(n: int) -> list[int]:
    """Return the first n Fibonacci numbers."""
    if n <= 0:
        return []
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]

if __name__ == "__main__":
    print(fibonacci(10))`;

const sampleYaml = `# Deployment configuration
service: api
replicas: 3
strategy:
  type: RollingUpdate
  maxUnavailable: 1
env:
  - name: LOG_LEVEL
    value: info
  - name: FEATURE_FLAGS
    value: "alpha,beta"`;

const sampleLog = `[2026-08-08 10:15:02] INFO  Server listening on :8080
[2026-08-08 10:15:03] INFO  Registered 12 routes
[2026-08-08 10:15:05] WARN  Cache miss for key: user:42
[2026-08-08 10:15:09] ERROR Failed to connect to db: connection refused
[2026-08-08 10:15:09] INFO  Retrying in 2s...`;

export function CodeEditorSection() {
    const [ts, setTs] = useState(sampleTs);
    const [py, setPy] = useState(samplePy);
    const [yaml, setYaml] = useState(sampleYaml);
    const [showWhitespace, setShowWhitespace] = useState(false);
    const log = sampleLog;

    return (
        <section className="dev-section">
            <h2>CodeEditor</h2>
            <p style={{ color: 'var(--nc-text-weak)', marginBottom: 16 }}>
                A code editor with syntax highlighting and line numbers, powered by Prism.
                Pass a Prism language or use <code>detectLanguage(filename)</code> to auto-detect.
                This component is lazy-loaded due to its heavy dependencies.
            </p>

            <Suspense fallback={<div style={{ padding: 20 }}><ActivityIndicator size="small" /> Loading code editor...</div>}>
                <div className="dev-col" style={{ gap: 24 }}>
                    {/* TypeScript */}
                    <div>
                        <h3 style={{ marginBottom: 8 }}>TypeScript</h3>
                        <CodeEditor
                            value={ts}
                            onChange={setTs}
                            language="tsx"
                            minHeight={200}
                            maxHeight={320}
                            showWhitespace={showWhitespace}
                        />
                        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                            <input
                                type="checkbox"
                                checked={showWhitespace}
                                onChange={(event) => setShowWhitespace(event.target.checked)}
                            />
                            Show spaces, tabs, and line endings
                        </label>
                    </div>

                    {/* Python */}
                    <div>
                        <h3 style={{ marginBottom: 8 }}>Python</h3>
                        <CodeEditor
                            value={py}
                            onChange={setPy}
                            language="python"
                            minHeight={160}
                            maxHeight={280}
                        />
                    </div>

                    {/* YAML */}
                    <div>
                        <h3 style={{ marginBottom: 8 }}>YAML</h3>
                        <CodeEditor
                            value={yaml}
                            onChange={setYaml}
                            language="yaml"
                            minHeight={140}
                            maxHeight={240}
                        />
                    </div>

                    {/* Read-only log with line numbers */}
                    <div>
                        <h3 style={{ marginBottom: 8 }}>Read-Only (no language)</h3>
                        <CodeEditor
                            value={log}
                            onChange={() => { }}
                            readOnly
                            minHeight={140}
                            maxHeight={220}
                        />
                    </div>
                </div>
            </Suspense>
        </section>
    );
}
