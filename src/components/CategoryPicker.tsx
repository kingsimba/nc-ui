import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';
import { Input } from './Input';
import { ChevronDownIcon, ChevronRightIcon, SearchIcon } from './icons';
import './VersionPicker.css';

export interface CategoryPickerItem {
    /** Unique value returned on selection. */
    value: string;
    /** Display name; defaults to value. */
    name?: string;
    /** Secondary display text. */
    description?: string;
    /** Second-level items. */
    children?: CategoryPickerItem[];
}

export interface CategoryPickerProps {
    /** Ordered categories and their children. */
    options: CategoryPickerItem[];
    /** Selected value, or null when cleared. */
    value: string | null;
    /** Called when an item is selected or cleared. */
    onChange: (value: string | null) => void;
    /** Allow selecting a category via its all option. */
    allowAllOptions?: boolean;
    /** Text for the category's all option. */
    getAllOptionName?: (category: CategoryPickerItem) => string;
    /** Optional description for the category's all option. */
    getAllOptionDescription?: (category: CategoryPickerItem) => string | undefined;
    /** Optional display label for the category list. */
    getCategoryDisplayName?: (category: CategoryPickerItem) => string;
    /** Show a clear action beside search. */
    clearable?: boolean;
    /** Text for the clear action. */
    clearLabel?: string;
    /** Search input placeholder. */
    searchPlaceholder?: string;
    /** Text when no results are available. */
    emptyText?: string;
    /** Text when the category list is empty. */
    noOptionsText?: string;
    /** Trigger placeholder. */
    placeholder?: string;
    /** Show the category and item in the trigger; defaults to true. */
    showFullPath?: boolean;
    /** Disable interaction. */
    disabled?: boolean;
    /** Trigger size. */
    size?: 'default' | 'small';
    /** Trigger appearance. */
    appearance?: 'default' | 'plain';
    /** Additional trigger wrapper classes. */
    className?: string;
    /** Prevent selection while displaying the supplied status. */
    loading?: boolean;
    /** Error message displayed above the list. */
    error?: string;
    /** Trigger text while loading. */
    loadingText?: string;
    /** Content displayed above search. */
    header?: React.ReactNode;
    /** Icon displayed in the trigger. */
    triggerIcon?: React.ReactNode;
    /** Label shown when loading or an error prevents selection. */
    unavailableText?: string;
    /** Accessible popover width in pixels. */
    popoverWidth?: number;
}

function matchesCategoryItem(item: CategoryPickerItem, query: string): boolean {
    return [item.value, item.name, item.description].some((text) => text?.toLowerCase().includes(query));
}

