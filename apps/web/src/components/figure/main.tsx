import type { FinancialDatum } from "@cieloazul310/jclub-financial";
import { useTableStore } from "@/providers/table-store-provider";
import { FinancialTable } from "./table";
import { FinancialCard } from "./card";
import type { Mode } from "@/utils/types";

type TabContentProps = {
  data: FinancialDatum[];
  mode: Mode;
};

export function FigureMain({ data, mode }: TabContentProps) {
  const { cardMode, tab } = useTableStore((store) => store);

  if (cardMode) return <FinancialCard data={data} mode={mode} tab={tab} />;
  return <FinancialTable data={data} mode={mode} tab={tab} />;
}
