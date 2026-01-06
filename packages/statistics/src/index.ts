import { stat, readFile } from "fs/promises";
import { resolve, join } from "path";
import { getAllYears } from "@cieloazul310/jclub-financial-utils";
import type { StatsCategory, Fields, ValueItem } from "./type";

export type StatsResult = {
  year: number;
  category: StatsCategory;
  key: Fields;
  totalCount: number;
  values: ValueItem[];
  sum: number;
  average: number | null;
  min: number | null;
  max: number | null;
  variance: number | null;
  stddev: number | null;
};

async function findDatasetDir(): Promise<string> {
  const candidates = [
    resolve(__dirname, "dataset"), // when running from dist
    resolve(__dirname, "../dist/dataset"), // when running from src
    resolve(process.cwd(), "packages/statistics/dist/dataset"),
    resolve(process.cwd(), "dist/dataset"),
  ];
  for (const c of candidates) {
    try {
      const s = await stat(c);
      if (s.isDirectory()) return c;
    } catch (err) {
      // ignore
    }
  }
  throw new Error("dataset directory not found (looked in candidates)");
}

async function loadStatsFile(year: number, category: string) {
  const dir = await findDatasetDir();
  const filename = join(dir, `${year}-${category}.json`);
  try {
    const raw = await readFile(filename, "utf8");
    return JSON.parse(raw) as any;
  } catch (err) {
    return null;
  }
}

export async function getStatistics(
  year: number,
  category: StatsCategory,
  key: Fields,
): Promise<StatsResult> {
  const file = await loadStatsFile(year, category);
  if (!file) {
    return {
      year,
      category,
      key,
      totalCount: 0,
      values: [],
      sum: 0,
      average: null,
      min: null,
      max: null,
      variance: null,
      stddev: null,
    };
  }

  const entry = file.stats?.[key as string];
  if (!entry) {
    return {
      year,
      category,
      key,
      totalCount: 0,
      values: [],
      sum: 0,
      average: null,
      min: null,
      max: null,
      variance: null,
      stddev: null,
    };
  }

  const values: ValueItem[] = entry.values ?? [];
  const totalCount: number = entry.totalCount ?? values.length;
  const sum: number = entry.stats?.sum ?? 0;
  const average: number | null = entry.stats?.average ?? null;
  const min: number | null = entry.stats?.min ?? null;
  const max: number | null = entry.stats?.max ?? null;
  const variance: number | null = entry.stats?.variance ?? null;
  const stddev: number | null = entry.stats?.deviation ?? null;

  return {
    year,
    category,
    key,
    totalCount,
    values,
    sum,
    average,
    min,
    max,
    variance,
    stddev,
  };
}

export type Year = number;

const DEFAULT_YEARS: Year[] = getAllYears().map(({ year }) => year);

/**
 * Returns an array of statistics for a single category across multiple years.
 * Example: getCategoryYearSeries("J2", key) -> [Stats|null for 2005, 2006, ...]
 */
export async function getCategoryYearSeries(
  category: StatsCategory,
  key: Fields,
): Promise<(StatsResult | null)[]> {
  const result: (StatsResult | null)[] = [];
  for (const year of DEFAULT_YEARS) {
    const stats = await getStatistics(year, category, key);
    result.push(stats.totalCount === 0 ? null : stats);
  }
  return result;
}

/**
 * Returns statistics for a single year as an object keyed by category.
 * If a category has no data, its value will be null.
 */
export function getStatsByYear(
  year: Year,
  keys: Fields,
): Promise<Record<StatsCategory, StatsResult | null> | null>;

export function getStatsByYear(
  year: Year,
  keys: Fields[],
): Promise<Record<StatsCategory, Record<Fields, StatsResult | null>> | null>;

export async function getStatsByYear(year: Year, keys: Fields | Fields[]) {
  const allYears = getAllYears();
  const categories = allYears.find(
    (yearInfo) => yearInfo.year === year,
  )?.categories;
  if (!categories) return null;

  if (typeof keys === "string") {
    const out: Record<StatsCategory, StatsResult | null> = {
      J1: null,
      J2: null,
      J3: null,
    } as any;

    for (const cat of categories) {
      const stats = await getStatistics(year, cat as StatsCategory, keys);
      out[cat] = stats.totalCount === 0 ? null : stats;
    }
    return out;
  }

  const out: Record<StatsCategory, Record<Fields, StatsResult | null>> = {
    J1: null,
    J2: null,
    J3: null,
  } as any;

  for (const cat of categories) {
    const statsByCategory: Record<Fields, StatsResult | null> = {} as any;

    for (const key of keys) {
      const stats = await getStatistics(year, cat as StatsCategory, key);
      statsByCategory[key] = stats.totalCount === 0 ? null : stats;
    }
    out[cat] = statsByCategory;
  }
  return out;
}
