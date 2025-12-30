"use client";

import { ExtendedFinancialDatum } from "@cieloazul310/jclub-financial";
import { scaleLinear } from "d3";
import { css } from "styled-system/css";
import { useTableStore } from "@/providers/table-store-provider";
import type { Tab } from "@/utils/types";
import { AxisY } from "./axis-y";
import { ChartMain } from "./chart-main";
import type { Averages } from "./get-averages";

type ChartClientProps = {
  itemWidth: number;
  height: number;
  padding: { top: number; left: number; right: number; bottom: number };
  data: ExtendedFinancialDatum[];
  extentMap: Record<Tab, [number, number]>;
  averages: Averages;
};

export function ChartClient({
  itemWidth,
  height,
  padding,
  data,
  extentMap,
  averages,
}: ChartClientProps) {
  const { tab } = useTableStore((store) => store);
  const [min, max] = extentMap[tab];
  const scale = scaleLinear().domain([min, max]).range([height, 0]).nice();

  return (
    <>
      <div
        className={css({
          gridArea: "axis",
          width: padding.left,
          height: height + padding.top + padding.bottom,
        })}
      >
        <AxisY scale={scale} padding={padding} chartHeight={height} />
      </div>
      <div
        className={css({
          gridArea: "main",
          width: "full",
          height: height + padding.top + padding.bottom,
          overflowX: "auto",
          overflowY: "hidden",
        })}
      >
        <ChartMain
          data={data}
          itemWidth={itemWidth}
          height={height}
          padding={padding}
          scale={scale}
          averages={averages}
        />
      </div>
    </>
  );
}
