import type {
  General,
  SeasonResult,
  PL,
  BS,
  Revenue,
  Expense,
  Attd,
  Extended,
  FinancialDatum,
} from "@cieloazul310/jclub-financial/types";
import { cx, css } from "styled-system/css";
import type { ComponentProps } from "styled-system/types";
import { Table } from "@/components/ui/table";
import { CategoryLabel } from "@/components/category-label";
import { format } from "@/utils/format";
import type { Mode } from "@/utils/types";
import { TableBodyLabel } from "./label";
import { valueStyle } from "./styles";

type TableBodyHeaderProps = {
  mode: Mode;
  index: number;
  datum: Extended<
    Pick<
      General & SeasonResult,
      "category" | "rank" | "elevation" | "clubId" | "year" | "short_name"
    >
  >;
  // selected?: boolean;
};

function TableBodyHeader({ mode, index, datum }: TableBodyHeaderProps) {
  return (
    <>
      <TableBodyLabel mode={mode} datum={datum} index={index} />
      <Table.Cell width="80px" align="center" verticalAlign="middle" p={0}>
        <CategoryLabel category={datum.category.value ?? ""} />
      </Table.Cell>
      <Table.Cell
        className={cx(
          datum.elevation?.value && css({ fontWeight: "bold" }),
          datum.elevation?.value === "昇格" &&
            css({
              color: "success.2",
            }),
          datum.elevation?.value === "降格" &&
            css({
              color: "error.2",
            }),
        )}
        width="80px"
        borderRightWidth="1px"
        borderColor="solid-gray.200"
        align="center"
        padding="none"
      >
        {datum.rank.value}
      </Table.Cell>
    </>
  );
}

type DataTableCellProps = {
  value: { value: number | undefined | null } | undefined | null;
  emphasized?: boolean;
  separator?: boolean;
  strong?: boolean;
  redIfMinus?: boolean;
} & Omit<ComponentProps<typeof Table.Cell>, "children">;

function DataTableCell({
  value,
  emphasized = false,
  strong = false,
  separator = false,
  redIfMinus = false,
  align = "right",
  ...props
}: DataTableCellProps) {
  const red =
    redIfMinus && typeof value?.value === "number" && value?.value < 0;

  return (
    <Table.Cell
      className={valueStyle({ strong, emphasized, red })}
      align={align}
      {...props}
    >
      {format(value?.value ?? null, { separator })}
    </Table.Cell>
  );
}

type TableRowProps<T extends Partial<FinancialDatum>> = {
  mode: Mode;
  index: number;
  datum: Extended<
    Pick<
      General & SeasonResult,
      "category" | "rank" | "elevation" | "clubId" | "year" | "short_name"
    > &
      T
  >;
};

export function PLTableRow({ datum, mode, index }: TableRowProps<PL>) {
  return (
    <Table.Row>
      <TableBodyHeader mode={mode} datum={datum} index={index} />
      <DataTableCell value={datum.revenue} strong />
      <DataTableCell value={datum.expense} strong />
      <DataTableCell value={datum.op_profit} emphasized />
      <DataTableCell value={datum.no_rev} />
      <DataTableCell value={datum.no_exp} />
      <DataTableCell value={datum.ordinary_profit} emphasized />
      <DataTableCell value={datum.sp_rev} />
      <DataTableCell value={datum.sp_exp} />
      <DataTableCell value={datum.profit_before_tax} emphasized />
      <DataTableCell value={datum.tax} />
      <DataTableCell value={datum.profit} emphasized />
      <DataTableCell value={datum.related_revenue} />
    </Table.Row>
  );
}

export function BSTableRow({ datum, mode, index }: TableRowProps<BS>) {
  return (
    <Table.Row>
      <TableBodyHeader mode={mode} datum={datum} index={index} />
      <DataTableCell value={datum.assets} emphasized />
      <DataTableCell value={datum.curr_assets} />
      <DataTableCell value={datum.fixed_assets} />
      <DataTableCell value={datum.liabilities} emphasized />
      <DataTableCell value={datum.curr_liabilities} />
      <DataTableCell value={datum.fixed_liabilities} />
      <DataTableCell value={datum.net_worth} emphasized redIfMinus />
      <DataTableCell value={datum.capital_stock} />
      <DataTableCell value={datum.capital_surplus} />
      <DataTableCell value={datum.retained_earnings} />
      <DataTableCell value={datum.profit} />
    </Table.Row>
  );
}

export function RevenueTableRow({
  datum,
  mode,
  index,
}: TableRowProps<Revenue>) {
  const otherRevs = (year: number) => {
    if (year <= 2010)
      return (
        <DataTableCell value={datum.other_revs} align="center" colSpan={6} />
      );
    if (year <= 2015)
      return (
        <>
          <DataTableCell value={datum.academy_rev} align="center" />
          <DataTableCell value={datum.other_revs} align="center" colSpan={5} />
        </>
      );
    if (year <= 2021)
      return (
        <>
          <DataTableCell value={datum.academy_rev} align="center" />
          <DataTableCell value={datum.goods_rev} align="center" />
          <DataTableCell value={datum.other_revs} colSpan={4} align="center" />
        </>
      );
    if (year <= 2023)
      return (
        <>
          <DataTableCell value={datum.academy_rev} align="center" />
          <DataTableCell value={datum.goods_rev} align="center" />
          <DataTableCell value={datum.women_rev} align="center" />
          <DataTableCell value={datum.other_revs} colSpan={3} align="center" />
        </>
      );
    if (
      typeof datum.transfer_int_rev?.value !== "number" ||
      typeof datum.transfer_dom_rev?.value !== "number"
    ) {
      return (
        <>
          <DataTableCell value={datum.academy_rev} align="center" />
          <DataTableCell value={datum.goods_rev} align="center" />
          <DataTableCell value={datum.women_rev} align="center" />
          <DataTableCell
            value={datum.transfer_rev}
            colSpan={2}
            align="center"
          />
          <DataTableCell value={datum.other_revs} align="center" />
        </>
      );
    }

    return (
      <>
        <DataTableCell value={datum.academy_rev} align="center" />
        <DataTableCell value={datum.goods_rev} align="center" />
        <DataTableCell value={datum.women_rev} align="center" />
        <DataTableCell value={datum.transfer_int_rev} align="center" />
        <DataTableCell value={datum.transfer_dom_rev} align="center" />
        <DataTableCell value={datum.other_revs} align="center" />
      </>
    );
  };

  return (
    <Table.Row>
      <TableBodyHeader mode={mode} datum={datum} index={index} />
      <DataTableCell value={datum.revenue} emphasized />
      <DataTableCell value={datum.sponsor} />
      <DataTableCell value={datum.ticket} />
      <DataTableCell value={datum.broadcast} />
      {otherRevs(datum.year.value)}
      <DataTableCell value={datum.related_revenue} />
    </Table.Row>
  );
}

