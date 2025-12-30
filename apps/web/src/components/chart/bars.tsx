"use client";

import type { ScaleLinear } from "d3";
import type {
  FinancialDatum,
  General,
  PL,
  BS,
  Attd,
  Expense,
} from "@cieloazul310/jclub-financial";
import { css } from "styled-system/css";
import { useTableStore } from "@/providers/table-store-provider";
import { categoryBarFill } from "./bar-gradient";

type XLegendProps = {
  year: number;
  category: string;
  height: number;
  itemWidth: number;
};

function getYearLabel(year: number) {
  if (year % 5 === 0) return year.toString();
  return year.toString().slice(2);
}

function XLegend({ year, category, height, itemWidth }: XLegendProps) {
  return (
    <g
      className={css({ color: "solid-gray.800" })}
      transform={`translate(0, ${height})`}
    >
      <text
        x={itemWidth / 2}
        dy="4px"
        alignmentBaseline="hanging"
        fill="currentColor"
      >
        {getYearLabel(year)}
      </text>
      <text
        x={itemWidth / 2}
        y={14}
        dy="4px"
        alignmentBaseline="hanging"
        fill="currentColor"
      >
        {category}
      </text>
    </g>
  );
}

type BarProps<T> = {
  datum: T & Pick<General, "category">;
  scale: ScaleLinear<number, number>;
  itemWidth: number;
  barWidth: number;
  barPadding: number;
};

function PLBar({
  datum,
  scale,
  itemWidth,
  barWidth,
  barPadding,
}: BarProps<Pick<PL, "revenue">>) {
  const { revenue, category } = datum;
  const fill = categoryBarFill({ category });

  return (
    <rect
      x={(itemWidth * barPadding) / 2}
      y={scale(revenue)}
      width={barWidth}
      height={scale(0) - scale(revenue)}
      fill={fill}
    />
  );
}

function BSBar({
  datum,
  scale,
  itemWidth,
  barWidth,
  barPadding,
}: BarProps<Pick<BS, "assets" | "liabilities" | "net_worth">>) {
  const { assets, liabilities, net_worth } = datum;
  if (
    typeof assets !== "number" ||
    typeof liabilities !== "number" ||
    typeof net_worth !== "number"
  )
    return null;

  return (
    <>
      <rect
        x={(itemWidth * barPadding) / 2}
        y={scale(assets)}
        width={barWidth / 2}
        height={scale(0) - scale(assets)}
        className={css({ fill: "{colors.solid-gray.300}" })}
      />
      <rect
        x={itemWidth / 2}
        y={scale(assets)}
        width={barWidth / 2}
        height={scale(0) - scale(liabilities) - 1}
        className={css({ fill: "{colors.solid-gray.200}" })}
      />
      <rect
        x={itemWidth / 2}
        y={net_worth < 0 ? scale(0) : scale(net_worth)}
        width={barWidth / (net_worth < 0 ? 4 : 2)}
        height={(net_worth < 0 ? -1 : 1) * (scale(0) - scale(net_worth))}
        className={
          net_worth < 0
            ? css({ fill: "{colors.error.1}" })
            : css({ fill: "{colors.success.1}" })
        }
      />
    </>
  );
}

function ExpenseBar({
  datum,
  scale,
  itemWidth,
  barWidth,
  barPadding,
}: BarProps<Pick<Expense, "expense" | "salary">>) {
  const fill = categoryBarFill(datum);
  const { expense, salary } = datum;
  const othersExp = expense - (salary ?? 0);

  return (
    <>
      <rect
        x={(itemWidth * barPadding) / 2}
        y={scale(expense)}
        width={barWidth}
        height={scale(0) - scale(othersExp) - 1}
        className={css({ fill: "{colors.solid-gray.100}" })}
      />
      {salary && (
        <rect
          x={(itemWidth * barPadding) / 2}
          y={scale(salary)}
          width={barWidth}
          height={scale(0) - scale(salary) - 1}
          fill={fill}
        />
      )}
    </>
  );
}

function AttdBar({
  datum,
  scale,
  itemWidth,
  barWidth,
  barPadding,
}: BarProps<Pick<Attd, "average_attd">>) {
  const { average_attd, category } = datum;
  const fill = categoryBarFill({ category });
  return (
    <rect
      x={(itemWidth * barPadding) / 2}
      y={scale(average_attd)}
      width={barWidth}
      height={scale(0) - scale(average_attd)}
      fill={fill}
    />
  );
}

type BarsProps = {
  data: FinancialDatum[];
  scale: ScaleLinear<number, number>;
  height: number;
  itemWidth: number;
};

export function Bars({ data, scale, height, itemWidth }: BarsProps) {
  const { tab } = useTableStore((store) => store);
  const barPadding = 0.2;
  const barWidth = itemWidth * (1 - barPadding);

  function barByTab(datum: FinancialDatum) {
    if (tab === "bs")
      return (
        <BSBar
          key={datum.year.toString()}
          datum={datum}
          scale={scale}
          itemWidth={itemWidth}
          barWidth={barWidth}
          barPadding={barPadding}
        />
      );
    if (tab === "expense")
      return (
        <ExpenseBar
          key={datum.year.toString()}
          datum={datum}
          scale={scale}
          itemWidth={itemWidth}
          barWidth={barWidth}
          barPadding={barPadding}
        />
      );
    if (tab === "attd")
      return (
        <AttdBar
          key={datum.year.toString()}
          datum={datum}
          scale={scale}
          itemWidth={itemWidth}
          barWidth={barWidth}
          barPadding={barPadding}
        />
      );
    return (
      <PLBar
        key={datum.year.toString()}
        datum={datum}
        scale={scale}
        itemWidth={itemWidth}
        barWidth={barWidth}
        barPadding={barPadding}
      />
    );
  }

  return (
    <g>
      {data.map((datum, index) => (
        <g
          key={datum.year.toString()}
          className={css({ color: "solid-gray.300" })}
          transform={`translate(${itemWidth * index}, 0)`}
        >
          {barByTab(datum)}
          <XLegend
            year={datum.year}
            category={datum.category}
            height={height}
            itemWidth={itemWidth}
          />
        </g>
      ))}
    </g>
  );
}
