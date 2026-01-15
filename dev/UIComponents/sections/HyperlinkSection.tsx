import { Hyperlink } from '../../../src';

export function HyperlinkSection() {
  return (
    <section className="dev-section">
      <h2>Hyperlink</h2>
      <div className="dev-row">
        <Hyperlink onClick={() => alert('Link clicked')}>Click me</Hyperlink>
        <Hyperlink onClick={() => {}} size="small">Small link</Hyperlink>
        <Hyperlink onClick={() => {}} disabled>Disabled link</Hyperlink>
      </div>
    </section>
  );
}
