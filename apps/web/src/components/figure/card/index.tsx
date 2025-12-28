import type { FinancialDatum } from "@cieloazul310/jclub-financial";
import { css } from "styled-system/css";
import type { Mode, Tab } from "@/utils/types";

type FinancialCardProps = {
  tab: Tab;
  mode: Mode;
  data: FinancialDatum[];
};

export function FinancialCard({ tab, mode, data }: FinancialCardProps) {
  return <div className={css()}></div>;
}