export function CategoryPicker({
    options, value, onChange, allowAllOptions = false, getAllOptionName = () => 'All',
    getAllOptionDescription, getCategoryDisplayName, clearable = false, clearLabel = 'Clear', searchPlaceholder = 'Search...',
    emptyText = 'No results', noOptionsText = emptyText, placeholder = 'Select category', showFullPath = true, disabled = false, size = 'default',
    appearance = 'default', className = '', loading = false, error, loadingText = 'Loading...',
    header, triggerIcon, unavailableText = 'Unavailable', popoverWidth = 520,
}: CategoryPickerProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeValue, setActiveValue] = useState('');
    const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});
    const query = searchTerm.trim().toLowerCase();
    const selectedCategory = options.find((category) => category.value === value || category.children?.some((item) => item.value === value));
    const selectedItem = selectedCategory?.children?.find((item) => item.value === value);
    const selectedLabel = selectedCategory
        ? selectedItem ? `${showFullPath ? `${selectedCategory.name ?? selectedCategory.value} > ` : ''}${selectedItem.name ?? selectedItem.value}` : selectedCategory.name ?? selectedCategory.value
        : value ?? '';
    const activeCategory = options.find((category) => category.value === activeValue) ?? options[0];

    useEffect(() => {
        if (open && selectedCategory) setActiveValue(selectedCategory.value);
    }, [open, value, options]);

    useEffect(() => {
        if (!open) return;
        const handlePointerDown = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node) && !popoverRef.current?.contains(event.target as Node)) setOpen(false);
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };
        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const updatePosition = () => {
            if (!rootRef.current) return;
            const rect = rootRef.current.getBoundingClientRect();
            const width = Math.min(popoverWidth, window.innerWidth - 24);
            const left = Math.max(12, Math.min(rect.left, window.innerWidth - width - 12));
            const height = popoverRef.current?.getBoundingClientRect().height ?? 0;
            const above = height > 0 && window.innerHeight - rect.bottom - 18 < height && rect.top - 18 > window.innerHeight - rect.bottom - 18;
            setPopoverStyle(above ? { bottom: window.innerHeight - rect.top + 6, left, width } : { top: rect.bottom + 6, left, width });
        };
        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [open, popoverWidth]);

    const select = (nextValue: string | null) => {
        if (disabled || loading || error) return;
        onChange(nextValue);
        setSearchTerm('');
        setOpen(false);
    };
    const renderItem = (item: CategoryPickerItem) => (
        <Button key={item.value} className={`nc-version-picker-option ${item.value === value ? 'nc-version-picker-option-selected' : ''}`}
            variant="ghost" size="small" onClick={() => select(item.value)}>
            <span className="nc-version-picker-option-body">
                <span className="nc-version-picker-option-label">{item.name ?? item.value}</span>
                {item.description && <span className="nc-version-picker-option-description">{item.description}</span>}
            </span>
        </Button>
    );
    const allItem = (category: CategoryPickerItem): CategoryPickerItem => ({
        value: category.value, name: getAllOptionName(category), description: getAllOptionDescription?.(category),
    });
    const results = query ? options.map((category) => ({
        category,
        items: matchesCategoryItem(category, query)
            ? category.children ?? []
            : (category.children ?? []).filter((item) => matchesCategoryItem(item, query)),
        categoryMatches: matchesCategoryItem(category, query),
    })).filter((result) => result.categoryMatches || result.items.length > 0) : [];

    return (
        <div className={`nc-version-picker ${appearance === 'plain' ? 'nc-plain' : ''} ${className}`} ref={rootRef}>
            <Button className={`nc-version-picker-trigger nc-version-picker-trigger-${size} ${open ? 'nc-version-picker-trigger-open' : ''}`}
                variant={appearance === 'plain' ? 'ghost' : 'default'} size={size} disabled={disabled}
                title={error || (value === null ? placeholder : selectedLabel)} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((current) => !current)}>
                <span className={`nc-version-picker-trigger-label ${value !== null ? '' : 'nc-version-picker-trigger-placeholder'}`}>
                    {loading ? loadingText : value === null ? placeholder : selectedLabel}
                </span>
                {triggerIcon}<ChevronDownIcon size={14} />
            </Button>
            {open && createPortal(
                <div ref={popoverRef} className="nc-version-picker-popover" style={popoverStyle}>
                    {error && <div className="nc-version-picker-error" role="alert">{error}</div>}
                    {header}
                    <div className="nc-version-picker-search">
                        <SearchIcon size={15} />
                        <Input value={searchTerm} onChange={setSearchTerm} placeholder={searchPlaceholder} size="small" clearable />
                        {clearable && <Button variant="ghost" size="small" disabled={loading || Boolean(error)} onClick={() => select(null)}>{clearLabel}</Button>}
                    </div>
                    <div className="nc-version-picker-body">
                        {loading || error || options.length === 0 ? <div className="nc-version-picker-empty">{loading ? loadingText : error ? unavailableText : noOptionsText}</div>
                            : query ? <div className="nc-version-picker-results">
                                {results.length === 0 ? <div className="nc-version-picker-empty">{emptyText}</div> : results.map(({ category, items, categoryMatches }) => (
                                    <div key={category.value} className="nc-version-picker-result-group">
                                        <div className="nc-version-picker-result-group-label">{category.name ?? category.value}</div>
                                        <div className="nc-version-picker-option-list">
                                            {allowAllOptions && categoryMatches && renderItem(allItem(category))}
                                            {items.map(renderItem)}
                                        </div>
                                    </div>
                                ))}
                            </div> : <div className="nc-version-picker-browser">
                                <div className="nc-version-picker-group-list">
                                    {options.map((category) => <Button key={category.value}
                                        className={`nc-version-picker-group-button ${category.value === activeCategory?.value ? 'nc-version-picker-group-button-active' : ''}`}
                                        variant="ghost" size="small" onClick={() => setActiveValue(category.value)}>
                                        <span title={category.description}>{getCategoryDisplayName?.(category) ?? category.name ?? category.value}</span><ChevronRightIcon size={13} />
                                    </Button>)}
                                </div>
                                <div className="nc-version-picker-item-list">
                                    {activeCategory && <>
                                        <div className="nc-version-picker-item-list-header">{activeCategory.name ?? activeCategory.value}</div>
                                        <div className="nc-version-picker-option-list">
                                            {allowAllOptions && renderItem(allItem(activeCategory))}
                                            {activeCategory.children?.map(renderItem)}
                                        </div>
                                    </>}
                                </div>
                            </div>}
                    </div>
                </div>, document.body,
            )}
        </div>
    );
}