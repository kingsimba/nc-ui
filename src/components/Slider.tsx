import React from 'react';

export interface SliderProps {
    /** Current value */
    value: number;
    /** Callback when value changes */
    onChange: (value: number) => void;
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Step increment */
    step?: number;
    /** Label text displayed above the slider */
    label?: string;
    /** Whether the slider is disabled */
    disabled?: boolean;
    /** Whether to show the current value next to the slider */
    showValue?: boolean;
    /** Custom formatter for displaying the value */
    formatValue?: (value: number) => string;
    /** Width of the slider track */
    width?: number | string;
}

export function Slider({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    label,
    disabled,
    showValue = true,
    formatValue = (v) => v.toString(),
    width = 200,
}: SliderProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        onChange(newValue);
    };

    // Calculate percentage for styling the track
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="nc-col" style={{ gap: 6 }}>
            {label && <span className="nc-label">{label}</span>}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <input
                    type="range"
                    className="nc-slider"
                    value={value}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    style={{
                        width,
                        '--nc-slider-percentage': `${percentage}%`,
                    } as React.CSSProperties}
                />
                {showValue && (
                    <span
                        style={{
                            color: 'var(--nc-text)',
                            fontFamily: 'monospace',
                            fontSize: 14,
                            minWidth: 60,
                            textAlign: 'right',
                        }}
                    >
                        {formatValue(value)}
                    </span>
                )}
            </div>
        </div>
    );
}
