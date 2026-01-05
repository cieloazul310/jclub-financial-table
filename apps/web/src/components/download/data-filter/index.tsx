"use client";

import { css } from "styled-system/css";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { ClubFilter } from "@/components/filter/club";
import { CategoryFilter } from "@/components/filter/category";
import { useDownloadStore } from "@/providers/download-store-provider";
import type { Category } from "@/utils/types";
import { YearFilter } from "./year-filter";

export function DataFilter({
  display = "flex",
  flexDirection = "column",
  gap = 8,
  ...rest
}: HTMLStyledProps<"div">) {
  const props = { display, flexDirection, gap, ...rest };
  const { visibleCategories, visibleClubs, visibleYears, set, remove, toggle } =
    useDownloadStore((store) => store);

  const setVisibleYears = (years: number[]) => set("visibleYears", years);
  const removeVisibleYears = (years: number[]) => remove("visibleYears", years);
  const toggleVisibleYears = (year: number) => toggle("visibleYears", year);

  const setVisibleClubs = (clubs: string[]) => set("visibleClubs", clubs);
  const removeVisibleClubs = (clubs: string[]) => remove("visibleClubs", clubs);
  const toggleVisibleClubs = (club: string) => toggle("visibleClubs", club);

  const toggleVisibleCategory = (category: Category) =>
    toggle("visibleCategories", category);

  return (
    <styled.div {...props}>
      <section>
        <h3 className={css({ mb: 2, textStyle: "std-17B-170" })}>表示年度</h3>
        <YearFilter
          visibleYears={visibleYears}
          setVisibleYears={setVisibleYears}
          setInvisibleYears={removeVisibleYears}
          toggleVisibleYears={toggleVisibleYears}
        />
      </section>
      <section>
        <h3 className={css({ mb: 2, textStyle: "std-17B-170" })}>表示クラブ</h3>
        <ClubFilter
          gridTemplateColumns="1fr"
          visibleClubs={visibleClubs}
          setVisibleClubs={setVisibleClubs}
          setInvisibleClubs={removeVisibleClubs}
          toggleVisibleClubs={toggleVisibleClubs}
        />
      </section>
      <section>
        <h3 className={css({ mb: 2, textStyle: "std-17B-170" })}>
          表示カテゴリ
        </h3>
        <CategoryFilter
          visibleCategories={visibleCategories}
          toggleVisibleCategory={toggleVisibleCategory}
        />
      </section>
    </styled.div>
  );
}
