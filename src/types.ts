export type LocaleCode =
  | "en"
  | "es"
  | "pt"
  | "fr"
  | "ar"
  | "yo"
  | "sw";

export interface LocaleMeta {
  code: LocaleCode;
  direction: "ltr" | "rtl";
  nativeName: string;
  englishName: string;
  intlTag: string;
}

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

export interface FormatAmountOptions {
  locale?: string;
  decimals?: number;
  assetCode?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export interface I18nConfig {
  locale: LocaleCode;
  fallbackLocale?: LocaleCode;
  dictionary?: TranslationDictionary;
  availableLocales?: LocaleCode[];
}
