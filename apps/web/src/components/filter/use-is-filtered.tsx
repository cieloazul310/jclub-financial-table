import { getAllClubs, getAllYears } from "@cieloazul310/jclub-financial";
import type { Category } from "@/utils/types";

export function useYearFiltered(visibleYears: [number, number]) {
  const allYears = getAllYears();
  const [from, to] = visibleYears;
  return (
    from !== allYears[0]?.year || to !== allYears[allYears.length - 1]?.year
  );
}

export function useClubFiltered(visibleClubs: string[]) {
  const allClubs = getAllClubs();

  return visibleClubs.length !== allClubs.length;
}

export function useCategoriesFiltered(visibleCategories: Category[]) {
  return visibleCategories.length !== 4;
}
