"use client";

import type { TabsValueChangeDetails } from "@ark-ui/react";
import type { ExtendedFinancialDatum } from "@cieloazul310/jclub-financial/types";
import { css } from "styled-system/css";
import { useTableStore } from "@/providers/table-store-provider";
import { Tabs } from "@/components/ui/tabs";
import { sortAndFilter } from "@/utils/sort-and-filter";
import type { Mode, Tab } from "@/utils/types";
import { FigureMain } from "./main";
import { Toolbar } from "./toolbar";

const options: { id: Tab; label: string }[] = [
  { id: "pl", label: "損益計算書" },
  { id: "bs", label: "貸借対照表" },
  { id: "revenue", label: "営業収入" },
  { id: "expense", label: "営業費用" },
  { id: "attd", label: "入場者数" },
];

export function Figure({
  data,
  mode,
}: {
  data: ExtendedFinancialDatum[];
  mode: Mode;
}) {
  const { tab, sortKey, sortAsc, visibleCategories, visibleYears, setTab } =
    useTableStore((store) => store);
  const onValueChange = (details: TabsValueChangeDetails) => {
    setTab(details.value as Tab);
  };
  const filteredData = sortAndFilter(data, {
    sortAsc,
    sortKey,
    mode,
    visibleCategories,
    visibleYears,
  });

  return (
    <>
      <Tabs.Root
        className={css({
          position: "sticky",
          top: "{sizes.mobile-header-height}",
          zIndex: 5,
          bg: "white/85",
        })}
        value={tab}
        onValueChange={onValueChange}
      >
        <Tabs.List>
          {options.map(({ id, label }) => (
            <Tabs.Trigger key={id} py={4} value={id}>
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
      <div
        className={css({
          mx: "auto",
          maxWidth: "breakpoint-2xl",
          width: "full",
        })}
      >
        <Toolbar mode={mode} tab={tab} />
        <FigureMain mode={mode} data={filteredData} />
      </div>
    </>
  );
}
