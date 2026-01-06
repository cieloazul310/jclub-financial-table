import type {
  ExtendedFinancialDatum,
  SortableFields,
} from "@cieloazul310/jclub-financial";
import type { Category, Mode } from "./types";

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

export function categoryFilter(visibleCategories: Category[]) {
  return ({ category }: Pick<ExtendedFinancialDatum, "category">) => {
    return visibleCategories.includes(getCategory({ category }));
  };
}

export function sortAndFilter(
  data: ExtendedFinancialDatum[],
  {
    sortField,
    sortAsc,
    visibleClubs,
    visibleCategories,
    visibleYears,
    mode,
  }: {
    sortField: SortableFields;
    sortAsc: boolean;
    visibleClubs: string[];
    visibleCategories: Category[];
    visibleYears: [number, number];
    mode: Mode;
  },
): ExtendedFinancialDatum[] {
  if (mode === "club") {
    const [from, to] = visibleYears;
    return data
      .filter(({ year }) => year.value >= from && year.value <= to)
      .sort((a, b) => a.year.value - b.year.value);
  }

  const filter = categoryFilter(visibleCategories);

  if (sortField === "rank") {
    return data
      .filter(({ clubId }) => visibleClubs.includes(clubId.value))
      .filter(filter)
      .sort((a, b) => (getRank(a) - getRank(b)) * (sortAsc ? -1 : 1));
  }

  return data
    .filter(({ clubId }) => visibleClubs.includes(clubId.value))
    .filter(filter)
    .sort(
      (a, b) =>
        ((a[sortField]?.value ?? -Infinity) -
          (b[sortField]?.value ?? -Infinity)) *
        (sortAsc ? 1 : -1),
    );
}
