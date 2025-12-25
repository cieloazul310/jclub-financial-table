import { describe, it, expect } from "vitest";
import {
  getStatistics,
  getCategoryYearSeries,
  getStatsByYear,
} from "../dist/index.mjs";

describe("Get Statistics", () => {
  it("should get statistics for a specific category and field", async () => {
    const stats = await getStatistics(2022, "J1", "revenue");
    expect(stats).toHaveProperty("year", 2022);
    expect(stats).toHaveProperty("category", "J1");
    expect(stats).toHaveProperty("key", "revenue");
    expect(Array.isArray(stats.values)).toBe(true);
  });

  it("statistics should always same values for each build", async () => {
    const stats = await getStatistics(2021, "J2", "expense");
    expect(stats.totalCount).toEqual(22);
    expect(stats.average).toEqual(1555);
    expect(stats.sum).toEqual(34211);
  });

  it("should get invalid statistics when data is missing", async () => {
    const stats = await getStatistics(2000, "J1", "revenue");
    console.log(stats);
    expect(stats.totalCount).toEqual(0);
    expect(stats.values).toEqual([]);
    expect(stats.sum).toEqual(0);
    expect(stats.average).toBeNull();
    expect(stats.min).toBeNull();
    expect(stats.max).toBeNull();
    expect(stats.variance).toBeNull();
    expect(stats.stddev).toBeNull();
  });
});

describe("Get Category Year Series", () => {
  it("should get statistics for all categories for a specific field", async () => {
    const statsArray = await getCategoryYearSeries("J2", "revenue");
    console.log(statsArray);
    expect(Array.isArray(statsArray)).toBe(true);
    expect(statsArray.length).toBeGreaterThan(0);
  });
});

describe("Get Stats By Year", () => {
  it("should get statistics for all categories for a specific year", async () => {
    const statsByCategory = await getStatsByYear(2020, "expense");
    console.log(statsByCategory);
    expect(statsByCategory).toHaveProperty("J1");
    expect(statsByCategory).toHaveProperty("J2");
    expect(statsByCategory).toHaveProperty("J3");
  });
});
