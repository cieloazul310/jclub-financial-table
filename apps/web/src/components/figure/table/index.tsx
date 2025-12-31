import type { ExtendedFinancialDatum } from "@cieloazul310/jclub-financial";
import { css } from "styled-system/css";
import { Table } from "@/components/ui/table";
import type { Mode, Tab } from "@/utils/types";
import { row } from "./row";
import { useTableId } from "../utils/use-table-id";

type FinancialTableProps = {
  tab: Tab;
  mode: Mode;
  data: ExtendedFinancialDatum[];
};

export function FinancialTable({ tab, mode, data }: FinancialTableProps) {
  const tableId = useTableId();
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
      <Table.Root id={tableId} dense hovered width="full">
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
