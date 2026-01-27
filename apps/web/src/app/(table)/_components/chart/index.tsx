import type { ExtendedFinancialDatum } from "@cieloazul310/jclub-financial";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { ChartTitle } from "./title";
import { ChartClient } from "./chart-client";
import { getExtentMap } from "./get-extent-map";
import { getAverages } from "./get-averages";

type ChartProps = {
  data: ExtendedFinancialDatum[];
} & Omit<
  HTMLStyledProps<"figure">,
  "display" | "gridTemplateAreas" | "gridTemplateColumns"
>;

export async function Chart({
  data,
  width = "max-content",
  maxWidth = "full",
  mx = "auto",
  textStyle = "oln-14N-100",
  fontFamily = "table",
  ...rest
}: ChartProps) {
  const props = { width, maxWidth, mx, textStyle, fontFamily, ...rest };
  const height = 400;
  const itemWidth = 40;
  const padding = { top: 20, right: 48, bottom: 40, left: 50 };
  const extentMap = await getExtentMap(data);
  const averages = await getAverages();

  return (
    <styled.figure
      display="grid"
      gridTemplateAreas={`
      "caption caption"
      "axis main"
    `}
      gridTemplateColumns={`${padding.left}px 1fr`}
      {...props}
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
    </styled.figure>
  );
}
