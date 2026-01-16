import {
  getAllYears,
  type ExtendedFinancialDatum,
} from "@cieloazul310/jclub-financial";
import { line as d3Line, Line, ScaleLinear } from "d3";
import { css } from "styled-system/css";
import { useTableStore } from "@/providers/table-store-provider";
import { useTab } from "@/utils/tabs";
import type { Tab } from "@/utils/types";
import type { Averages, AverageValues } from "./get-averages";

function detectStatisticsField(tab: Tab) {
  if (tab === "attd") return "average_attd";
  if (tab === "expense") return "salary";
  return "revenue";
}

function categoryStrokeColor(category: string) {
  if (category === "J1") return css({ stroke: "red.800" });
  if (category === "J2") return css({ stroke: "green.800" });
  if (category === "J3") return css({ stroke: "blue.800" });
  return undefined;
}

function useAverageLine(
  scale: ScaleLinear<number, number>,
  dataYears: number[],
  itemWidth: number,
) {
  const allYears = getAllYears()
    .map(({ year }) => year)
    .sort((a, b) => a - b);
  const diff = (dataYears[0] ?? 2005) - (allYears[0] ?? 2005);

  return d3Line<AverageValues>()
    .x((d) => (allYears.indexOf(d.year) - diff) * itemWidth + itemWidth / 2)
    .y((d) => scale(d.value));
}

type CategoryLineProps = {
  scale: ScaleLinear<number, number>;
  itemWidth: number;
  category: string;
  line: Line<AverageValues>;
  dataLength: number;
  averages: Averages;
  tab: Tab;
};

function CategoryLine({
  scale,
  itemWidth,
  dataLength,
  category,
  line,
  averages,
  tab,
}: CategoryLineProps) {
  const field = detectStatisticsField(tab);
  const data = (() => {
    if (category === "J1") return averages.j1[field];
    if (category === "J2") return averages.j2[field];
    if (category === "J3") return averages.j3[field];
    return null;
  })();

  if (!data) return null;

  return (
    <g className={css({ color: "solid-gray.800" })}>
      <path
        d={line(data) ?? undefined}
        fill="none"
        className={categoryStrokeColor(category)}
      />
      <text
        x={itemWidth * dataLength}
        y={scale(data[data.length - 1]?.value ?? 0)}
        textAnchor="start"
        fill="currentColor"
        alignmentBaseline="middle"
      >
        {category}平均
      </text>
    </g>
  );
}

type AverageLinesTypes = {
  scale: ScaleLinear<number, number>;
  data: ExtendedFinancialDatum[];
  itemWidth: number;
  averages: Averages;
};

/**
 * SVG上にカテゴリ別の年度別平均値を表示するコンポーネント
 */
export function AverageLines({
  scale,
  data,
  itemWidth,
  averages,
}: AverageLinesTypes) {
  // const { tab } = useTableStore((store) => store);
  const tab = useTab();
  const dataYears = data.map(({ year }) => year.value);
  const line = useAverageLine(scale, dataYears, itemWidth);
  if (tab === "bs") return null;

  const categories = Array.from(
    new Set(data.map(({ category }) => category.value)),
  );

  return (
    <g strokeWidth={2} strokeDasharray="4,2">
      {categories.map((category) => (
        <CategoryLine
          key={category}
          scale={scale}
          itemWidth={itemWidth}
          category={category}
          line={line}
          dataLength={data.length}
          averages={averages}
          tab={tab}
        />
      ))}
    </g>
  );
}
