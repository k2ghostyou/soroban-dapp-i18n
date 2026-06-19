# soroban-dapp-i18n

A TypeScript internationalization toolkit for Stellar/Soroban dApps with translated UI strings, locale-aware amount/date formatting, and RTL support.

## Install

```bash
npm install soroban-dapp-i18n
```

## Usage

### Framework-agnostic API

```ts
import { createTranslator } from "soroban-dapp-i18n";

const translator = createTranslator({ locale: "es", fallbackLocale: "en" });
console.log(translator.translate("wallet.connect"));
```

### Locale-aware amount and date formatting

```ts
import { formatAmount } from "soroban-dapp-i18n";
import { formatDate } from "soroban-dapp-i18n";

console.log(formatAmount(123450000n, { locale: "pt-BR", decimals: 7, assetCode: "XLM" }));
console.log(formatDate(new Date(), { locale: "fr-FR", style: "long" }));
```

### React support

```tsx
import { I18nProvider, useI18n } from "soroban-dapp-i18n";

function App() {
  return (
    <I18nProvider locale="en" fallbackLocale="en">
      <Page />
    </I18nProvider>
  );
}

function Page() {
  const { translate } = useI18n();
  return <div>{translate("wallet.title")}</div>;
}
```

## Supported locales

| Code | Native name | English name | Direction |
|------|-------------|--------------|-----------|
| en   | English     | English      | ltr       |
| es   | Español     | Spanish      | ltr       |
| pt   | Português   | Portuguese   | ltr       |
| fr   | Français    | French       | ltr       |
| ar   | العربية     | Arabic       | rtl       |
| yo   | Yorùbá      | Yoruba       | ltr       |
| sw   | Kiswahili   | Swahili      | ltr       |

## Project structure

- `src/types.ts` – core locale and format type definitions
- `src/locales/registry.ts` – locale metadata for direction, native names, and Intl tags
- `src/locales/*.json` – translation dictionaries
- `src/translate.ts` – translation engine with interpolation and fallback handling
- `src/formatters/amount.ts` – locale-aware amount formatting and parsing
- `src/formatters/date.ts` – locale-aware date formatting and relative time strings
- `src/rtl/rtl.ts` – RTL helpers for direction and icon mirroring
- `src/react/I18nProvider.tsx` – React provider and `useI18n` hook
- `test/` – unit tests
- `examples/react-demo/` – React demo app

## Example extension

To add a new language pack:

1. Add a JSON dictionary file under `src/locales/`.
2. Register the new locale in `src/locales/registry.ts`.
3. Update `src/index.ts` exports if additional API surface is required.

## Example demo

The React demo is located at `examples/react-demo/` and demonstrates a locale switcher with RTL-aware rendering.
