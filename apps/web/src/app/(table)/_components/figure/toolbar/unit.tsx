"use client";

import { cx, css } from "styled-system/css";
import { useTabsContext } from "@/components/ui/tabs";
import { useTableStore } from "@/providers/table-store-provider";
import { valueToTab } from "@/utils/tabs";
import { getSortState } from "@/utils/sort-state";
import type { Mode, Tab } from "@/utils/types";

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

export function useUnitString(tab: Tab): string {
  const unit = tab === "attd" ? "入場料収入のみ百万円" : "百万円";
  return `単位: ${unit}`;
}

export function Unit({ mode }: { mode: Mode }) {
  const { sortAsc, sortField } = useTableStore((store) => store);
  const { label, sortState } = getSortState({ sortAsc, sortField });
  const { value } = useTabsContext();
  const unitString = useUnitString(valueToTab(value));

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
          <strong>{label}</strong> {sortState}
        </span>
      )}
      <span className={cx(mode === "year" && css({ hideBelow: "sm" }))}>
        {unitString}
      </span>
    </div>
  );
}
