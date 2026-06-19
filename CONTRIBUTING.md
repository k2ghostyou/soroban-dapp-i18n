# Contributing

## Adding a new language pack

1. Add a new JSON dictionary file under `src/locales/`, e.g. `de.json`.
2. Include every translation key present in `src/locales/en.json`.
3. Add the locale to `src/locales/registry.ts` with its
   - `code`
   - `direction`
   - `nativeName`
   - `englishName`
   - `intlTag`
4. No code changes are required beyond registering the locale.
5. Add tests or sample usage if you implement locale-specific formatting.

## Pull request checklist

- [ ] Keep translations consistent with the English source.
- [ ] Use locale metadata that matches the language's writing direction.
- [ ] Validate JSON syntax and run `npm test`.
