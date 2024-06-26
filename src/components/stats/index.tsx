import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import type { Year } from "types";
import TableHeader from "./table-header";
import TableClubs from "./table-clubs";
import TableMain from "./table-main";

type StatsProps = {
  year: Pick<Year, "year" | "stats">;
  prevYear: Pick<Year, "stats"> | null;
};

function Stats({ year, prevYear }: StatsProps) {
  return (
    <TableContainer>
      <Table size="small" stickyHeader sx={{ minWidth: "400px" }}>
        <TableHeader year={year.year} />
        <TableBody>
          <TableClubs year={year} />
          <TableMain year={year} prevYear={prevYear} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Stats;
