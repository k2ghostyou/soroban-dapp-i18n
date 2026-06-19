import type { FormatAmountOptions } from "../types";

const DEFAULT_DECIMALS = 7;

export function formatAmount(value: string | number | bigint, options: FormatAmountOptions = {}): string {
  const decimals = options.decimals ?? DEFAULT_DECIMALS;
  if (typeof value === "string" && value.trim() === "") {
    throw new TypeError("Amount value must be a non-empty string, number, or bigint");
  }

  let amount: number;

  if (typeof value === "bigint") {
    amount = Number(value) / 10 ** decimals;
  } else if (typeof value === "string") {
    amount = Number(value);
  } else if (typeof value === "number") {
    amount = value;
  } else {
    throw new TypeError("Amount value must be a string, number, or bigint");
  }

  if (Number.isNaN(amount)) {
    throw new TypeError("Amount value must be a non-numeric input");
  }

  const formatter = new Intl.NumberFormat(options.locale ?? "en-US", {
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
    maximumFractionDigits: options.maximumFractionDigits ?? decimals,
    style: "decimal"
  });

  const formatted = formatter.format(amount);
  return options.assetCode ? `${formatted} ${options.assetCode}` : formatted;
}

export function parseAmount(amountString: string, decimals: number = DEFAULT_DECIMALS): bigint {
  if (typeof amountString !== "string") {
    throw new TypeError("Amount string must be a string");
  }

  const normalized = amountString.replace(/[^0-9.,-]/g, "").trim();
  const parts = normalized.split(/[,\.]/);

  if (parts.length === 0 || normalized === "") {
    throw new TypeError("Amount string must contain a numeric value");
  }

  const last = parts.pop() ?? "";
  const integerPart = parts.join("");
  const fractionalPart = last.padEnd(decimals, "0").slice(0, decimals);

  const combined = `${integerPart}${fractionalPart}`.replace(/^0+(?!$)/, "");
  return BigInt(combined || "0");
}
