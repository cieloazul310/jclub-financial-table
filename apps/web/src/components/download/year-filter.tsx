"use client";

import { getAllYears } from "@cieloazul310/jclub-financial";
import { css } from "styled-system/css";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { Checkbox } from "@/components/ui/checkbox";
import { ActiveChip, InactiveChip } from "@/components/filter/chips";

type YearFilterProps = {
  visibleYears: number[];
  toggleVisibleYears: (year: number) => void;
  setVisibleYears: (allYears: number[]) => void;
  setInvisibleYears: (allYears: number[]) => void;
  chipClassName?: string;
  chipLabel?: (year: number) => string;
} & HTMLStyledProps<"div">;

export function YearFilter({
  visibleYears,
  toggleVisibleYears,
  setVisibleYears,
  setInvisibleYears,
  chipClassName = css({
    minHeight: "unset",
    py: 0.5,
    textStyle: "oln-14B-100",
  }),
  ...rest
}: YearFilterProps) {
  const props = { ...rest };
  const allYears = getAllYears().map(({ year }) => year);

  const onYearClick = (year: number) => () => {
    toggleVisibleYears(year);
  };
  const onCheckedChange = () => {
    if (visibleYears.length === allYears.length) {
      setInvisibleYears(allYears);
    } else {
      setVisibleYears(allYears);
    }
  };

  return (
    <styled.div {...props}>
      <Checkbox.Root
        checked={
          visibleYears.length === allYears.length
            ? true
            : visibleYears.length === 0
              ? false
              : "indeterminate"
        }
        onCheckedChange={onCheckedChange}
      >
        <Checkbox.Control>
          <Checkbox.Indicator />
          <Checkbox.Indicator indeterminate />
        </Checkbox.Control>
        <Checkbox.HiddenInput />
        <Checkbox.Label>年</Checkbox.Label>
      </Checkbox.Root>
      <div
        className={css({
          display: "inline-flex",
          gap: 1,
          flexWrap: "wrap",
        })}
      >
        {allYears.map((year) =>
          visibleYears.includes(year) ? (
            <ActiveChip
              key={year}
              className={chipClassName}
              onClick={onYearClick(year)}
            >
              {year}
            </ActiveChip>
          ) : (
            <InactiveChip
              key={year}
              className={chipClassName}
              onClick={onYearClick(year)}
            >
              {year}
            </InactiveChip>
          ),
        )}
      </div>
    </styled.div>
  );
}
