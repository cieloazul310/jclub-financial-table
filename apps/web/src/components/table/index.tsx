"use client";

import type { TabsValueChangeDetails } from "@ark-ui/react";
import type { FinancialDatum } from "@cieloazul310/jclub-financial/types";
import { css } from "styled-system/css";
import { useTableStore } from "@/providers/table-store-provider";
import { Tabs } from "@/components/ui/tabs";
import { Table } from "@/components/ui/table";
import { Toolbar } from "@/components/toolbar";
import { sortAndFilter } from "@/utils/sort-and-filter";
import type { Mode, Tab } from "@/utils/types";
import { row } from "./row";

const options: { id: Tab; label: string }[] = [
  { id: "pl", label: "損益計算書" },
  { id: "bs", label: "貸借対照表" },
  { id: "revenue", label: "営業収入" },
  { id: "expense", label: "営業費用" },
  { id: "attd", label: "入場者数" },
];

export function FinancialTable({
  data,
  mode,
}: {
  data: FinancialDatum[];
  mode: Mode;
}) {
  const { tab, sortKey, sortAsc, filterCategories, filterYears, setTab } =
    useTableStore((store) => store);
  const onValueChange = (details: TabsValueChangeDetails) => {
    setTab(details.value as Tab);
  };
  const filteredData = sortAndFilter(data, {
    sortAsc,
    sortKey,
    mode,
    filterCategories,
    filterYears,
  });

  return (
    <>
      <Tabs.Root value={tab} onValueChange={onValueChange}>
        <Tabs.List>
          {options.map(({ id, label }) => (
            <Tabs.Trigger key={id} py={4} value={id}>
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Toolbar mode={mode} tab={tab} />
        {options.map(({ id }) => {
          const { head, renderRow } = row[id];
          return (
            <Tabs.Content key={id} value={id}>
              <div
                className={css({
                  maxWidth: "full",
                  maxHeight: "75vh",
                  overflowX: "auto",
                  overflowY: "auto",
                })}
              >
                <Table.Root dense hovered width="full">
                  <Table.Head
                    className={css({
                      position: "sticky",
                      top: 0,
                      zIndex: 3,
                      bg: "solid-gray.bg",
                    })}
                  >
                    {head(mode)}
                  </Table.Head>
                  <Table.Body fontFamily="Helvetica, Arial, sans-serif">
                    {filteredData.map((datum, index) =>
                      renderRow(datum, mode, index),
                    )}
                  </Table.Body>
                </Table.Root>
              </div>
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </>
  );
}
