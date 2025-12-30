import type { FinancialDatum } from "@cieloazul310/jclub-financial";
import { css } from "styled-system/css";
import { Table } from "@/components/ui/table";
import { row } from "./row";
import type { Mode, Tab } from "@/utils/types";

type FinancialTableProps = {
  tab: Tab;
  mode: Mode;
  data: FinancialDatum[];
};

export function FinancialTable({ tab, mode, data }: FinancialTableProps) {
  const { head, renderRow } = row[tab];
  return (
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
          {data.map((datum, index) => renderRow(datum, mode, index))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
