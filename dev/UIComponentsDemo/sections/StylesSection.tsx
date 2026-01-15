export function StylesSection() {
  return (
    <>
      <section className="dev-section">
        <h2>Typography</h2>
        <p style={{ marginBottom: '1rem', color: 'var(--nc-text-weak)' }}>
          Reusable heading and text styles
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h1 className="h1">Heading 1 (.h1)</h1>
          <h2 className="h2">Heading 2 (.h2)</h2>
          <h3 className="h3">Heading 3 (.h3)</h3>
          <h4 className="h4">Heading 4 (.h4)</h4>
        </div>
      </section>

      <section className="dev-section">
        <h2>Text Colors</h2>
        <p style={{ marginBottom: '1rem', color: 'var(--nc-text-weak)' }}>
          CSS variables for text styling
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'var(--nc-text)', fontWeight: 500 }}>
              Primary Text
            </span>
            <code className="code">--nc-text</code>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'var(--nc-text-weak)' }}>
              Weak Text (secondary)
            </span>
            <code className="code">--nc-text-weak</code>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'var(--nc-text-weaker)' }}>
              Weaker Text (tertiary)
            </span>
            <code className="code">--nc-text-weaker</code>
          </div>
        </div>
      </section>

      <section className="dev-section">
        <h2>Code</h2>
        <p style={{ marginBottom: '1rem', color: 'var(--nc-text-weak)' }}>
          Inline and block code styling
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h4 style={{ marginBottom: '8px', color: 'var(--nc-text-weak)', fontSize: '13px' }}>Inline Code</h4>
            <div>
              Use <code className="code">.code</code> class for inline code like{' '}
              <code className="code">variableName</code> or{' '}
              <code className="code">--nc-primary</code>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '8px', color: 'var(--nc-text-weak)', fontSize: '13px' }}>Code Block</h4>
            <div className="code-block">{`// Use .code-block for multi-line code
const config = {
  theme: 'dark',
  primary: '--nc-primary'
};`}</div>
          </div>
        </div>
      </section>

      <section className="dev-section">
        <h2>Tags</h2>
        <p style={{ marginBottom: '1rem', color: 'var(--nc-text-weak)' }}>
          Colored tags for status indicators and labels
        </p>
        <div className="dev-row" style={{ flexWrap: 'wrap' }}>
          <span className="tag red">Red Tag</span>
          <span className="tag yellow">Yellow Tag</span>
          <span className="tag green">Green Tag</span>
          <span className="tag blue">Blue Tag</span>
          <span className="tag">Default Tag</span>
        </div>
        <div style={{ marginTop: '16px' }}>
          <p style={{ color: 'var(--nc-text-weak)', fontSize: '14px' }}>
            Use cases: status badges, category labels, notification counts
          </p>
        </div>
      </section>

      <section className="dev-section">
        <h2>Theme Colors</h2>
        <p style={{ marginBottom: '1rem', color: 'var(--nc-text-weak)' }}>
          Core color palette available as CSS variables
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
          <ColorSwatch variable="--nc-primary" label="Primary" />
          <ColorSwatch variable="--nc-danger" label="Danger" />
          <ColorSwatch variable="--nc-warning" label="Warning" />
          <ColorSwatch variable="--nc-success" label="Success" />
        </div>
      </section>

      <section className="dev-section">
        <h2>Background Colors</h2>
        <p style={{ marginBottom: '1rem', color: 'var(--nc-text-weak)' }}>
          Layered background colors for creating depth
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
          <ColorSwatch variable="--nc-bg" label="Background" />
          <ColorSwatch variable="--nc-bg-secondary" label="Background Secondary" />
          <ColorSwatch variable="--nc-bg-tertiary" label="Background Tertiary" />
          <ColorSwatch variable="--nc-bg-quaternary" label="Background Quaternary" />
        </div>
      </section>

      <section className="dev-section">
        <h2>UI Element Colors</h2>
        <p style={{ marginBottom: '1rem', color: 'var(--nc-text-weak)' }}>
          Colors for borders, buttons, and interactive elements
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
          <ColorSwatch variable="--nc-border" label="Border" />
          <ColorSwatch variable="--nc-button-bg" label="Button Background" />
          <ColorSwatch variable="--nc-button-border" label="Button Border" />
          <ColorSwatch variable="--nc-button-hover" label="Button Hover" />
        </div>
      </section>

      <section className="dev-section">
        <h2>CSS Variables Reference</h2>
        <p style={{ marginBottom: '1rem', color: 'var(--nc-text-weak)' }}>
          Quick reference for all available CSS variables
        </p>
        <div className="code-block">
{`:root {
  /* Text colors */
  --nc-text: #e8eef6;
  --nc-text-weak: #6b7280;
  --nc-text-weaker: #4b5563;

  /* Theme colors */
  --nc-primary: #3b82f6;
  --nc-danger: #ef4444;
  --nc-warning: #f59e0b;
  --nc-success: #22c55e;

  /* Background colors */
  --nc-bg: #151b23;
  --nc-bg-secondary: #1a2332;
  --nc-bg-tertiary: #232d3d;
  --nc-bg-quaternary: #2c3847;

  /* UI element colors */
  --nc-border: #1f2937;
  --nc-button-bg: #0f1722;
  --nc-button-border: #223042;
  --nc-button-hover: #162332;
}`}
        </div>
      </section>
    </>
  )
}

function ColorSwatch({ variable, label }: { variable: string; label: string }) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px',
      padding: '8px 12px',
      borderRadius: '6px',
      background: 'var(--nc-bg-tertiary)'
    }}>
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          background: `var(${variable})`,
          border: '1px solid var(--nc-border)',
          flexShrink: 0,
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
        <span style={{ fontSize: '13px', fontWeight: 500 }}>{label}</span>
        <code className="code" style={{ fontSize: '11px' }}>{variable}</code>
      </div>
    </div>
  )
}
