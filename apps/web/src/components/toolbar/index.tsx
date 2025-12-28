import { css } from "styled-system/css";
import type { Mode, Tab } from "@/utils/types";
import { YearFilter } from "./year-filter";
import { CategoryFilter } from "./category-filter";
import { Unit } from "./unit";

export function Toolbar({ mode, tab }: { mode: Mode; tab: Tab }) {
  return (
    <div className={css({ py: 1, display: "flex" })}>
      <div className={css({ flexGrow: 1 })}>
        {mode === "club" ? <YearFilter /> : <CategoryFilter />}
      </div>
      <Unit mode={mode} tab={tab} />
    </div>
  );
}
