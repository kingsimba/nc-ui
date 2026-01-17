import { useState } from 'react';
import { MonthRangePicker } from '../../../src';

export function MonthRangePickerSection() {
    const [startMonth, setStartMonth] = useState('2024-01');
    const [endMonth, setEndMonth] = useState('2024-06');

    const handleRangeChange = (start: string, end: string) => {
        setStartMonth(start);
        setEndMonth(end);
        console.log('Month range changed:', start, end);
    };

    return (
        <section className="dev-section">
            <h2>Month Range Picker</h2>
            <p className="weak">Accepts YY-M(M) (e.g., 19-1, 23-12) or YYYY-M(M) (e.g., 2019-1, 2023-12) format</p>
            <div className="dev-col">
                <MonthRangePicker
                    startMonth={startMonth}
                    endMonth={endMonth}
                    onChange={handleRangeChange}
                    label="Select Period"
                />

                <MonthRangePicker
                    label="Another Range"
                    startMonth="2023-01"
                    endMonth="2023-12"
                    onChange={(start, end) => console.log('Range:', start, end)}
                />

                <MonthRangePicker
                    label="Disabled"
                    startMonth={startMonth}
                    endMonth={endMonth}
                    onChange={handleRangeChange}
                    disabled
                />

                <div className="dev-row" style={{ gap: '16px', marginTop: '16px' }}>
                    <div>
                        <strong>Selected Range:</strong>
                        <p>{startMonth} to {endMonth}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
