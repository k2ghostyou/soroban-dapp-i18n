import { LOCALE_METADATA } from "../locales/registry";
import type { LocaleCode } from "../types";

export function getDirAttribute(locale: LocaleCode): "ltr" | "rtl" {
  return LOCALE_METADATA[locale]?.direction ?? "ltr";
}

export function mirror(value: string, locale: LocaleCode): string {
  return getDirAttribute(locale) === "rtl" ? value.split("").reverse().join("") : value;
}

export function shouldFlipIcon(locale: LocaleCode): boolean {
  return getDirAttribute(locale) === "rtl";
}
