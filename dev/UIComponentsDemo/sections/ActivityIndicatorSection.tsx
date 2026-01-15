import { useState } from 'react';
import { ActivityIndicator, Button } from '../../../src';

export function ActivityIndicatorSection() {
  const [showOverlay, setShowOverlay] = useState(false);

  const triggerOverlay = () => {
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 3000);
  };

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
          <Button onClick={triggerOverlay} disabled={showOverlay}>
            {showOverlay ? 'Sending...' : 'Send Request'}
          </Button>
          {showOverlay && <ActivityIndicator overlay />}
        </div>
      </section>
    </>
  );
}
