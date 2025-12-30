import type { ExtendedFinancialDatum } from "@cieloazul310/jclub-financial";
import type { Category, Mode, SortableKey } from "./types";

export function getRank(
  data: Pick<ExtendedFinancialDatum, "category" | "rank">,
): number {
  const addition = (category: string) => {
    if (category === "J1") return 0;
    if (category === "J2") return 100;
    if (category === "J3") return 200;
    if (category === "JFL") return 300;
    return 400;
  };
  return addition(data.category.value) + data.rank.value;
}

function getCategory({
  category,
}: Pick<ExtendedFinancialDatum, "category">): Category {
  return category.value !== "J1" &&
    category.value !== "J2" &&
    category.value !== "J3"
    ? "others"
    : category.value;
}

export function categoryFilter(filterCategories: Category[]) {
  return ({ category }: Pick<ExtendedFinancialDatum, "category">) => {
    return filterCategories.includes(getCategory({ category }));
  };
}

export function sortAndFilter(
  data: ExtendedFinancialDatum[],
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
): ExtendedFinancialDatum[] {
  if (mode === "club") {
    const [from, to] = filterYears;
    return data
      .filter(({ year }) => year.value >= from && year.value <= to)
      .sort((a, b) => a.year.value - b.year.value);
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
        ((a[sortKey]?.value ?? -Infinity) - (b[sortKey]?.value ?? -Infinity)) *
        (sortAsc ? 1 : -1),
    );
}
