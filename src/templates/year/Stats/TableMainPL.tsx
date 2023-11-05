import * as React from "react";
import TableSet from "./TableSet";
import type { Year } from "../../../../types";

type TableMainPLProps = {
  year: Pick<Year, "year" | "stats">;
  prevYear: Pick<Year, "stats"> | null;
};

function TableMainPL({ year, prevYear }: TableMainPLProps) {
  return (
    <TableSet
      title="営業収入"
      statsKey="revenue"
      year={year}
      prevYear={prevYear}
    />
  );
}

export default TableMainPL;
