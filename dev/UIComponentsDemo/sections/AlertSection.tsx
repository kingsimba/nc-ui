import { useState } from 'react';
import { Alert, Button } from '../../../src';

export function AlertSection() {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <section className="dev-section">
      <h2>Alert</h2>
      {showInfo ? (
        <Alert type="info" onClose={() => setShowInfo(false)}>
          This is an informational message for non-error guidance.
        </Alert>
      ) : (
        <Button size="small" onClick={() => setShowInfo(true)}>
          Restore Info Alert
        </Button>
      )}
      <Alert type="success">
        Your changes have been saved successfully.
      </Alert>
      <Alert
        code={404}
        text="The requested resource could not be found on this server."
        type="error"
        button={{ text: 'Retry' }}
        onAction={() => alert('Retry clicked')}
      />
      <Alert
        code={429}
        text="Rate limit exceeded. Please wait before making more requests."
        type="warning"
        button={{ text: 'Dismiss' }}
        onAction={() => alert('Dismiss clicked')}
      />
      <Alert
        code={500}
        text="Internal server error occurred."
        type="error"
      />
    </section>
  );
}
