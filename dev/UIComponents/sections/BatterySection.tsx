import { Battery } from '../../../src';

export function BatterySection() {
  // Get theme from document class for monochrome examples
  const theme = document.documentElement.classList.contains('light') ? 'light' : 'dark';

  return (
    <section className="dev-section">
      <h2>Battery</h2>
      <div className="dev-row">
        <div className="dev-item">
          <Battery percentage={0.05} colored />
          <span>5% (danger)</span>
        </div>
        <div className="dev-item">
          <Battery percentage={0.15} colored />
          <span>15% (warning)</span>
        </div>
        <div className="dev-item">
          <Battery percentage={0.75} colored />
          <span>75% (success)</span>
        </div>
        <div className="dev-item">
          <Battery percentage={1} colored />
          <span>100% (full)</span>
        </div>
        <div className="dev-item">
          <Battery percentage={0.6} status="charging" colored />
          <span>Charging</span>
        </div>
      </div>
      <h3>Monochrome</h3>
      <div className="dev-row">
        <Battery percentage={0.5} darkMode={theme === 'dark'} />
        <Battery percentage={0.25} darkMode={theme === 'dark'} />
        <Battery percentage={0} darkMode={theme === 'dark'} />
      </div>
    </section>
  );
}
