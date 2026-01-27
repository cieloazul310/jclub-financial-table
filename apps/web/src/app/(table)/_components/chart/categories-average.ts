import {
  getCategoryYearSeries,
  type StatsResult,
} from "@cieloazul310/jclub-financial/statistics";

function getAverageMax(data: (StatsResult | null)[]) {
  return data
    .filter((d): d is StatsResult => d !== null)
    .reduce((accum, curr) => Math.max(accum, curr.average ?? 0), 0);
}

async function averageMaxByCategory(category: "J1" | "J2" | "J3") {
  const revenue = await getCategoryYearSeries(category, "revenue");
  const expense = await getCategoryYearSeries(category, "expenses");
  const team_wages = await getCategoryYearSeries(category, "team_wages");
  const average_attendance = await getCategoryYearSeries(
    category,
    "average_attendance",
  );

  return {
    revenue: getAverageMax(revenue),
    expense: getAverageMax(expense),
    team_wages: getAverageMax(team_wages),
    average_attendance: getAverageMax(average_attendance),
  };
}

export type AverageMax = {
  revenue: number;
  expense: number;
  team_wages: number;
  average_attendance: number;
};
export type AverageMaxByCategory = {
  j1: AverageMax;
  j2: AverageMax;
  j3: AverageMax;
};

/**
 * グラフ描写用に、各カテゴリ・項目(revenue, expense, team_wages, average_attendance)の年別平均値の最大値を格納
 */
export async function getAverageMaxByCategory() {
  const j1 = await averageMaxByCategory("J1");
  const j2 = await averageMaxByCategory("J2");
  const j3 = await averageMaxByCategory("J3");

  return { j1, j2, j3 };
}
