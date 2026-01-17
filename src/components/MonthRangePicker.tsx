import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';

export interface MonthRangePickerProps {
    /** Start month value in YY-M, YY-MM, YYYY-M, or YYYY-MM format */
    startMonth?: string;
    /** End month value in YY-M, YY-MM, YYYY-M, or YYYY-MM format */
    endMonth?: string;
    /** Callback when the range changes */
    onChange?: (startMonth: string, endMonth: string) => void;
    /** Label text displayed above the picker */
    label?: string;
    /** Additional CSS class names */
    className?: string;
    /** Whether the picker is disabled */
    disabled?: boolean;
}

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function validateMonthFormat(value: string): string | null {
    if (!value) return null;
    // Accept YY-M, YY-MM (19-1, 19-12) or YYYY-M, YYYY-MM (2019-1, 2019-12)
    const shortFormat = /^\d{2}-\d{1,2}$/;
    const longFormat = /^\d{4}-\d{1,2}$/;

    if (!shortFormat.test(value) && !longFormat.test(value)) {
        return 'Format must be YY-M(M) or YYYY-M(M)';
    }

    const parts = value.split('-');
    const month = parseInt(parts[1], 10);

    if (month < 1 || month > 12) {
        return 'Month must be between 1 and 12';
    }

    return null;
}

function normalizeMonth(value: string): string {
    if (!value) return '';

    const parts = value.split('-');
    if (parts.length !== 2) return value;

    let year = parts[0];
    const month = parts[1].padStart(2, '0');

    // Convert YY to YYYY
    if (year.length === 2) {
        const yearNum = parseInt(year, 10);
        year = String(yearNum < 50 ? 2000 + yearNum : 1900 + yearNum);
    }

    return `${year}-${month}`;
}

function formatMonthDisplay(monthStr: string): string {
    if (!monthStr) return '';
    const normalized = normalizeMonth(monthStr);
    if (!/^\d{4}-\d{2}$/.test(normalized)) return monthStr;
    const [year, month] = normalized.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    return `${MONTHS[monthIndex]} ${year}`;
}

function getCurrentYearMonth(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
}

export function MonthRangePicker({
    startMonth,
    endMonth,
    onChange,
    label,
    className = '',
    disabled = false,
}: MonthRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [tempStartMonth, setTempStartMonth] = useState('');
    const [tempEndMonth, setTempEndMonth] = useState('');
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const anchorRef = useRef<HTMLButtonElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + 4,
                left: rect.left,
                width: rect.width,
            });
        }
    }, [isOpen]);

    // Close on outside click
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (
                anchorRef.current &&
                !anchorRef.current.contains(e.target as Node) &&
                popupRef.current &&
                !popupRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleOpen = () => {
        setTempStartMonth(startMonth || getCurrentYearMonth());
        setTempEndMonth(endMonth || getCurrentYearMonth());
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleApply = () => {
        const startError = validateMonthFormat(tempStartMonth);
        const endError = validateMonthFormat(tempEndMonth);

        if (startError || endError) {
            return;
        }

        const normalizedStart = normalizeMonth(tempStartMonth);
        const normalizedEnd = normalizeMonth(tempEndMonth);

        if (normalizedStart && normalizedEnd) {
            onChange?.(normalizedStart, normalizedEnd);
        }
        setIsOpen(false);
    };

    const displayValue = startMonth && endMonth
        ? `${formatMonthDisplay(startMonth)} - ${formatMonthDisplay(endMonth)}`
        : 'Select month range';

    // Validation
    const startError = validateMonthFormat(tempStartMonth);
    const endError = validateMonthFormat(tempEndMonth);
    const normalizedStart = normalizeMonth(tempStartMonth);
    const normalizedEnd = normalizeMonth(tempEndMonth);
    const isInvalidRange = normalizedStart && normalizedEnd && normalizedStart > normalizedEnd;

    const popup = isOpen ? createPortal(
        <div
            ref={popupRef}
            className="nc-month-range-picker-popup"
            style={{
                position: 'fixed',
                top: position.top,
                left: position.left,
                width: Math.max(position.width, 400),
                zIndex: 1000,
            }}
        >
            <div className="nc-month-range-picker-content">
                <div className="nc-month-range-picker-row">
                    <div className="nc-month-range-picker-column">
                        <label className="nc-label">Start Month</label>
                        <input
                            type="text"
                            className={`nc-month-input ${startError ? 'nc-error' : ''}`}
                            value={tempStartMonth}
                            onChange={(e) => setTempStartMonth(e.target.value)}
                            placeholder="YY-M(M) or YYYY-M(M)"
                        />
                        {startError && <div className="nc-month-error-text">{startError}</div>}
                    </div>
                    <div className="nc-month-range-picker-column">
                        <label className="nc-label">End Month</label>
                        <input
                            type="text"
                            className={`nc-month-input ${endError ? 'nc-error' : ''}`}
                            value={tempEndMonth}
                            onChange={(e) => setTempEndMonth(e.target.value)}
                            placeholder="YY-M(M) or YYYY-M(M)"
                        />
                        {endError && <div className="nc-month-error-text">{endError}</div>}
                    </div>
                </div>

                {isInvalidRange && !startError && !endError && (
                    <div className="nc-month-range-error">
                        End month must be after or equal to start month
                    </div>
                )}

                <div className="nc-month-range-picker-footer">
                    <Button
                        variant="primary"
                        onClick={handleApply}
                        disabled={!tempStartMonth || !tempEndMonth || !!startError || !!endError || !!isInvalidRange}
                    >
                        Apply
                    </Button>
                    <Button variant="ghost" onClick={handleClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    ) : null;

    return (
        <div className={`nc-month-range-picker ${className}`}>
            {label && <label className="nc-label">{label}</label>}
            <button
                ref={anchorRef}
                className="nc-month-range-picker-input"
                onClick={handleOpen}
                disabled={disabled}
            >
                {displayValue}
            </button>
            {popup}
        </div>
    );
}
