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
import { useTab } from "@/utils/tabs";
import { categoryBarFill } from "./bar-gradient";

type XLegendProps = {
  year: number;
  category: string;
  height: number;
  itemWidth: number;
};

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
        fontWeight="bold"
        fill="currentColor"
      >
        {year}
      </text>
      <text
        x={itemWidth / 2}
        y={18}
        dy="4px"
        alignmentBaseline="hanging"
        fill="currentColor"
        fontSize=".95em"
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
        className={css({
          color: { base: "solid-gray.300", _groupHover: "solid-gray.900" },
        })}
        x={itemWidth / 2}
        y={scale(revenue.value)}
        dy="-.4em"
        textAnchor="middle"
        fontWeight="bold"
        fill="currentColor"
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
}: BarProps<Pick<BS, "assets" | "liabilities" | "net_assets">>) {
  const { assets, liabilities, net_assets } = datum;
  if (
    typeof assets?.value !== "number" ||
    typeof liabilities?.value !== "number" ||
    typeof net_assets?.value !== "number"
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
        y={net_assets.value < 0 ? scale(0) : scale(net_assets.value)}
        width={barWidth / (net_assets.value < 0 ? 4 : 2)}
        height={
          (net_assets.value < 0 ? -1 : 1) * (scale(0) - scale(net_assets.value))
        }
        className={
          net_assets.value < 0
            ? css({ fill: "{colors.error.1}" })
            : css({ fill: "{colors.success.1}" })
        }
      />
      <text
        className={css({
          color: { base: "solid-gray.700", _groupHover: "solid-gray.900" },
        })}
        x={itemWidth / 2}
        y={net_assets.value < 0 ? scale(0) : scale(net_assets.value)}
        dy="-.4em"
        textAnchor="middle"
        fontWeight="bold"
        fill="currentColor"
      >
        {net_assets.value}
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
}: BarProps<Pick<Expense, "expenses" | "team_wages">>) {
  const fill = categoryBarFill({ category: datum.category.value });
  const { expenses, team_wages } = datum;
  const othersExp = expenses.value - (team_wages?.value ?? 0);

  return (
    <>
      <rect
        x={(itemWidth * barPadding) / 2}
        y={scale(expenses.value)}
        width={barWidth}
        height={scale(0) - scale(othersExp) - 1}
        className={css({ fill: "{colors.solid-gray.100}" })}
      />
      {team_wages?.value && (
        <>
          <rect
            x={(itemWidth * barPadding) / 2}
            y={scale(team_wages.value)}
            width={barWidth}
            height={scale(0) - scale(team_wages.value) - 1}
            fill={fill}
          />
          <text
            className={css({
              color: { base: "solid-gray.420", _groupHover: "solid-gray.900" },
            })}
            x={itemWidth / 2}
            y={scale(team_wages.value)}
            dy="-.4em"
            textAnchor="middle"
            fontWeight="bold"
            fill="currentColor"
          >
            {team_wages.value}
          </text>
        </>
      )}
      <text
        className={css({
          color: { base: "solid-gray.300", _groupHover: "solid-gray.900" },
        })}
        x={itemWidth / 2}
        y={scale(expenses.value)}
        dy="-.4em"
        textAnchor="middle"
        fontWeight="bold"
        fill="currentColor"
      >
        {expenses.value}
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
}: BarProps<Pick<Attd, "average_attendance">>) {
  const { average_attendance, category } = datum;
  const fill = categoryBarFill({ category: category.value });
  return (
    <>
      <rect
        x={(itemWidth * barPadding) / 2}
        y={scale(average_attendance.value)}
        width={barWidth}
        height={scale(0) - scale(average_attendance.value)}
        fill={fill}
      />
      <text
        className={css({
          color: { base: "solid-gray.420", _groupHover: "solid-gray.900" },
        })}
        x={itemWidth / 2}
        y={scale(average_attendance.value)}
        dy="-.4em"
        fontSize="90%"
        textAnchor="middle"
        fontWeight="bold"
        fill="currentColor"
      >
        {average_attendance.value}
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
  // const { tab } = useTableStore((store) => store);
  const tab = useTab();
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
