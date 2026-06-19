import { describe, expect, it } from "vitest";
import { formatAmount, parseAmount } from "../src/formatters/amount";

describe("formatAmount", () => {
  it("formats bigint stroops with default decimals", () => {
    expect(formatAmount(123456789n, { locale: "en-US", decimals: 7 })).toBe("12.3456789");
  });

  it("appends asset code suffix", () => {
    expect(formatAmount("1234.5", { assetCode: "XLM", locale: "en-US" })).toBe("1,234.5 XLM");
  });

  it("formats Brazilian Portuguese separators", () => {
    expect(formatAmount("1234.56", { locale: "pt-BR", minimumFractionDigits: 2, maximumFractionDigits: 2 })).toBe("1.234,56");
  });

  it("throws on non-numeric input", () => {
    expect(() => formatAmount("abc", { locale: "en-US" })).toThrow(TypeError);
  });
});

describe("parseAmount", () => {
  it("parses a formatted amount string to bigint stroops", () => {
    expect(parseAmount("12.3456789", 7)).toBe(123456789n);
  });

  it("parses a localized amount string with commas", () => {
    expect(parseAmount("1,234.56", 7)).toBe(12345600000n);
  });

  it("parses a localized Brazilian amount string", () => {
    expect(parseAmount("1.234,56", 7)).toBe(12345600000n);
  });
});
