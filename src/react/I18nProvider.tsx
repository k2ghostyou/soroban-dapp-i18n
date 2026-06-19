import React, { createContext, useContext, useMemo, type ReactNode } from "react";
import { createTranslator } from "../translate";
import type { I18nConfig, LocaleCode } from "../types";

interface I18nProviderProps extends I18nConfig {
  children: ReactNode;
}

const I18nContext = createContext<ReturnType<typeof createTranslator> | null>(null);

export function I18nProvider({ children, locale, fallbackLocale, dictionary }: I18nProviderProps) {
  const translator = useMemo(
    () => createTranslator({ locale, fallbackLocale, dictionary }),
    [locale, fallbackLocale, dictionary]
  );

  return <I18nContext.Provider value={translator}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
