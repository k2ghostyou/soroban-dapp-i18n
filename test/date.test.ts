import { describe, expect, it } from "vitest";
import { formatDate } from "../src/formatters/date";

describe("formatDate", () => {
  it("formats a relative yesterday string", () => {
    expect(
      formatDate(new Date("2026-06-18T00:00:00Z"), {
        locale: "en-US",
        style: "relative",
        referenceDate: new Date("2026-06-19T00:00:00Z")
      })
    ).toBe("yesterday");
  });

  it("formats a relative tomorrow string", () => {
    expect(
      formatDate(new Date("2026-06-20T00:00:00Z"), {
        locale: "en-US",
        style: "relative",
        referenceDate: new Date("2026-06-19T00:00:00Z")
      })
    ).toBe("tomorrow");
  });

  it("formats a relative hours ago string", () => {
    expect(
      formatDate(new Date("2026-06-19T10:00:00Z"), {
        locale: "en-US",
        style: "relative",
        referenceDate: new Date("2026-06-19T12:00:00Z")
      })
    ).toBe("2 hours ago");
  });

  it("throws when given an invalid date", () => {
    expect(() => formatDate("not-a-date")).toThrow(TypeError);
  });
});
