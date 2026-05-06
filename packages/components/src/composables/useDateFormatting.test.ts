import { describe, it, expect } from "vitest";
import { useDateFormatting } from "./useDateFormatting";

describe("useDateFormatting", () => {
  it("returns correct ISO and human-readable formats for a valid date string", () => {
    const { isoDate, humanDate } = useDateFormatting("2024-06-15");
    expect(isoDate.value).toBe("2024-06-15");
    expect(humanDate.value).toBe("15 de junio de 2024");
  });

  it("returns the original string for an invalid date", () => {
    const { isoDate, humanDate } = useDateFormatting("not-a-date");
    expect(isoDate.value).toBe("not-a-date");
    expect(humanDate.value).toBe("not-a-date");
  });
});
