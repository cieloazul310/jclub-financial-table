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
  const expense = await getCategoryYearSeries(category, "expense");
  const salary = await getCategoryYearSeries(category, "salary");
  const average_attd = await getCategoryYearSeries(category, "average_attd");

  return {
    revenue: getAverageMax(revenue),
    expense: getAverageMax(expense),
    salary: getAverageMax(salary),
    average_attd: getAverageMax(average_attd),
  };
}

export type AverageMax = {
  revenue: number;
  expense: number;
  salary: number;
  average_attd: number;
};
export type AverageMaxByCategory = {
  j1: AverageMax;
  j2: AverageMax;
  j3: AverageMax;
};

/**
 * グラフ描写用に、各カテゴリ・項目(revenue, expense, salary, average_attd)の年別平均値の最大値を格納
 */
export async function getAverageMaxByCategory() {
  const j1 = await averageMaxByCategory("J1");
  const j2 = await averageMaxByCategory("J2");
  const j3 = await averageMaxByCategory("J3");

  return { j1, j2, j3 };
}
