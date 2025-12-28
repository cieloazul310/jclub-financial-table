import {
  getCategoryYearSeries,
  type StatsResult,
} from "@cieloazul310/jclub-financial/statistics";

export type AverageValues = { year: number; value: number };

function getAverageValues(arr: (StatsResult | null)[]) {
  return arr
    .filter((d): d is StatsResult => d !== null)
    .map(({ year, average }) => ({ year, value: average }))
    .filter((d): d is AverageValues => d.value !== null);
}

export type AverageValuesByCategory = {
  revenue: AverageValues[];
  salary: AverageValues[];
  average_attd: AverageValues[];
};

async function getStatisticsByCategory(category: "J1" | "J2" | "J3") {
  const revenue = getAverageValues(
    await getCategoryYearSeries(category, "revenue"),
  );
  const salary = getAverageValues(
    await getCategoryYearSeries(category, "salary"),
  );
  const average_attd = getAverageValues(
    await getCategoryYearSeries(category, "average_attd"),
  );

  return {
    revenue,
    salary,
    average_attd,
  } satisfies AverageValuesByCategory;
}

export type Averages = {
  j1: AverageValuesByCategory;
  j2: AverageValuesByCategory;
  j3: AverageValuesByCategory;
};

export async function getAverages() {
  const j1 = await getStatisticsByCategory("J1");
  const j2 = await getStatisticsByCategory("J2");
  const j3 = await getStatisticsByCategory("J3");

  return { j1, j2, j3 } satisfies Averages;
}
