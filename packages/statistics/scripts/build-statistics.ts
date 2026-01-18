import * as fs from "fs/promises";
import * as path from "path";
import { getDataByYear } from "@cieloazul310/jclub-financial-data";
import type {
  FinancialDatum,
  General,
  SeasonResult,
} from "@cieloazul310/jclub-financial-data/types";
import { CATEGORIES } from "../src/type";

const __dirname = import.meta.dirname;
const outDir = path.resolve(__dirname, "../dist/dataset");

await fs.mkdir(outDir, { recursive: true });

type Fields = Exclude<keyof FinancialDatum, keyof General | keyof SeasonResult>;
const fields: Fields[] = [
  "revenue",
  "expenses",
  "net_assets",
  "sponsor_revenue",
  "ticket_revenue",
  "jleague_distribution",
  "team_wages",
  "average_attendance",
  "unit_price",
];

function getMinAndMax(values: number[]) {
  return {
    min: values[0] ?? null,
    max: values[values.length - 1] ?? null,
  };
}

function getMedian(values: number[]) {
  const len = values.length;
  if (len === 0) return null;
  const mid = Math.floor(len / 2);
  if (len % 2 === 1) {
    return values[mid] ?? null;
  } else {
    const midMinusOneValue = values[mid - 1];
    const midValue = values[mid];
    if (midMinusOneValue && midValue) {
      return Math.round((midMinusOneValue + midValue) / 2);
    }
    return null;
  }
}

function getDeviation(values: number[], average: number) {
  const squaredDiffs = values.map((v) => Math.pow(v - average, 2));
  const avgSquaredDiff =
    squaredDiffs.reduce((accum, curr) => accum + curr, 0) / values.length;
  return Math.sqrt(avgSquaredDiff);
}

function getVariance(values: number[], average: number) {
  const squaredDiffs = values.map((v) => Math.pow(v - average, 2));
  return squaredDiffs.reduce((accum, curr) => accum + curr, 0) / values.length;
}

function valuesToStats(data: { name: string; value: number }[]) {
  const values = data.sort((a, b) => a.value - b.value);
  const totalCount = values.length;

  const sum = values.reduce((accum, curr) => accum + curr.value, 0);
  const average = Math.round(sum / totalCount);
  const { min, max } = getMinAndMax(values.map((v) => v.value));
  const median = getMedian(values.map((v) => v.value));
  const deviation = getDeviation(
    values.map((v) => v.value),
    average,
  );
  const variance = getVariance(
    values.map((v) => v.value),
    average,
  );

  return {
    values,
    totalCount,
    stats: { sum, average, min, max, median, deviation, variance },
  };
}

function createStats(data: FinancialDatum[], key: Fields) {
  const values = data
    .filter((datum) => datum[key] !== null && datum[key] !== undefined)
    .map((datum) => ({ name: datum.name, value: datum[key] ?? 0 }));
  return valuesToStats(values);
}

async function buildStatistics() {
  const years = Array.from({ length: 20 }, (_, i) => 2005 + i);

  for (const year of years) {
    const data = await getDataByYear(year);
    for (const category of CATEGORIES) {
      const dataByCategory = data.filter((d) => d.category === category);
      if (dataByCategory.length === 0) continue;

      const stats: Record<Fields, ReturnType<typeof createStats>> = {} as any;

      for (const field of fields) {
        stats[field] = createStats(dataByCategory, field);
      }

      const output = {
        year,
        category,
        stats,
      };

      const outputFile = path.join(outDir, `${year}-${category}.json`);
      await fs.writeFile(outputFile, JSON.stringify(output, null, 2));
    }
  }
}

try {
  await buildStatistics();
  console.log("Statistics processed.");
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
