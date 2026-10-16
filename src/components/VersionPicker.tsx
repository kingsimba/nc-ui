import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { Input } from './Input';
import {
    ChevronDownIcon,
    ChevronRightIcon,
    RefreshIcon,
    SearchIcon,
    WarningIcon,
} from './icons';
import './VersionPicker.css';

/** `1.2.3`, `v1.2.3`, `1.2.x`, and pre-releases such as `1.2.3-rc1` or `1.2.3_alpha.2`. */
const RELEASE_PATTERN = /^[vV]?(\d+)\.(\d+)\.(\d+|x)(?:[-._]([0-9A-Za-z._-]+))?$/;
/** A line of dashes only separates refs in a GitLab ref list and carries no value. */
const SEPARATOR_PATTERN = /^-+$/;
const BRANCHES_GROUP_KEY = '__branches__';
const UNRELEASED_GROUP_KEY = '__unreleased__';
/** Popover placement; the height itself lives in VersionPicker.css. */
const POPOVER_WIDTH = 340;
const POPOVER_GAP = 6;
const POPOVER_EDGE_MARGIN = 12;

export interface VersionPickerOption {
    /** Value passed to `onChange` when the option is picked */
    value: string;
    /** Primary text shown in the option row and on the trigger */
    label: string;
    /** Secondary line shown under the label and appended to the trigger tooltip */
    description?: string;
    /**
     * `branch` puts the option into the Branches group. Every other kind is
     * grouped by the release series taken from `value`, falling back to `label`.
     */
    kind?: 'branch' | 'version';
}

export interface VersionPickerProps {
    /** Full option list; the component groups and sorts it by release series */
    options: VersionPickerOption[];
    /** Currently selected value */
    value: string;
    /** Called with the picked option value */
    onChange: (value: string) => void;
    /** Whether the picker is disabled */
    disabled?: boolean;
    /** Size variant of the trigger */
    size?: 'default' | 'small';
    /** Text shown on the trigger while no value is selected */
    placeholder?: string;
    /** Additional CSS class names for the trigger wrapper */
    className?: string;
    /**
     * `default` draws the trigger as a bordered field. `plain` drops the frame
     * until hover and turns it into a field only while the list is open, for use
     * inline in a toolbar or list row.
     */
    appearance?: 'default' | 'plain';
    /** Renders the trigger as busy and the popover as loading */
    loading?: boolean;
    /** Message shown in the popover; while set, options cannot be picked */
    error?: string;
    /** Marks a group whose source list was cut short; its header then reads as incomplete */
    truncated?: { branches?: boolean; tags?: boolean };
    /** Shows a refresh action in the popover header */
    onRefresh?: () => void;
    /** `refs` labels the list as GitLab branches/tags; `versions` is for other sources. Defaults to `refs` when `onRefresh` is given. */
    mode?: 'refs' | 'versions';
}

interface VersionGroup {
    key: string;
    label: string;
    items: VersionPickerOption[];
}

function getSeries(text: string): string | null {
    const match = text.trim().match(RELEASE_PATTERN);
    return match ? `${match[1]}.${match[2]}` : null;
}

function compareSeriesDescending(a: string, b: string): number {
    const [aMajor, aMinor] = a.split('.').map(Number);
    const [bMajor, bMinor] = b.split('.').map(Number);
    return bMajor - aMajor || bMinor - aMinor;
}

// A release without a pre-release suffix outranks any of its pre-releases, so
// `1.2.0` sorts above `1.2.0-rc9`, and suffixes compare numerically so
// `rc10` sorts above `rc9`.
function comparePreRelease(a: string | undefined, b: string | undefined): number {
    if (a === undefined) return b === undefined ? 0 : 1;
    if (b === undefined) return -1;
    return a.localeCompare(b, 'en', { numeric: true });
}

// `x` stands for any patch and outranks a concrete number, so `2.15.x` sorts
// above `2.15.0`, exactly like the version list of a compare page.
function patchRank(patch: string): number {
    return patch.toLowerCase() === 'x' ? Number.POSITIVE_INFINITY : Number(patch);
}

function compareVersionsAscending(a: string, b: string): number {
    const left = a.trim().match(RELEASE_PATTERN);
    const right = b.trim().match(RELEASE_PATTERN);
    if (!left || !right) return 0;
    const leftPatch = patchRank(left[3]);
    const rightPatch = patchRank(right[3]);
    const patchOrder = leftPatch === rightPatch ? 0 : leftPatch < rightPatch ? -1 : 1;
    return (
        Number(left[1]) - Number(right[1]) ||
        Number(left[2]) - Number(right[2]) ||
        patchOrder ||
        comparePreRelease(left[4], right[4])
    );
}

