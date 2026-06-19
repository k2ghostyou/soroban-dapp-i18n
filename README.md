# soroban-dapp-i18n

A TypeScript internationalization toolkit for Stellar/Soroban dApps with translated UI strings, locale-aware amount/date formatting, and RTL support.

## Install

```bash
npm install soroban-dapp-i18n
```

## Usage

### Framework-agnostic i18n

```ts
import { createTranslator } from "soroban-dapp-i18n";

const translator = createTranslator({ locale: "es", fallbackLocale: "en" });
console.log(translator.translate("wallet.connect"));
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

## Locales

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

- `src/` – library sources
- `src/locales/` – translation dictionaries and locale metadata
- `src/formatters/` – locale-aware amount/date formatters
- `src/rtl/` – RTL utilities
- `src/react/` – React provider and hook
- `test/` – unit tests
- `examples/react-demo/` – minimal React demo app

## Example extension

Add additional language packs under `src/locales/` and register them in `src/locales/registry.ts`.
