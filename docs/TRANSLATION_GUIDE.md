# Translation Guide

## Structure

### Global Translations
- **Translation files**: `src/locales/[lang].json` (use `en.json` as reference)
- **Configuration**: `src/i18n.ts`
- **UI selector**: `src/apps/bundles/SettingsApp.tsx`

### App-Specific Translations
Apps can have their own isolated i18n system:
- **Factory**: `src/apps/appI18nFactory.ts` - Creates isolated i18n instances
- **App translations**: `src/apps/bundles/AppName/i18n.ts` - Pure resources with 2+ languages
- **Provider**: Wrap app with `I18nextProvider` in `AppName.tsx`
- **Keys**: Use flat keys (no prefix), auto-syncs with global language

Example: [Package Updater App](../src/apps/bundles/PackageUpdater/i18n.ts)

## Adding a New Language

1. **Create file**: Copy `src/locales/en.json` to `src/locales/[lang].json`

2. **Register in `i18n.ts`**:
```typescript
import fr from './locales/fr.json';
// Add to resources: fr: { translation: fr }
```

3. **Update `SettingsApp.tsx`**:
   - Add to `languageOptions`: `{ label: 'Français', value: 'fr' }`
   - Add to language detection logic: `i18n.language.startsWith('fr') ? 'fr' : ...`

4. **Test**: Settings App → General → Language dropdown

## Rules

- Keep all JSON keys in English
- Preserve `{{variable}}` placeholders
- All translation files must have identical structure
- `en.json` is the source of truth
- Commit all language files together

## Migrating Global Translations to App-Specific

Automated migration tool handles extraction, validation, and cleanup. Only manual step: wrap app with I18nextProvider.

### Step 1: Run Automated Migration Tool

From the project root, run:

```bash
python cleanup_app_i18n.py src/apps/bundles/YourApp
```

The tool will:
1. ✅ Auto-detect the translation prefix from `t()` calls in the app folder
2. ✅ Load all 5 global translation files (en, zh, de, es, th)
3. ✅ Extract matching translation sections
4. ✅ Validate consistency across all languages
5. ✅ Generate `YourApp/i18n.ts` with cleaned keys
6. ✅ Remove prefixes from all TypeScript files
7. ✅ Delete sections from global locale files (with automatic backups)

**Optional flags:**
- `--dry-run` - Preview changes without modifying files
- `--prefix <prefix>` - Override auto-detected prefix (if detection fails)
- `--app-name <name>` - Override inferred app name (auto-converts kebab-case to PascalCase)

**Example with preview:**
```bash
python cleanup_app_i18n.py src/apps/bundles/VideoPlayer --dry-run
```

### Step 2: Wrap App with I18nextProvider (MANUAL)

The tool creates `i18n.ts` but you must wrap the app component. Update `src/apps/bundles/YourApp/YourApp.tsx`:

```typescript
import { I18nextProvider } from 'react-i18next';
import { yourAppI18n } from './i18n';

export function YourApp() {
  return (
    <I18nextProvider i18n={yourAppI18n}>
      {/* Your app components */}
    </I18nextProvider>
  );
}
```

### Step 3: Add App Metadata to Global i18n (MANUAL)

Add `name` and `shortDescription` for your app to the **global** locale files (`src/locales/*.json`). Use the app's kebab-case id as the key:

In `src/locales/en.json`:
```json
{
  "apps": {
    "your-app": {
      "name": "Your App Name",
      "shortDescription": "Brief description of what your app does."
    }
  }
}
```

Then update `src/apps/builtins.ts` to use this titleKey:

```typescript
appRegistry.register({
  id: 'your-app',
  titleKey: 'apps.your-app.name',
  icon: YourAppIcon,
  component: YourApp,
  // ... other properties
});
```

**Note:** The app-specific `i18n.ts` file is only for internal app translations (used via `I18nextProvider`). The app launcher uses global i18n for displaying app names and descriptions.

**Important Notes:**
- App titles are stored in global i18n files under `apps.{app-id}.name` and `apps.{app-id}.shortDescription`
- App-specific `i18n.ts` files handle internal translations only (via `I18nextProvider`)
- Use `git` to track changes. The tool overwrites global locale files directly.
- If validation fails, the tool will show which languages have mismatched keys
