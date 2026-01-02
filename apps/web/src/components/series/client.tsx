"use client";

import type { FinancialDatum } from "@cieloazul310/jclub-financial";
import { css } from "styled-system/css";
import { SeriesSelect } from "./select";
import { SeriesTable } from "./table";

type SeriesClientProps = {
  dataset: {
    slug: string;
    category: string;
    name: string;
    short_name: string;
    data: (FinancialDatum | null)[];
  }[];
};

export function SeriesClient({ dataset }: SeriesClientProps) {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 4,
        pt: 8,
        maxWidth: "full",
      })}
    >
      <div className={css({ display: "flex", justifyContent: "center" })}>
        <SeriesSelect />
      </div>
      <div className={css({ maxWidth: "full" })}>
        <SeriesTable dataset={dataset} />
      </div>
    </div>
  );
}
