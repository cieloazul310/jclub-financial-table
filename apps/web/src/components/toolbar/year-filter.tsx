"use client";

import { css } from "styled-system/css";
import { Fieldset } from "@/components/ui/fieldset";
import { Field } from "@/components/ui/field";
import { useTableStore } from "@/providers/table-store-provider";

export function YearFilter() {
  const { filterYears, setFilterYearFrom, setFilterYearTo } = useTableStore(
    (store) => store,
  );
  const [from, to] = filterYears;
  const onFromChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setFilterYearFrom(parseInt(value, 10));
    }
  };
  const onToChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setFilterYearTo(parseInt(value, 10));
    }
  };
  const selectStyle = css.raw({
    textStyle: "oln-16N-100",
    px: 2,
    py: 2,
    height: "auto",
  });

  return (
    <Fieldset.Root
      className={css({ display: "flex", alignItems: "center", gap: 4 })}
    >
      <Field.Root
        id="filter-year-from"
        className={css({
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        })}
        size="sm"
      >
        <Field.Label textWrapMode="nowrap">開始年</Field.Label>
        <Field.Select
          value={from}
          onChange={onFromChange}
          {...selectStyle}
          asChild
        >
          <select>
            {Array.from({ length: 20 }, (_, i) => i + 2005).map((year) => (
              <option key={year.toString()} value={year} disabled={year > to}>
                {year}
              </option>
            ))}
          </select>
        </Field.Select>
      </Field.Root>
      <Field.Root
        id="filter-year-to"
        className={css({
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        })}
        size="sm"
      >
        <Field.Label textWrapMode="nowrap">終了年</Field.Label>
        <Field.Select value={to} onChange={onToChange} {...selectStyle} asChild>
          <select>
            {Array.from({ length: 20 }, (_, i) => i + 2005).map((year) => (
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
