import type { ExtendedFinancialDatum } from "@cieloazul310/jclub-financial/types";
import {
  PLTableHeadRow,
  BSTableHeadRow,
  RevenueTableHeadRow,
  ExpenseTableHeadRow,
  AttdTableHeadRow,
} from "./head-row";
import {
  PLTableRow,
  BSTableRow,
  RevenueTableRow,
  ExpenseTableRow,
  AttdTableRow,
} from "./body-row";
import type { Mode } from "@/utils/types";

export const row = {
  pl: {
    head: (mode: Mode) => <PLTableHeadRow mode={mode} />,
    renderRow: (datum: ExtendedFinancialDatum, mode: Mode, index: number) => (
      <PLTableRow
        key={`${datum.name.value}-${datum.year.value}`}
        datum={datum}
        mode={mode}
        index={index}
      />
    ),
  },
  bs: {
    head: (mode: Mode) => <BSTableHeadRow mode={mode} />,
    renderRow: (datum: ExtendedFinancialDatum, mode: Mode, index: number) => (
      <BSTableRow
        key={`${datum.name.value}-${datum.year.value}`}
        datum={datum}
        mode={mode}
        index={index}
      />
    ),
  },
  revenue: {
    head: (mode: Mode) => <RevenueTableHeadRow mode={mode} />,
    renderRow: (datum: ExtendedFinancialDatum, mode: Mode, index: number) => (
      <RevenueTableRow
        key={`${datum.name.value}-${datum.year.value}`}
        datum={datum}
        mode={mode}
        index={index}
      />
    ),
  },
  expense: {
    head: (mode: Mode) => <ExpenseTableHeadRow mode={mode} />,
    renderRow: (datum: ExtendedFinancialDatum, mode: Mode, index: number) => (
      <ExpenseTableRow
        key={`${datum.name.value}-${datum.year.value}`}
        datum={datum}
        mode={mode}
        index={index}
      />
    ),
  },
  attd: {
    head: (mode: Mode) => <AttdTableHeadRow mode={mode} />,
    renderRow: (datum: ExtendedFinancialDatum, mode: Mode, index: number) => (
      <AttdTableRow
        key={`${datum.name.value}-${datum.year.value}`}
        datum={datum}
        mode={mode}
        index={index}
      />
    ),
  },
};
