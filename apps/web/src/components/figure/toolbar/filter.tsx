"use client";

import { FilterIcon } from "lucide-react";
import { Popover } from "@ark-ui/react/popover";
import { Portal } from "@ark-ui/react/portal";
import { getAllYears } from "@cieloazul310/jclub-financial";
import { cx, css } from "styled-system/css";
import { Tooltip } from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import { useTableStore } from "@/providers/table-store-provider";
import type { Mode } from "@/utils/types";
import { CategoryFilter } from "./category-filter";
import { YearFilter } from "./year-filter";

export function useIsFiltered(mode: Mode) {
  const { visibleCategories, visibleYears } = useTableStore((store) => store);

  if (mode === "club") {
    const allYears = getAllYears();
    const [from, to] = visibleYears;
    return (
      from !== allYears[0]?.year || to !== allYears[allYears.length - 1]?.year
    );
  }
  return visibleCategories.length === 0;
}

export function Filter({ mode }: { mode: Mode }) {
  const isFiltered = useIsFiltered(mode);

  return (
    <>
      <Popover.Root>
        <Tooltip content="フィルタを開く">
          <Popover.Trigger asChild>
            <Button
              variant="outline"
              size="xs"
              className={cx(
                css({
                  display: { base: "block", sm: "none" },
                  // display: "block",
                }),
                isFiltered
                  ? css({ colorPalette: "keyColor" })
                  : css({ colorPalette: "solid-gray" }),
              )}
            >
              <FilterIcon />
            </Button>
          </Popover.Trigger>
        </Tooltip>
        <Portal>
          <Popover.Positioner>
            <Popover.Content
              className={css({
                zIndex: 6,
                bg: "white",
                borderRadius: 8,
                p: 4,
                borderColor: "solid-gray.100",
                borderWidth: "1px",
                shadow: "1",
              })}
            >
              <Popover.Title
                className={css({ textStyle: "std-16B-170", mb: 2 })}
              >
                フィルタ
              </Popover.Title>
              {mode === "year" ? <CategoryFilter /> : <YearFilter />}
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
      <div className={css({ display: { base: "none", sm: "block" }, pl: 4 })}>
        {mode === "year" ? <CategoryFilter /> : <YearFilter />}
      </div>
    </>
  );
}
