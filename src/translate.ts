import type { LocaleCode, I18nConfig, TranslationDictionary } from "./types";
import { LOCALE_METADATA } from "./locales/registry";
import en from "./locales/en.json";

const dictionaries: Record<LocaleCode, TranslationDictionary> = {
  en,
  es: require("./locales/es.json") as TranslationDictionary,
  pt: require("./locales/pt.json") as TranslationDictionary,
  fr: {},
  ar: {},
  yo: {},
  sw: {}
};

function getValueFromPath(dictionary: TranslationDictionary, path: string[]): string | undefined {
  return path.reduce<string | undefined>((current, key) => {
    if (current && typeof current !== "object") return undefined;
    return (current as any)[key];
  }, dictionary as any);
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{([^}]+)\}/g, (_, token) => {
    const value = params[token.trim()];
    return value !== undefined ? String(value) : `{${token}}`;
  });
}

export function createTranslator(config: I18nConfig) {
  const locale = config.locale;
  const fallback = config.fallbackLocale ?? "en";

  function translate(key: string, params?: Record<string, string | number>): string {
    const path = key.split(".");
    const localeDict = dictionaries[locale] || dictionaries[ fallback ];
    let value = getValueFromPath(localeDict, path);

    if (value === undefined) {
      const fallbackDict = dictionaries[fallback] || dictionaries.en;
      value = getValueFromPath(fallbackDict, path);
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(`Missing translation key '${key}' for locale '${locale}', falling back to '${fallback}'`);
      }
    }

    if (value === undefined) {
      return key;
    }

    return interpolate(value, params);
  }

  function availableLocales(): LocaleCode[] {
    return Object.keys(LOCALE_METADATA) as LocaleCode[];
  }

  return {
    locale,
    fallbackLocale: fallback,
    translate,
    availableLocales,
    localeMeta: LOCALE_METADATA[locale] ?? LOCALE_METADATA.en
  };
}
