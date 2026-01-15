import { Alert } from '../../../src';

export function AlertSection() {
  return (
    <section className="dev-section">
      <h2>Alert</h2>
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
