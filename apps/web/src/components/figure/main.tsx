"use client";

import type { ExtendedFinancialDatum } from "@cieloazul310/jclub-financial";
import { center } from "styled-system/patterns";
import { useTableStore } from "@/providers/table-store-provider";
import { sortAndFilter } from "@/utils/sort-and-filter";
import { FinancialTable } from "./table";
import { FinancialCard } from "./card";
import type { Mode } from "@/utils/types";

type TabContentProps = {
  data: ExtendedFinancialDatum[];
  mode: Mode;
};

export function FigureMain({ data, mode }: TabContentProps) {
  const {
    cardMode,
    sortField,
    sortAsc,
    visibleClubs,
    visibleCategories,
    visibleYears,
  } = useTableStore((store) => store);
  const filteredData = sortAndFilter(data, {
    sortAsc,
    sortField,
    mode,
    visibleClubs,
    visibleCategories,
    visibleYears,
  });

  if (filteredData.length === 0) {
    return (
      <div className={center({ minHeight: "60vh" })}>
        表示可能なデータがありません
      </div>
    );
  }

  if (cardMode) return <FinancialCard data={filteredData} mode={mode} />;
  return <FinancialTable data={filteredData} mode={mode} />;
}
