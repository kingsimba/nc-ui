import { ActivityIndicator } from '../../../src';

export function ActivityIndicatorSection() {
  return (
    <>
      <section className="dev-section">
        <h2>ActivityIndicator</h2>
        <div className="dev-row">
          <div className="dev-item">
            <ActivityIndicator size="small" />
            <span>Small</span>
          </div>
          <div className="dev-item">
            <ActivityIndicator size="default" />
            <span>Default</span>
          </div>
          <div className="dev-item">
            <ActivityIndicator size="large" />
            <span>Large</span>
          </div>
          <div className="dev-item">
            <ActivityIndicator color="#22c55e" />
            <span>Custom Color</span>
          </div>
        </div>
      </section>

      <section className="dev-section">
        <h2>ActivityIndicator Overlay</h2>
        <div className="dev-overlay-demo">
          <p>This box has an overlay spinner</p>
          <ActivityIndicator overlay />
        </div>
      </section>
    </>
  );
}
