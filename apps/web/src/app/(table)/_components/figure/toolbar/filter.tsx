"use client";

import { FilterIcon } from "lucide-react";
import { css } from "styled-system/css";
import { Button } from "@/components/ui/button";
import { DrawerBottom } from "@/components/drawer-bottom";
import { ClubFilter } from "@/components/filter/club";
import { CategoryFilter } from "@/components/filter/category";
import { YearFilter } from "@/components/filter/year";
import {
  useYearFiltered,
  useClubFiltered,
  useCategoriesFiltered,
} from "@/components/filter/use-is-filtered";
import { useTableStore } from "@/providers/table-store-provider";
import type { Mode } from "@/utils/types";

export function useIsFiltered(mode: Mode) {
  const { visibleClubs, visibleCategories, visibleYears } = useTableStore(
    (store) => store,
  );
  const yearFiltered = useYearFiltered(visibleYears);
  const clubFiltered = useClubFiltered(visibleClubs);
  const categoriesFiltered = useCategoriesFiltered(visibleCategories);

  if (mode === "club") return yearFiltered;

  return clubFiltered || categoriesFiltered;
}

export function Filter({ mode }: { mode: Mode }) {
  const isFiltered = useIsFiltered(mode);
  const {
    visibleCategories,
    visibleYears,
    visibleClubs,
    toggleVisibleCategory,
    setVisibleYearFrom,
    setVisibleYearTo,
    toggleVisibleClub,
    setVisibleClubs,
    setInvisibleClubs,
  } = useTableStore((store) => store);

  return (
    <>
      <DrawerBottom
        title="フィルタ"
        label="フィルタを開く"
        content={
          <div
            className={css({
              display: "grid",
              gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
              gridTemplateAreas: {
                base: `
                "year"
                "category"
                "club"
                `,
                md: `
                  "year category"
                  "club club"                
                `,
              },
              gap: 8,
              pb: 8,
            })}
          >
            <section className={css({ gridArea: "year" })}>
              <h3 className={css({ mb: 2, textStyle: "std-17B-170" })}>
                クラブ別 表示範囲
              </h3>
              <YearFilter
                visibleYears={visibleYears}
                setVisibleYearFrom={setVisibleYearFrom}
                setVisibleYearTo={setVisibleYearTo}
              />
            </section>
            <section className={css({ gridArea: "category" })}>
              <h3 className={css({ mb: 2, textStyle: "std-17B-170" })}>
                年度別 表示カテゴリ
              </h3>
              <CategoryFilter
                visibleCategories={visibleCategories}
                toggleVisibleCategory={toggleVisibleCategory}
              />
            </section>
            <section className={css({ gridArea: "club" })}>
              <h3 className={css({ mb: 2, textStyle: "std-17B-170" })}>
                年度別 表示クラブ
              </h3>
              <ClubFilter
                visibleClubs={visibleClubs}
                toggleVisibleClubs={toggleVisibleClub}
                setVisibleClubs={setVisibleClubs}
                setInvisibleClubs={setInvisibleClubs}
              />
            </section>
          </div>
        }
      >
        <Button
          variant="outline"
          size="xs"
          className={
            isFiltered
              ? css({ colorPalette: "keyColor" })
              : css({ colorPalette: "solid-gray" })
          }
        >
          <FilterIcon />
        </Button>
      </DrawerBottom>
      <div className={css({ display: { base: "none", sm: "block" }, pl: 4 })}>
        {mode === "year" ? (
          <CategoryFilter
            visibleCategories={visibleCategories}
            toggleVisibleCategory={toggleVisibleCategory}
          />
        ) : (
          <YearFilter
            visibleYears={visibleYears}
            setVisibleYearFrom={setVisibleYearFrom}
            setVisibleYearTo={setVisibleYearTo}
          />
        )}
      </div>
    </>
  );
}