export function ExpenseTableRow({
  datum,
  mode,
  index,
}: TableRowProps<Expense>) {
  const expenseData = (year: number) => {
    if (year <= 2005 && !datum.salary)
      return (
        <>
          <DataTableCell
            value={datum.general_exp}
            align="center"
            colSpan={10}
          />
          <DataTableCell value={datum.sga} align="center" />
        </>
      );
    if (year <= 2010)
      return (
        <>
          <DataTableCell value={datum.salary} colSpan={3} align="center" />
          <DataTableCell value={datum.manage_exp} align="center" colSpan={7} />
          <DataTableCell value={datum.sga} align="center" />
        </>
      );
    if (year <= 2015)
      return (
        <>
          <DataTableCell value={datum.salary} colSpan={3} align="center" />
          <DataTableCell value={datum.game_exp} />
          <DataTableCell value={datum.team_exp} />
          <DataTableCell value={datum.academy_exp} />
          <DataTableCell value={datum.women_exp} />
          <DataTableCell value={datum.sga} align="center" colSpan={4} />
        </>
      );
    if (year <= 2021)
      return (
        <>
          <DataTableCell value={datum.salary} colSpan={3} align="center" />
          <DataTableCell value={datum.game_exp} />
          <DataTableCell value={datum.team_exp} />
          <DataTableCell value={datum.academy_exp} />
          <DataTableCell value={datum.women_exp} />
          <DataTableCell value={datum.goods_exp} />
          <DataTableCell value={datum.sga} align="center" colSpan={3} />
        </>
      );
    if (year <= 2023)
      return (
        <>
          <DataTableCell value={datum.salary} colSpan={3} align="center" />
          <DataTableCell value={datum.game_exp} />
          <DataTableCell value={datum.team_exp} />
          <DataTableCell value={datum.academy_exp} />
          <DataTableCell value={datum.women_exp} />
          <DataTableCell value={datum.goods_exp} />
          <DataTableCell value={datum.other_cost} />
          <DataTableCell value={datum.sga} align="center" colSpan={2} />
        </>
      );

    if (
      typeof datum.transfer_int_exp?.value !== "number" ||
      typeof datum.transfer_dom_exp?.value !== "number"
    ) {
      return (
        <>
          <DataTableCell value={datum.salary} />
          <DataTableCell
            value={datum.transfer_exp}
            align="center"
            colSpan={2}
          />
          <DataTableCell value={datum.game_exp} />
          <DataTableCell value={datum.team_exp} />
          <DataTableCell value={datum.academy_exp} />
          <DataTableCell value={datum.women_exp} />
          <DataTableCell value={datum.goods_exp} />
          <DataTableCell value={datum.other_cost} />
          <DataTableCell value={datum.sga} align="center" colSpan={2} />
        </>
      );
    }

    return (
      <>
        <DataTableCell value={datum.salary} />
        <DataTableCell value={datum.transfer_int_exp} />
        <DataTableCell value={datum.transfer_dom_exp} />
        <DataTableCell value={datum.game_exp} />
        <DataTableCell value={datum.team_exp} />
        <DataTableCell value={datum.academy_exp} />
        <DataTableCell value={datum.women_exp} />
        <DataTableCell value={datum.goods_exp} />
        <DataTableCell value={datum.other_cost} />
        <DataTableCell value={datum.sga} align="center" colSpan={2} />
      </>
    );
  };

  return (
    <Table.Row>
      <TableBodyHeader mode={mode} datum={datum} index={index} />
      <DataTableCell value={datum.expense} emphasized />
      {expenseData(datum.year.value)}
    </Table.Row>
  );
}

export function AttdTableRow({ datum, mode, index }: TableRowProps<Attd>) {
  // const { displayFullAttd } = useAppState();
  return (
    <Table.Row>
      <TableBodyHeader mode={mode} datum={datum} index={index} />
      <DataTableCell value={datum.ticket} emphasized />
      <DataTableCell value={datum.league_games} />
      <DataTableCell value={datum.average_attd} emphasized separator />
      <DataTableCell value={datum.league_attd} separator />
      {/*displayFullAttd && (
        <>
          <DataTableCell value={datum.leaguecup_attd} separator />
          <DataTableCell value={datum.acl_attd} separator />
          <DataTableCell value={datum.po_attd} separator />
          <DataTableCell value={datum.second_attd} separator />
        </>
      )*/}
      <DataTableCell value={datum.all_games} />
      <DataTableCell value={datum.all_attd} emphasized separator />
      <DataTableCell value={datum.unit_price} separator />
    </Table.Row>
  );
}
