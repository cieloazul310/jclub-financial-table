import type { ExtendedFinancialDatum } from "@cieloazul310/jclub-financial";
import type { Tab } from "@/utils/types";
import { getAverageMaxByCategory, type AverageMax } from "./categories-average";

async function getExtentByCategory(categories: string[]) {
  const averageMaxByCategory = await getAverageMaxByCategory();
  function getMax(fields: keyof AverageMax) {
    const j1 = categories.includes("J1") ? averageMaxByCategory.j1[fields] : 0;
    const j2 = categories.includes("J2") ? averageMaxByCategory.j2[fields] : 0;
    const j3 = categories.includes("J3") ? averageMaxByCategory.j3[fields] : 0;

    return [j1, j2, j3].reduce((accum, curr) => Math.max(accum, curr), 0);
  }
  const extentMap: Record<Tab, [number, number]> = {
    pl: [0, getMax("revenue")],
    revenue: [0, getMax("revenue")],
    expense: [0, getMax("team_wages")],
    attd: [0, getMax("average_attendance")],
    bs: [0, 0],
  };

  return extentMap;
}

export async function getExtentMap(data: ExtendedFinancialDatum[]) {
  const categories = Array.from(
    new Set(data.map(({ category }) => category.value)),
  );
  const extents = await getExtentByCategory(categories);

  const maxAssets = data.reduce(
    (accum, d) => Math.max(accum, d.assets?.value ?? 0),
    0,
  );
  const minNetWorth = data.reduce(
    (accum, d) => Math.min(accum, d.net_assets?.value ?? 0),
    0,
  );

  const revenueMax = data.reduce(
    (accum, d) => Math.max(accum, d.revenue.value),
    0,
  );
  const expenseMax = data.reduce(
    (accum, d) => Math.max(accum, d.expenses.value),
    0,
  );
  const attdMax = data.reduce(
    (accum, d) => Math.max(accum, d.average_attendance.value),
    0,
  );

  const result: Record<
    "pl" | "bs" | "revenue" | "expense" | "attd",
    [number, number]
  > = {
    pl: [0, Math.max(revenueMax, extents.pl[1])],
    revenue: [0, Math.max(revenueMax, extents.revenue[1])],
    expense: [0, Math.max(expenseMax, extents.expense[1])],
    attd: [0, Math.max(attdMax, extents.attd[1])],
    bs: [Math.min(0, minNetWorth), maxAssets],
  };

  return result;
}
