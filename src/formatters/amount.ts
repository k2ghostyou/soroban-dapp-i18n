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

  const trimmed = amountString.trim();
  if (trimmed === "") {
    throw new TypeError("Amount string must contain a numeric value");
  }

  const sign = trimmed.startsWith("-") ? "-" : "";
  const numeric = trimmed.replace(/^[+-]/, "").replace(/[^0-9.,]/g, "");
  const lastDot = numeric.lastIndexOf(".");
  const lastComma = numeric.lastIndexOf(",");
  const separatorIndex = Math.max(lastDot, lastComma);

  let integerPart = numeric;
  let fractionalPart = "";

  if (separatorIndex !== -1) {
    integerPart = numeric.slice(0, separatorIndex).replace(/[.,]/g, "");
    fractionalPart = numeric.slice(separatorIndex + 1).replace(/[.,]/g, "");
  } else {
    integerPart = numeric.replace(/[.,]/g, "");
  }

  if (!/^[0-9]*$/.test(integerPart) || !/^[0-9]*$/.test(fractionalPart)) {
    throw new TypeError("Amount string must contain a numeric value");
  }

  const normalizedFraction = (fractionalPart + "0".repeat(decimals)).slice(0, decimals);
  const combined = `${integerPart || "0"}${normalizedFraction}`.replace(/^0+(?!$)/, "");
  return BigInt(`${sign}${combined || "0"}`);
}
