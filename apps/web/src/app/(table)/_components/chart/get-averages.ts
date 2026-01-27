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
  team_wages: AverageValues[];
  average_attendance: AverageValues[];
};

async function getStatisticsByCategory(category: "J1" | "J2" | "J3") {
  const revenue = getAverageValues(
    await getCategoryYearSeries(category, "revenue"),
  );
  const team_wages = getAverageValues(
    await getCategoryYearSeries(category, "team_wages"),
  );
  const average_attendance = getAverageValues(
    await getCategoryYearSeries(category, "average_attendance"),
  );

  return {
    revenue,
    team_wages,
    average_attendance,
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
