"use client";

import { FilterIcon } from "lucide-react";
import { css } from "styled-system/css";
import { Button } from "@/components/ui/button";
import { ClubFilter } from "@/components/filter/club";
import { YearFilter } from "@/components/filter/year";
import {
  useYearFiltered,
  useClubFiltered,
} from "@/components/filter/use-is-filtered";
import { DrawerBottom } from "@/components/drawer-bottom";
import { useSeriesStore } from "@/providers/series-store-provider";

export function useIsFiltered({
  visibleYears,
  visibleClubs,
}: {
  visibleYears: [number, number];
  visibleClubs: string[];
}) {
  const yearFiltered = useYearFiltered(visibleYears);
  const clubFiltered = useClubFiltered(visibleClubs);

  return clubFiltered || yearFiltered;
}

export function Filter() {
  const {
    visibleYears,
    visibleClubs,
    setVisibleYearFrom,
    setVisibleYearTo,
    toggleVisibleClub,
    setVisibleClubs,
    setInvisibleClubs,
  } = useSeriesStore((store) => store);
  const isFiltered = useIsFiltered({ visibleClubs, visibleYears });

  return (
    <>
      <DrawerBottom
        title="フィルタ"
        label="フィルタを開く"
        content={
          <div
            className={css({
              display: "grid",
              gridTemplateColumns: "1fr",
              gridTemplateAreas: `
                "year"
                "club"
                `,
              gap: 8,
              pb: 8,
            })}
          >
            <section className={css({ gridArea: "year" })}>
              <h3 className={css({ mb: 2, textStyle: "std-17B-170" })}>
                表示範囲
              </h3>
              <YearFilter
                visibleYears={visibleYears}
                setVisibleYearFrom={setVisibleYearFrom}
                setVisibleYearTo={setVisibleYearTo}
              />
            </section>
            <section className={css({ gridArea: "club" })}>
              <h3 className={css({ mb: 2, textStyle: "std-17B-170" })}>
                表示クラブ
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
          size="sm"
          className={
            isFiltered
              ? css({ colorPalette: "keyColor" })
              : css({ colorPalette: "solid-gray" })
          }
        >
          <FilterIcon />
        </Button>
      </DrawerBottom>
      <div className={css({ display: { base: "none", md: "flex" } })}>
        <YearFilter
          visibleYears={visibleYears}
          setVisibleYearFrom={setVisibleYearFrom}
          setVisibleYearTo={setVisibleYearTo}
        />
      </div>
    </>
  );
}
