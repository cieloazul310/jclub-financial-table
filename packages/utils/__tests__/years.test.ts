import { describe, it, expect } from "vitest";
import { getAllYears } from "../dist/index.mjs";

describe("getAllYears", () => {
  it("should return an array of years", () => {
    const years = getAllYears();
    expect(Array.isArray(years)).toBe(true);
    expect(years.length).toBeGreaterThan(0);
    expect(years.every((year) => typeof year.year === "number")).toBe(true);
  });
});
