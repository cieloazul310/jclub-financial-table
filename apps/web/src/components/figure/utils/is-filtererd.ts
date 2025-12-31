import { getAllYears } from "@cieloazul310/jclub-financial";
import { useTableStore } from "@/providers/table-store-provider";
import type { Mode } from "@/utils/types";

export function useIsFiltered(mode: Mode) {
  const { visibleCategories, visibleYears } = useTableStore((store) => store);

  if (mode === "club") {
    const allYears = getAllYears();
    const [from, to] = visibleYears;
    return (
      from !== allYears[0]?.year || to !== allYears[allYears.length - 1]?.year
    );
  }
  return visibleCategories.length === 0;
}
