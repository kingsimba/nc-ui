import { useState, Suspense, lazy } from 'react';
import { ActivityIndicator } from '../../../src';

// Lazy load YamlTextArea as it has heavy dependencies
const YamlTextArea = lazy(() => import('../../../src/components/YamlTextArea'));

const sampleYaml = `# Sample YAML configuration
name: my-application
version: 1.0.0
settings:
  debug: true
  maxRetries: 3
  timeout: 30.5
  environment: null

database:
  host: localhost
  port: 5432
  credentials:
    username: "admin"
    password: 'secret123'

features:
  - authentication
  - logging
  - caching
`;

const invalidYaml = `# Invalid YAML example
name: test
  invalid: indentation
`;

export function YamlTextAreaSection() {
    const [yaml1, setYaml1] = useState(sampleYaml);
    const [yaml2, setYaml2] = useState(invalidYaml);
    const [yaml3, setYaml3] = useState('');
    const [isValid1, setIsValid1] = useState(true);
    const [isValid2, setIsValid2] = useState(true);

    return (
        <section className="dev-section">
            <h2>YamlTextArea</h2>
            <p style={{ color: 'var(--nc-text-weak)', marginBottom: 16 }}>
                A YAML editor with syntax highlighting, line numbers, and validation.
                This component is lazy-loaded due to its heavy dependencies.
            </p>

            <Suspense fallback={<div style={{ padding: 20 }}><ActivityIndicator size="small" /> Loading YAML editor...</div>}>
                <div className="dev-col" style={{ gap: 24 }}>
                    {/* Default editor */}
                    <div>
                        <h3 style={{ marginBottom: 8 }}>Default Editor</h3>
                        <p style={{ color: 'var(--nc-text-weak)', fontSize: 12, marginBottom: 8 }}>
                            Status: {isValid1 ? '✓ Valid YAML' : '✗ Invalid YAML'}
                        </p>
                        <YamlTextArea
                            value={yaml1}
                            onChange={setYaml1}
                            onValidationChange={(valid) => setIsValid1(valid)}
                            style={{ minHeight: 200, maxHeight: 300 }}
                        />
                    </div>

                    {/* Editor with error */}
                    <div>
                        <h3 style={{ marginBottom: 8 }}>With Validation Error</h3>
                        <p style={{ color: 'var(--nc-text-weak)', fontSize: 12, marginBottom: 8 }}>
                            Status: {isValid2 ? '✓ Valid YAML' : '✗ Invalid YAML'}
                        </p>
                        <YamlTextArea
                            value={yaml2}
                            onChange={setYaml2}
                            onValidationChange={(valid) => setIsValid2(valid)}
                            style={{ minHeight: 150 }}
                        />
                    </div>

                    {/* Read-only editor */}
                    <div>
                        <h3 style={{ marginBottom: 8 }}>Read-Only</h3>
                        <YamlTextArea
                            value={sampleYaml}
                            onChange={() => { }}
                            readOnly
                            style={{ minHeight: 150, maxHeight: 200 }}
                        />
                    </div>

                    {/* Empty editor */}
                    <div>
                        <h3 style={{ marginBottom: 8 }}>Empty Editor</h3>
                        <YamlTextArea
                            value={yaml3}
                            onChange={setYaml3}
                            style={{ minHeight: 100, maxHeight: 150 }}
                        />
                    </div>
                </div>
            </Suspense>
        </section>
    );
}
