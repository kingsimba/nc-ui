import { useState } from 'react';
import { VersionPicker, type VersionPickerOption } from '../../../src';

const refOptions: VersionPickerOption[] = [
    { value: 'master', label: 'master', kind: 'branch' },
    { value: 'release/2.15', label: 'release/2.15', kind: 'branch' },
    { value: 'feature/version-picker', label: 'feature/version-picker', kind: 'branch' },
    { value: '2.15.x', label: '2.15.x', description: 'Latest 2.15 build' },
    { value: '2.15.2', label: '2.15.2', description: '2026-08-13 14:02' },
    { value: '2.15.1', label: '2.15.1', description: '2026-08-04 09:31' },
    { value: '2.15.0-rc2', label: '2.15.0-rc2' },
    { value: '2.15.0-rc1', label: '2.15.0-rc1' },
    { value: '2.14.3', label: '2.14.3' },
    { value: '2.14.2', label: '2.14.2' },
    { value: '1.9.7', label: '1.9.7' },
    { value: 'nightly-2026-08-14', label: 'nightly-2026-08-14', description: 'Unreleased build' },
];

const packageOptions: VersionPickerOption[] = [
    { value: '4.0.0', label: '4.0.0', description: 'stable' },
    { value: '4.0.0-beta.3', label: '4.0.0-beta.3' },
    { value: '3.12.1', label: '3.12.1', description: 'stable' },
    { value: '3.11.0', label: '3.11.0' },
];

export function VersionPickerSection() {
    const [ref, setRef] = useState('2.15.2');
    const [pkg, setPkg] = useState('');
    const [unavailable, setUnavailable] = useState('2.15.1');

    return (
        <section className="dev-section">
            <h2>VersionPicker</h2>
            <p className="weak">
                Grouped version and branch picker: releases are grouped by series, sorted newest first, and
                searchable.
            </p>

            <div className="dev-col">
                <h3>Refs (branches and tags)</h3>
                <VersionPicker
                    options={refOptions}
                    value={ref}
                    onChange={setRef}
                    onRefresh={() => console.log('refresh refs')}
                    truncated={{ branches: true }}
                    placeholder="Select ref"
                />

                <h3>Versions</h3>
                <VersionPicker
                    options={packageOptions}
                    value={pkg}
                    onChange={setPkg}
                    mode="versions"
                    size="default"
                    placeholder="Select version"
                />

                <h3>Plain appearance</h3>
                <VersionPicker
                    options={refOptions}
                    value={ref}
                    onChange={setRef}
                    onRefresh={() => console.log('refresh refs')}
                    appearance="plain"
                />

                <h3>Loading, error, and disabled</h3>
                <VersionPicker options={refOptions} value={ref} onChange={setRef} loading />
                <VersionPicker
                    options={[]}
                    value={unavailable}
                    onChange={setUnavailable}
                    error="Could not reach the repository"
                />
                <VersionPicker options={refOptions} value={ref} onChange={setRef} disabled />
            </div>
        </section>
    );
}
