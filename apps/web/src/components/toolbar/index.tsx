import { Table, Copy, Filter } from "lucide-react";
import { css } from "styled-system/css";
import { Button } from "@/components/ui/button";
import type { Mode, Tab } from "@/utils/types";
import { YearFilter } from "./year-filter";
import { CategoryFilter } from "./category-filter";
import { Unit } from "./unit";

export function Toolbar({ mode, tab }: { mode: Mode; tab: Tab }) {
  return (
    <div
      className={css({
        py: 1,
        display: "flex",
        alignItems: "center",
        height: "48px",
      })}
    >
      <div className={css({ display: "flex", gap: 1 })}>
        <Button variant="outline" size="xs">
          <Table />
        </Button>
        <Button variant="outline" size="xs">
          <Copy />
        </Button>
        <Button variant="outline" size="xs">
          <Filter />
        </Button>
      </div>
      <div className={css({ flexGrow: 1 })}>
        {mode === "club" ? <YearFilter /> : <CategoryFilter />}
      </div>
      <Unit mode={mode} tab={tab} />
    </div>
  );
}
