import type { ExtendedFinancialDatum } from "@cieloazul310/jclub-financial";
import { css } from "styled-system/css";
import { ChartTitle } from "./title";
import { ChartClient } from "./chart-client";
import { getExtentMap } from "./get-extent-map";
import { getAverages } from "./get-averages";

type ChartProps = {
  data: ExtendedFinancialDatum[];
};

export async function Chart({ data }: ChartProps) {
  const height = 400;
  const itemWidth = 40;
  const padding = { top: 20, right: 48, bottom: 40, left: 50 };
  const extentMap = await getExtentMap(data);
  const averages = await getAverages();

  return (
    <figure
      className={css({
        display: "grid",
        width: "max-content",
        maxWidth: "full",
        mx: "auto",
        textStyle: "oln-14N-100",
        fontFamily: "Helvetica, Arial, sans-serif",
        gridTemplateAreas: `
      "caption caption"
      "axis main"
    `,
        gridTemplateColumns: `${padding.left}px 1fr`,
      })}
    >
      <ChartTitle />
      <ChartClient
        data={data}
        height={height}
        itemWidth={itemWidth}
        padding={padding}
        extentMap={extentMap}
        averages={averages}
      />
    </figure>
  );
}
