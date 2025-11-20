import type { FinancialDatum } from "@cieloazul310/jclub-financial";
import type { Category, Mode, SortableKey } from "./types";

export function getRank(
  data: Pick<FinancialDatum, "category" | "rank">,
): number {
  const addition = (category: string) => {
    if (category === "J1") return 0;
    if (category === "J2") return 100;
    if (category === "J3") return 200;
    if (category === "JFL") return 300;
    return 400;
  };
  return addition(data.category) + data.rank;
}

function getCategory({ category }: Pick<FinancialDatum, "category">): Category {
  return category !== "J1" && category !== "J2" && category !== "J3"
    ? "others"
    : category;
}

export function categoryFilter(filterCategories: Category[]) {
  return ({ category }: Pick<FinancialDatum, "category">) => {
    return filterCategories.includes(getCategory({ category }));
  };
}

export function sortAndFilter(
  data: FinancialDatum[],
  {
    sortKey,
    sortAsc,
    filterCategories,
    filterYears,
    mode,
  }: {
    sortKey: SortableKey;
    sortAsc: boolean;
    filterCategories: Category[];
    filterYears: [number, number];
    mode: Mode;
  },
): FinancialDatum[] {
  if (mode === "club") {
    const [from, to] = filterYears;
    return data
      .filter(({ year }) => year >= from && year <= to)
      .sort((a, b) => a.year - b.year);
  }

  const filter = categoryFilter(filterCategories);

  if (sortKey === "rank") {
    return data
      .filter(filter)
      .sort((a, b) => (getRank(a) - getRank(b)) * (sortAsc ? -1 : 1));
  }

  return data
    .filter(filter)
    .sort(
      (a, b) =>
        ((a[sortKey] ?? -Infinity) - (b[sortKey] ?? -Infinity)) *
        (sortAsc ? 1 : -1),
    );
}
