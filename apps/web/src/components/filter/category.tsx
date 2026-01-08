"use client";

import { css } from "styled-system/css";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { AllCategories } from "@/utils/category";
import type { Category } from "@/utils/types";
import { ActiveChip, InactiveChip } from "./chips";

type CategoryFilterProps = {
  visibleCategories: Category[];
  toggleVisibleCategory: (category: Category) => void;
  chipClassName?: string;
  chipLabel?: (category: Category) => string;
  disabled?: boolean;
} & HTMLStyledProps<"div">;

export function CategoryFilter({
  visibleCategories,
  toggleVisibleCategory,
  display = "inline-flex",
  gap = 1,
  chipClassName = css({
    minHeight: "unset",
    py: 0.5,
  }),
  chipLabel = (category) => (category === "others" ? "その他" : category),
  ...rest
}: CategoryFilterProps) {
  const props = { display, gap, ...rest };
  const onCategoryClick = (category: Category) => () => {
    toggleVisibleCategory(category);
  };

  return (
    <styled.div {...props}>
      {AllCategories.map((category) =>
        visibleCategories.includes(category) ? (
          <ActiveChip
            key={category}
            className={chipClassName}
            onClick={onCategoryClick(category)}
          >
            {chipLabel(category)}
          </ActiveChip>
        ) : (
          <InactiveChip
            key={category}
            className={chipClassName}
            onClick={onCategoryClick(category)}
          >
            {chipLabel(category)}
          </InactiveChip>
        ),
      )}
    </styled.div>
  );
}
