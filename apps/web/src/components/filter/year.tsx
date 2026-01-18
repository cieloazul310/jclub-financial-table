"use client";

import { getAllYears } from "@cieloazul310/jclub-financial";
import { cx, css } from "styled-system/css";
import { Fieldset } from "@/components/ui/fieldset";
import { Field } from "@/components/ui/field";

type YearFilterProps = {
  visibleYears: [number, number];
  setVisibleYearFrom: (year: number) => void;
  setVisibleYearTo: (year: number) => void;
  selectSize?: Field.RootProps["size"];
  classes?: Partial<{
    root: string;
    item: string;
    select: string;
  }>;
} & Fieldset.RootProps;

export function YearFilter({
  visibleYears,
  setVisibleYearFrom,
  setVisibleYearTo,
  selectSize = "md",
  className,
  classes = {
    root: css({ display: "flex", alignItems: "center", gap: 2 }),
    item: css({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 1,
    }),
    select: css({ textStyle: "oln-16N-100", px: 2, py: 2, height: "auto" }),
  },
  ...props
}: YearFilterProps) {
  const allYears = getAllYears().map(({ year }) => year);
  const [from, to] = visibleYears;
  const onFromChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setVisibleYearFrom(parseInt(value, 10));
    }
  };
  const onToChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setVisibleYearTo(parseInt(value, 10));
    }
  };

  return (
    <Fieldset.Root className={cx(classes.root, className)} {...props}>
      <Field.Root className={classes.item} size={selectSize}>
        <Field.Label textWrapMode="nowrap">開始年</Field.Label>
        <Field.Select
          className={classes.select}
          value={from}
          onChange={onFromChange}
          asChild
        >
          <select>
            {allYears.map((year) => (
              <option key={year.toString()} value={year} disabled={year > to}>
                {year}
              </option>
            ))}
          </select>
        </Field.Select>
      </Field.Root>
      <Field.Root className={classes.item} size={selectSize}>
        <Field.Label textWrapMode="nowrap">終了年</Field.Label>
        <Field.Select
          className={classes.select}
          value={to}
          onChange={onToChange}
          asChild
        >
          <select>
            {allYears.map((year) => (
              <option key={year.toString()} value={year} disabled={year < from}>
                {year}
              </option>
            ))}
          </select>
        </Field.Select>
      </Field.Root>
    </Fieldset.Root>
  );
}
