import type { LocaleMeta, LocaleCode } from "../types";

export const LOCALE_METADATA: Record<LocaleCode, LocaleMeta> = {
  en: {
    code: "en",
    direction: "ltr",
    nativeName: "English",
    englishName: "English",
    intlTag: "en-US"
  },
  es: {
    code: "es",
    direction: "ltr",
    nativeName: "Español",
    englishName: "Spanish",
    intlTag: "es-ES"
  },
  pt: {
    code: "pt",
    direction: "ltr",
    nativeName: "Português",
    englishName: "Portuguese",
    intlTag: "pt-BR"
  },
  fr: {
    code: "fr",
    direction: "ltr",
    nativeName: "Français",
    englishName: "French",
    intlTag: "fr-FR"
  },
  ar: {
    code: "ar",
    direction: "rtl",
    nativeName: "العربية",
    englishName: "Arabic",
    intlTag: "ar-SA"
  },
  yo: {
    code: "yo",
    direction: "ltr",
    nativeName: "Yorùbá",
    englishName: "Yoruba",
    intlTag: "yo-NG"
  },
  sw: {
    code: "sw",
    direction: "ltr",
    nativeName: "Kiswahili",
    englishName: "Swahili",
    intlTag: "sw-KE"
  }
};
