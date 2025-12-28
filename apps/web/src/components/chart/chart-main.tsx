import type { FinancialDatum } from "@cieloazul310/jclub-financial";
import type { ScaleLinear } from "d3";
import { css } from "styled-system/css";
import { Bars } from "./bars";
import { BarGradient } from "./bar-gradient";
import { AverageLines } from "./average-lines";
import type { Averages } from "./get-averages";

type ChartMainProps = {
  data: FinancialDatum[];
  height: number;
  itemWidth: number;
  padding: { top: number; left: number; right: number; bottom: number };
  scale: ScaleLinear<number, number>;
  averages: Averages;
};

export function ChartMain({
  data,
  height,
  itemWidth,
  padding,
  scale,
  averages,
}: ChartMainProps) {
  const chartWidth = data.length * itemWidth + padding.right;
  const chartHeight = height + padding.top + padding.bottom;
  const ticks = scale.ticks();

  return (
    <svg
      className={css({
        textStyle: "oln-14N-100",
        color: "solid-gray.800",
      })}
      width={chartWidth}
      height={chartHeight}
      textAnchor="middle"
    >
      <BarGradient />
      <g transform={`translate(0, ${padding.top})`}>
        <Bars data={data} height={height} scale={scale} itemWidth={itemWidth} />
        <g strokeWidth={1}>
          {ticks.map(
            (value) =>
              value !== 0 && (
                <line
                  key={value.toString()}
                  x1={0}
                  x2={chartWidth}
                  y1={scale(value)}
                  y2={scale(value)}
                  className={css({ stroke: "solid-gray.420" })}
                />
              ),
          )}
        </g>
        <AverageLines
          data={data}
          itemWidth={itemWidth}
          scale={scale}
          averages={averages}
        />
        <line
          x1={0}
          x2={chartWidth}
          y1={scale(0)}
          y2={scale(0)}
          stroke="currentColor"
        />
      </g>
    </svg>
  );
}
