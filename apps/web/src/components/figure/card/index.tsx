import type { FinancialDatum } from "@cieloazul310/jclub-financial";
import { css } from "styled-system/css";
import type { Mode, Tab } from "@/utils/types";
import { CardItem } from "./item";

type FinancialCardProps = {
  tab: Tab;
  mode: Mode;
  data: FinancialDatum[];
};

export function FinancialCard({ tab, mode, data }: FinancialCardProps) {
  return (
    <div className={css({ display: "flex", gap: 2 })}>
      {data.map((datum) => (
        <CardItem datum={datum} key={`${datum.slug}${datum.year}`} />
      ))}
    </div>
  );
}
