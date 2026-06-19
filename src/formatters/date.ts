export type DateStyle = "short" | "medium" | "long" | "relative";

interface FormatDateOptions {
  locale?: string;
  style?: DateStyle;
  referenceDate?: Date;
}

const STYLE_OPTIONS: Record<Exclude<DateStyle, "relative">, Intl.DateTimeFormatOptions> = {
  short: { year: "numeric", month: "numeric", day: "numeric" },
  medium: { year: "numeric", month: "short", day: "numeric" },
  long: { year: "numeric", month: "long", day: "numeric", weekday: "long" }
};

/**
 * Format relative time values using the current locale.
 */
function getRelativeTime(value: number, unit: Intl.RelativeTimeFormatUnit): string {
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  return rtf.format(value, unit);
}

/**
 * Format a date using short, medium, long, or relative styles.
 */
export function formatDate(date: Date | string | number, options: FormatDateOptions = {}): string {
  const targetDate = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  if (Number.isNaN(targetDate.getTime())) {
    throw new TypeError("Invalid date value");
  }

  const locale = options.locale ?? "en-US";
  const style = options.style ?? "medium";

  if (style === "relative") {
    const reference = options.referenceDate ?? new Date();
    const deltaMs = targetDate.getTime() - reference.getTime();
    const deltaDays = Math.round(deltaMs / 86_400_000);
    if (Math.abs(deltaDays) <= 1) {
      return getRelativeTime(deltaDays, "day");
    }
    const deltaHours = Math.round(deltaMs / 3_600_000);
    if (Math.abs(deltaHours) < 24) {
      return getRelativeTime(deltaHours, "hour");
    }
    const deltaMinutes = Math.round(deltaMs / 60_000);
    return getRelativeTime(deltaMinutes, "minute");
  }

  const formatter = new Intl.DateTimeFormat(locale, STYLE_OPTIONS[style]);
  return formatter.format(targetDate);
}
