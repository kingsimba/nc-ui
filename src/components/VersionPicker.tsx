import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { CategoryPicker } from './CategoryPicker';
import { RefreshIcon, WarningIcon } from './icons';

/** `1.2.3`, `v1.2.3`, `1.2.x`, and pre-releases such as `1.2.3-rc1` or `1.2.3_alpha.2`. */
const RELEASE_PATTERN = /^[vV]?(\d+)\.(\d+)\.(\d+|x)(?:[-._]([0-9A-Za-z._-]+))?$/;
/** A line of dashes only separates refs in a GitLab ref list and carries no value. */
const SEPARATOR_PATTERN = /^-+$/;
const BRANCHES_GROUP_KEY = '__branches__';
const UNRELEASED_GROUP_KEY = '__unreleased__';

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
    const groups = useMemo(
        () =>
            buildGroups(options, {
                branches: t('versionPicker.branches'),
                unreleased: t('versionPicker.unreleased'),
            }),
        [options, t],
    );
    const categories = useMemo(
        () =>
            groups.map((group) => ({
                value: group.key,
                name: group.label,
                children: group.items.map((item) => ({
                    value: item.value,
                    name: item.label,
                    description: item.description,
                })),
            })),
        [groups],
    );

    return (
        <CategoryPicker
            options={categories}
            showFullPath={false}
            getCategoryDisplayName={(category) => `${category.name ?? category.value}${(category.value === BRANCHES_GROUP_KEY ? truncated?.branches : truncated?.tags)
                ? ` (${t('versionPicker.incomplete')})` : ''
                }`}
            value={value || null}
            onChange={(nextValue) => {
                if (nextValue !== null) onChange(nextValue);
            }}
            disabled={disabled}
            size={size}
            placeholder={placeholder}
            className={className}
            appearance={appearance}
            loading={loading}
            error={error}
            loadingText={t('versionPicker.loading')}
            unavailableText={t('versionPicker.unavailable')}
            emptyText={t('versionPicker.noMatches')}
            noOptionsText={t(pickerMode === 'refs' ? 'versionPicker.noRefs' : 'versionPicker.noVersions')}
            searchPlaceholder={t(
                pickerMode === 'refs'
                    ? 'versionPicker.searchRefs'
                    : 'versionPicker.searchVersions',
            )}
            triggerIcon={error ? <WarningIcon size={14} /> : undefined}
            popoverWidth={340}
            header={
                <>
                    {onRefresh && (
                        <div className="nc-version-picker-ref-header">
                            <span>
                                {t(
                                    pickerMode === 'refs'
                                        ? 'versionPicker.refsHeader'
                                        : 'versionPicker.versionsHeader',
                                )}
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
                </>
            }
        />
    );
}
