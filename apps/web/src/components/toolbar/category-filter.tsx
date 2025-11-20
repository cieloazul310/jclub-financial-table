"use client";

import { css } from "styled-system/css";
import { ChipTag } from "@/components/ui/chip-tag";
import { useTableStore } from "@/providers/table-store-provider";
import type { Category } from "@/utils/types";

function VisibleChip({ children, ...props }: ChipTag.RootProps) {
  return (
    <ChipTag.Root colorPalette="keyColor" {...props}>
      <ChipTag.Label>{children}</ChipTag.Label>
      <ChipTag.RemoveButton />
    </ChipTag.Root>
  );
}

function InvisibleChip({ children, ...props }: ChipTag.RootProps) {
  return (
    <ChipTag.Root colorPalette="solid-gray" {...props}>
      <ChipTag.Label>{children}</ChipTag.Label>
      <ChipTag.AddButton />
    </ChipTag.Root>
  );
}

export function CategoryFilter() {
  const { filterCategories, toggleFilterCategory } = useTableStore(
    (table) => table,
  );
  const categories: Category[] = ["J1", "J2", "J3", "others"];

  return (
    <div className={css({ display: "flex", gap: 1 })}>
      {categories.map((category) =>
        filterCategories.includes(category) ? (
          <VisibleChip
            key={category}
            onClick={() => toggleFilterCategory(category)}
          >
            {category}
          </VisibleChip>
        ) : (
          <InvisibleChip
            key={category}
            onClick={() => toggleFilterCategory(category)}
          >
            {category}
          </InvisibleChip>
        ),
      )}
    </div>
  );
}