function buildGroups(
    options: VersionPickerOption[],
    labels: { branches: string; unreleased: string },
): VersionGroup[] {
    const released: VersionGroup[] = [];
    const byKey = new Map<string, VersionGroup>();
    const branches: VersionGroup = { key: BRANCHES_GROUP_KEY, label: labels.branches, items: [] };
    const unreleased: VersionGroup = {
        key: UNRELEASED_GROUP_KEY,
        label: labels.unreleased,
        items: [],
    };

    for (const option of options) {
        const value = option.value.trim();
        if (!value || SEPARATOR_PATTERN.test(value)) continue;

        if (option.kind === 'branch') {
            branches.items.push(option);
            continue;
        }

        const series = getSeries(value) ?? getSeries(option.label);
        if (!series) {
            unreleased.items.push(option);
            continue;
        }

        let group = byKey.get(series);
        if (!group) {
            group = { key: series, label: series, items: [] };
            byKey.set(series, group);
            released.push(group);
        }
        group.items.push(option);
    }

    // master first, then the remaining branches by descending name
    branches.items.sort((first, second) => {
        if (first.value === second.value) return 0;
        if (first.value === 'master') return -1;
        if (second.value === 'master') return 1;
        return second.value.localeCompare(first.value, 'en', { numeric: true });
    });

    // newest series first, newest release first inside a series
    released.sort((a, b) => compareSeriesDescending(a.key, b.key));
    for (const group of released) {
        group.items.sort((first, second) => -compareVersionsAscending(first.value, second.value));
    }

    return [
        ...(branches.items.length ? [branches] : []),
        ...(unreleased.items.length ? [unreleased] : []),
        ...released,
    ];
}

function matchesQuery(option: VersionPickerOption, query: string): boolean {
    return (
        option.label.toLowerCase().includes(query) ||
        option.value.toLowerCase().includes(query) ||
        (option.description?.toLowerCase().includes(query) ?? false)
    );
}

