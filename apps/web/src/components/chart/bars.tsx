"use client";

import type { ScaleLinear } from "d3";
import type {
  ExtendedFinancialDatum,
  Extended,
  General,
  PL,
  BS,
  Attd,
  Expense,
  FinancialDatum,
} from "@cieloazul310/jclub-financial";
import { cx, css } from "styled-system/css";
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

type BarProps<T extends Partial<FinancialDatum>> = {
  datum: Extended<T & Pick<General, "category">>;
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
  const fill = categoryBarFill({ category: category.value });

  return (
    <>
      <rect
        x={(itemWidth * barPadding) / 2}
        y={scale(revenue.value)}
        width={barWidth}
        height={scale(0) - scale(revenue.value)}
        fill={fill}
      />
      <text
        className={css({ display: { base: "none", _groupHover: "block" } })}
        x={itemWidth / 2}
        y={scale(revenue.value)}
        dy="-.4em"
        textAnchor="middle"
        fontWeight="bold"
      >
        {revenue.value}
      </text>
    </>
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
    typeof assets?.value !== "number" ||
    typeof liabilities?.value !== "number" ||
    typeof net_worth?.value !== "number"
  )
    return null;

  return (
    <>
      <rect
        x={(itemWidth * barPadding) / 2}
        y={scale(assets.value)}
        width={barWidth / 2}
        height={scale(0) - scale(assets.value)}
        className={css({ fill: "{colors.solid-gray.300}" })}
      />
      <rect
        x={itemWidth / 2}
        y={scale(assets.value)}
        width={barWidth / 2}
        height={scale(0) - scale(liabilities.value)}
        className={css({ fill: "{colors.solid-gray.200}" })}
      />
      <rect
        x={itemWidth / 2}
        y={net_worth.value < 0 ? scale(0) : scale(net_worth.value)}
        width={barWidth / (net_worth.value < 0 ? 4 : 2)}
        height={
          (net_worth.value < 0 ? -1 : 1) * (scale(0) - scale(net_worth.value))
        }
        className={
          net_worth.value < 0
            ? css({ fill: "{colors.error.1}" })
            : css({ fill: "{colors.success.1}" })
        }
      />
      <text
        className={css({ display: { base: "none", _groupHover: "block" } })}
        x={itemWidth / 2}
        y={net_worth.value < 0 ? scale(0) : scale(net_worth.value)}
        dy="-.4em"
        textAnchor="middle"
        fontWeight="bold"
      >
        {net_worth.value}
      </text>
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
  const fill = categoryBarFill({ category: datum.category.value });
  const { expense, salary } = datum;
  const othersExp = expense.value - (salary?.value ?? 0);

  return (
    <>
      <rect
        x={(itemWidth * barPadding) / 2}
        y={scale(expense.value)}
        width={barWidth}
        height={scale(0) - scale(othersExp) - 1}
        className={css({ fill: "{colors.solid-gray.100}" })}
      />
      {salary?.value && (
        <>
          <rect
            x={(itemWidth * barPadding) / 2}
            y={scale(salary.value)}
            width={barWidth}
            height={scale(0) - scale(salary.value) - 1}
            fill={fill}
          />
          <text
            className={css({ display: { base: "none", _groupHover: "block" } })}
            x={itemWidth / 2}
            y={scale(salary.value)}
            dy="-.4em"
            textAnchor="middle"
            fontWeight="bold"
          >
            {salary.value}
          </text>
        </>
      )}
      <text
        className={css({
          display: { base: "none", _groupHover: "block" },
          color: "solid-gray.600",
        })}
        x={itemWidth / 2}
        y={scale(expense.value)}
        dy="-.4em"
        textAnchor="middle"
        fontWeight="bold"
        fill="currentColor"
      >
        {expense.value}
      </text>
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
  const fill = categoryBarFill({ category: category.value });
  return (
    <>
      <rect
        x={(itemWidth * barPadding) / 2}
        y={scale(average_attd.value)}
        width={barWidth}
        height={scale(0) - scale(average_attd.value)}
        fill={fill}
      />
      <text
        className={css({ display: { base: "none", _groupHover: "block" } })}
        x={itemWidth / 2}
        y={scale(average_attd.value)}
        dy="-.4em"
        textAnchor="middle"
        fontWeight="bold"
      >
        {average_attd.value}
      </text>
    </>
  );
}

type BarsProps = {
  data: ExtendedFinancialDatum[];
  scale: ScaleLinear<number, number>;
  height: number;
  itemWidth: number;
};

export function Bars({ data, scale, height, itemWidth }: BarsProps) {
  const { tab } = useTableStore((store) => store);
  const barPadding = 0.2;
  const barWidth = itemWidth * (1 - barPadding);

  const barByTab = (datum: ExtendedFinancialDatum) => {
    const props = {
      datum,
      scale,
      itemWidth,
      barWidth,
      barPadding,
    };

    if (tab === "bs")
      return <BSBar key={datum.year.value.toString()} {...props} />;
    if (tab === "expense")
      return <ExpenseBar key={datum.year.value.toString()} {...props} />;
    if (tab === "attd")
      return <AttdBar key={datum.year.value.toString()} {...props} />;
    return <PLBar key={datum.year.value.toString()} {...props} />;
  };

  return (
    <g>
      {data.map((datum, index) => (
        <g
          key={datum.year.value.toString()}
          className={cx("group", css({ color: "solid-gray.300" }))}
          transform={`translate(${itemWidth * index}, 0)`}
        >
          {barByTab(datum)}
          <XLegend
            year={datum.year.value}
            category={datum.category.value}
            height={height}
            itemWidth={itemWidth}
          />
        </g>
      ))}
    </g>
  );
}
