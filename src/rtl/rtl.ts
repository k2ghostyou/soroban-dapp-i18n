import { LOCALE_METADATA } from "../locales/registry";
import type { LocaleCode } from "../types";

/**
 * Return the text direction attribute for a locale.
 */
export function getDirAttribute(locale: LocaleCode): "ltr" | "rtl" {
  return LOCALE_METADATA[locale]?.direction ?? "ltr";
}

/**
 * Mirror a string for RTL locales.
 */
export function mirror(value: string, locale: LocaleCode): string {
  return getDirAttribute(locale) === "rtl" ? value.split("").reverse().join("") : value;
}

/**
 * Determine whether icons should flip in RTL layouts.
 */
export function shouldFlipIcon(locale: LocaleCode): boolean {
  return getDirAttribute(locale) === "rtl";
}
