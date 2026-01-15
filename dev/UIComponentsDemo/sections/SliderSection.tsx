import { useState } from 'react';
import { Slider } from '../../../src';

export function SliderSection() {
  const [sliderValue, setSliderValue] = useState(30);

  return (
    <section className="dev-section">
      <h2>Slider</h2>
      <div className="dev-col">
        <Slider
          value={sliderValue}
          onChange={setSliderValue}
          label="Volume"
        />
        <Slider
          value={sliderValue}
          onChange={setSliderValue}
          min={0}
          max={1}
          step={0.1}
          formatValue={(v) => `${Math.round(v * 100)}%`}
          label="Percentage"
        />
        <Slider
          value={50}
          onChange={() => {}}
          disabled
          label="Disabled"
        />
      </div>
    </section>
  );
}
