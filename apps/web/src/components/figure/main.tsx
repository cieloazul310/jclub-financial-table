import type { ExtendedFinancialDatum } from "@cieloazul310/jclub-financial";
import { center } from "styled-system/patterns";
import { useTableStore } from "@/providers/table-store-provider";
import { FinancialTable } from "./table";
import { FinancialCard } from "./card";
import type { Mode } from "@/utils/types";

type TabContentProps = {
  data: ExtendedFinancialDatum[];
  mode: Mode;
};

export function FigureMain({ data, mode }: TabContentProps) {
  const { cardMode, tab } = useTableStore((store) => store);

  if (data.length === 0) {
    return (
      <div className={center({ minHeight: "60vh" })}>
        表示可能なデータがありません
      </div>
    );
  }

  if (cardMode) return <FinancialCard data={data} mode={mode} />;
  return <FinancialTable data={data} mode={mode} tab={tab} />;
}
