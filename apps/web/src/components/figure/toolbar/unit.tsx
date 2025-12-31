"use client";

import { getLabel, type SortableKeys } from "@cieloazul310/jclub-financial";
import { css } from "styled-system/css";
import { useTableStore } from "@/providers/table-store-provider";
import type { Mode, Tab } from "@/utils/types";

type SortStateString = {
  field: string | null | undefined;
  sortKey: SortableKeys;
  sortType: string;
};

export function useSortStateString(): SortStateString {
  const { sortAsc, sortKey } = useTableStore((store) => store);
  const field = getLabel(sortKey);

  const rankSort = sortAsc ? "低い順" : "高い順";
  const valueSort = sortAsc ? "少ない順" : "多い順";
  const sortType = sortKey === "rank" ? rankSort : valueSort;

  return {
    field,
    sortKey,
    sortType,
  };
}

export function useFilterStateString(): string {
  const { visibleCategories } = useTableStore((store) => store);

  return `フィルタ: ${
    visibleCategories.length === 4
      ? "なし"
      : visibleCategories
          .map((category) => (category === "others" ? "その他" : category))
          .join(",")
  }`;
}

export function useStateString(): {
  sortString: SortStateString;
  filterString: string;
} {
  const sortString = useSortStateString();
  const filterString = useFilterStateString();
  return { sortString, filterString };
}

export function useUnitString(tab: Tab): string {
  const unit = tab === "attd" ? "入場料収入のみ百万円" : "百万円";
  return `単位: ${unit}`;
}

export function Unit({ mode, tab }: { mode: Mode; tab: Tab }) {
  const { field, sortType } = useSortStateString();
  const unitString = useUnitString(tab);

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        textStyle: "dns-14B-120",
      })}
    >
      {mode === "year" && (
        <span>
          <strong>{field}</strong> {sortType}
        </span>
      )}
      <span>{unitString}</span>
    </div>
  );
}