export function VersionPicker({
    options,
    value,
    onChange,
    disabled = false,
    size = 'small',
    placeholder = 'Select version',
    className = '',
    appearance = 'default',
    loading = false,
    error,
    truncated,
    onRefresh,
    mode,
}: VersionPickerProps) {
    const { t } = useTranslation();
    const pickerMode = mode ?? (onRefresh ? 'refs' : 'versions');
    const rootRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeGroupKey, setActiveGroupKey] = useState('');
    const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});

    // derive groups, selection and search hits
    const groups = useMemo(
        () =>
            buildGroups(options, {
                branches: t('versionPicker.branches'),
                unreleased: t('versionPicker.unreleased'),
            }),
        [options, t],
    );

    const query = searchTerm.trim().toLowerCase();
    const selectedOption = useMemo(
        () => options.find((option) => option.value === value),
        [options, value],
    );
    const activeGroup = useMemo(
        () => groups.find((group) => group.key === activeGroupKey) ?? groups[0],
        [groups, activeGroupKey],
    );
    const searchResults = useMemo(() => {
        if (!query) return [];
        return groups
            .map((group) => ({
                group,
                items: group.items.filter((item) => matchesQuery(item, query)),
            }))
            .filter((entry) => entry.items.length > 0);
    }, [groups, query]);

    // keep the active group pointing at an existing group
    useEffect(() => {
        if (groups.length === 0) {
            setActiveGroupKey('');
            return;
        }

        setActiveGroupKey((current) =>
            groups.some((group) => group.key === current) ? current : groups[0].key,
        );
    }, [groups]);

    // dismiss on outside press or escape
    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (event: MouseEvent) => {
            if (
                !rootRef.current?.contains(event.target as Node) &&
                !popoverRef.current?.contains(event.target as Node)
            ) {
                setOpen(false);
            }
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

    // follow the trigger, flipping above it when the space below runs out
    useEffect(() => {
        if (!open) return;

        const updatePosition = () => {
            if (!rootRef.current) return;
            const rect = rootRef.current.getBoundingClientRect();
            const width = Math.min(POPOVER_WIDTH, window.innerWidth - POPOVER_EDGE_MARGIN * 2);
            const left = Math.max(
                POPOVER_EDGE_MARGIN,
                Math.min(rect.left, window.innerWidth - width - POPOVER_EDGE_MARGIN),
            );
            // The popover keeps the height its own CSS sets, so read it back
            // rather than guessing; a box that is not measured yet stays below.
            const height = popoverRef.current?.getBoundingClientRect().height ?? 0;
            const gap = POPOVER_GAP + POPOVER_EDGE_MARGIN;
            const spaceBelow = window.innerHeight - rect.bottom - gap;
            const spaceAbove = rect.top - gap;
            const openUpward = height > 0 && spaceBelow < height && spaceAbove > spaceBelow;

            setPopoverStyle(
                openUpward
                    ? { bottom: window.innerHeight - rect.top + POPOVER_GAP, left, width }
                    : { top: rect.bottom + POPOVER_GAP, left, width },
            );
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [open]);

    // open on the group holding the current value
    useEffect(() => {
        if (!open || !value) return;
        const group = groups.find((item) => item.items.some((option) => option.value === value));
        if (group) setActiveGroupKey(group.key);
    }, [groups, open, value]);

    const triggerLabel = selectedOption?.label ?? value;
    const triggerTitle = selectedOption?.description
        ? `${triggerLabel} — ${selectedOption.description}`
        : triggerLabel;

    const handleSelect = (option: VersionPickerOption) => {
        if (disabled || loading || error) return;
        onChange(option.value);
        setSearchTerm('');
        setOpen(false);
    };

    const renderOption = (option: VersionPickerOption) => (
        <Button
            key={option.value}
            className={`nc-version-picker-option ${option.value === value ? 'nc-version-picker-option-selected' : ''
                }`}
            variant="ghost"
            size="small"
            disabled={disabled || loading || Boolean(error)}
            onClick={() => handleSelect(option)}
        >
            <span className="nc-version-picker-option-body">
                <span className="nc-version-picker-option-label">{option.label}</span>
                {option.description && (
                    <span className="nc-version-picker-option-description">{option.description}</span>
                )}
            </span>
        </Button>
    );

    return (
        <div
            className={`nc-version-picker ${appearance === 'plain' ? 'nc-plain' : ''} ${className}`}
            ref={rootRef}
        >
            <Button
                className={`nc-version-picker-trigger ${size === 'small'
                    ? 'nc-version-picker-trigger-small'
                    : 'nc-version-picker-trigger-default'
                    } ${open ? 'nc-version-picker-trigger-open' : ''}`}
                variant={appearance === 'plain' ? 'ghost' : 'default'}
                size={size}
                disabled={disabled}
                title={error || triggerTitle || placeholder}
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((current) => !current)}
            >
                <span
                    className={`nc-version-picker-trigger-label ${triggerLabel ? '' : 'nc-version-picker-trigger-placeholder'
                        }`}
                >
                    {loading ? t('versionPicker.loading') : triggerLabel || placeholder}
                </span>
                {error && <WarningIcon size={14} />}
                <ChevronDownIcon size={14} />
            </Button>

            {open &&
                createPortal(
                    <div ref={popoverRef} className="nc-version-picker-popover" style={popoverStyle}>
                        {error && <div className="nc-version-picker-error" role="alert">{error}</div>}
                        {onRefresh && (
                            <div className="nc-version-picker-ref-header">
                                <span>
                                    {pickerMode === 'refs'
                                        ? t('versionPicker.refsHeader')
                                        : t('versionPicker.versionsHeader')}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="small"
                                    title={t('versionPicker.refresh')}
                                    aria-label={t('versionPicker.refresh')}
                                    disabled={loading}
                                    onClick={onRefresh}
                                >
                                    <RefreshIcon size={15} />
                                </Button>
                            </div>
                        )}
                        {truncated?.branches && (
                            <div className="nc-version-picker-notice">
                                {t('versionPicker.branchesIncomplete')}
                            </div>
                        )}
                        {truncated?.tags && (
                            <div className="nc-version-picker-notice">{t('versionPicker.tagsIncomplete')}</div>
                        )}
                        <div className="nc-version-picker-search">
                            <SearchIcon size={15} />
                            <Input
                                value={searchTerm}
                                onChange={setSearchTerm}
                                placeholder={
                                    pickerMode === 'refs'
                                        ? t('versionPicker.searchRefs')
                                        : t('versionPicker.searchVersions')
                                }
                                size="small"
                                clearable
                            />
                        </div>

                        <div className="nc-version-picker-body">
                            {loading || error || groups.length === 0 ? (
                                <div className="nc-version-picker-empty">
                                    {loading
                                        ? t('versionPicker.loading')
                                        : error
                                            ? t('versionPicker.unavailable')
                                            : pickerMode === 'refs'
                                                ? t('versionPicker.noRefs')
                                                : t('versionPicker.noVersions')}
                                </div>
                            ) : query ? (
                                <div className="nc-version-picker-results">
                                    {searchResults.length === 0 ? (
                                        <div className="nc-version-picker-empty">{t('versionPicker.noMatches')}</div>
                                    ) : (
                                        searchResults.map(({ group, items }) => (
                                            <div key={group.key} className="nc-version-picker-result-group">
                                                <div className="nc-version-picker-result-group-label">{group.label}</div>
                                                <div className="nc-version-picker-option-list">{items.map(renderOption)}</div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            ) : (
                                <div className="nc-version-picker-browser">
                                    <div className="nc-version-picker-group-list">
                                        {groups.map((group) => (
                                            <Button
                                                key={group.key}
                                                className={`nc-version-picker-group-button ${group.key === activeGroup?.key
                                                    ? 'nc-version-picker-group-button-active'
                                                    : ''
                                                    }`}
                                                variant="ghost"
                                                size="small"
                                                onClick={() => setActiveGroupKey(group.key)}
                                            >
                                                <span>
                                                    {group.label}
                                                    {(group.key === BRANCHES_GROUP_KEY
                                                        ? truncated?.branches
                                                        : truncated?.tags)
                                                        ? ` (${t('versionPicker.incomplete')})`
                                                        : ''}
                                                </span>
                                                <ChevronRightIcon size={13} />
                                            </Button>
                                        ))}
                                    </div>

                                    <div className="nc-version-picker-item-list">
                                        {activeGroup && (
                                            <>
                                                <div className="nc-version-picker-item-list-header">{activeGroup.label}</div>
                                                <div className="nc-version-picker-option-list">
                                                    {activeGroup.items.map(renderOption)}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>,
                    document.body,
                )}
        </div>
    );
}
