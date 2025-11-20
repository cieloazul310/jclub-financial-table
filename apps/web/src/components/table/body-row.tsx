import type {
  General,
  SeasonResult,
  PL,
  BS,
  Revenue,
  Expense,
  Attd,
} from "@cieloazul310/jclub-financial/types";
import { cx, css } from "styled-system/css";
import type { ComponentProps } from "styled-system/types";
import { Table } from "@/components/ui/table";
import { val } from "@/utils/val";
import type { Mode } from "@/utils/types";
import { CategoryLabel } from "../category-label";
import { TableBodyLabel } from "./label";
import { valueStyle } from "./styles";

type TableBodyHeaderProps = {
  mode: Mode;
  index: number;
  node: Pick<General & SeasonResult, "category" | "rank" | "elevation" | "slug" | "year" | "name">;
  // selected?: boolean;
};

function TableBodyHeader({ mode, index, node }: TableBodyHeaderProps) {
  return (
    <>
      <TableBodyLabel mode={mode} node={node} index={index} />
      <Table.Cell
        width="80px"
        align="center"
        verticalAlign="middle"
        p={0}
      >
        <CategoryLabel category={node.category ?? ""} />
      </Table.Cell>
      <Table.Cell
        className={cx(
          node.elevation && css({ fontWeight: "bold" }),
          node.elevation === "昇格" && css({
            color: "green.800",
          }),
          node.elevation === "降格" && css({
            color: "red.900",
          }),
        )}
        width="80px"
        borderRightWidth="1px"
        borderColor="solid-gray.200"
        align="center"
        padding="none"
      >
        {node.rank}
      </Table.Cell>
    </>
  );
}


type DataTableCellProps = {
  value: number | null;
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
  const red = redIfMinus && typeof value === "number" && value < 0;

  return (
    <Table.Cell
      className={valueStyle({ strong, emphasized, red })}
      align={align}
      {...props}
    >
      {val(value, { separator })}
    </Table.Cell>
  );
}

type TableRowProps<T> = {
  mode: Mode;
  index: number;
  node: Pick<
    General & SeasonResult,
    "category" | "rank" | "elevation" | "slug" | "year" | "name"
  > &
    T;
};

export function PLTableRow({ node, mode, index }: TableRowProps<PL>) {
  return (
    <Table.Row>
      <TableBodyHeader mode={mode} node={node} index={index} />
      <DataTableCell value={node.revenue} strong />
      <DataTableCell value={node.expense} strong />
      <DataTableCell value={node.op_profit} emphasized />
      <DataTableCell value={node.no_rev} />
      <DataTableCell value={node.no_exp} />
      <DataTableCell value={node.ordinary_profit} emphasized />
      <DataTableCell value={node.sp_rev} />
      <DataTableCell value={node.sp_exp} />
      <DataTableCell value={node.profit_before_tax} emphasized />
      <DataTableCell value={node.tax} />
      <DataTableCell value={node.profit} emphasized />
      <DataTableCell value={node.related_revenue} />
    </Table.Row>
  );
}

export function BSTableRow({ node, mode, index }: TableRowProps<BS>) {
  return (
    <Table.Row>
      <TableBodyHeader mode={mode} node={node} index={index} />
      <DataTableCell value={node.assets} emphasized />
      <DataTableCell value={node.curr_assets} />
      <DataTableCell value={node.fixed_assets} />
      <DataTableCell value={node.liabilities} emphasized />
      <DataTableCell value={node.curr_liabilities} />
      <DataTableCell value={node.fixed_liabilities} />
      <DataTableCell value={node.net_worth} emphasized redIfMinus />
      <DataTableCell value={node.capital_stock} />
      <DataTableCell value={node.capital_surplus} />
      <DataTableCell value={node.retained_earnings} />
      <DataTableCell value={node.profit} />
    </Table.Row>
  );
}

export function RevenueTableRow({ node, mode, index }: TableRowProps<Revenue>) {
  const otherRevs = (year: number) => {
    if (year <= 2010)
      return (
        <DataTableCell value={node.other_revs} align="center" colSpan={6} />
      );
    if (year <= 2015)
      return (
        <>
          <DataTableCell value={node.academy_rev} align="center" />
          <DataTableCell value={node.other_revs} align="center" colSpan={5} />
        </>
      );
    if (year <= 2021)
      return (
        <>
          <DataTableCell value={node.academy_rev} align="center" />
          <DataTableCell value={node.goods_rev} align="center" />
          <DataTableCell value={node.other_revs} colSpan={4} align="center" />
        </>
      );
    if (year <= 2023)
      return (
        <>
          <DataTableCell value={node.academy_rev} align="center" />
          <DataTableCell value={node.goods_rev} align="center" />
          <DataTableCell value={node.women_rev} align="center" />
          <DataTableCell value={node.other_revs} colSpan={3} align="center" />
        </>
      );
    if (node.transfer_int_rev === null && node.transfer_dom_rev === null) {
      return (
        <>
          <DataTableCell value={node.academy_rev} align="center" />
          <DataTableCell value={node.goods_rev} align="center" />
          <DataTableCell value={node.women_rev} align="center" />
          <DataTableCell value={node.transfer_rev} colSpan={2} align="center" />
          <DataTableCell value={node.other_revs} align="center" />
        </>
      );
    }

    return (
      <>
        <DataTableCell value={node.academy_rev} align="center" />
        <DataTableCell value={node.goods_rev} align="center" />
        <DataTableCell value={node.women_rev} align="center" />
        <DataTableCell value={node.transfer_int_rev} align="center" />
        <DataTableCell value={node.transfer_dom_rev} align="center" />
        <DataTableCell value={node.other_revs} align="center" />
      </>
    );
  };

  return (
    <Table.Row>
      <TableBodyHeader mode={mode} node={node} index={index} />
      <DataTableCell value={node.revenue} emphasized />
      <DataTableCell value={node.sponsor} />
      <DataTableCell value={node.ticket} />
      <DataTableCell value={node.broadcast} />
      {otherRevs(node.year)}
      <DataTableCell value={node.related_revenue} />
    </Table.Row>
  );
}

export function ExpenseTableRow({ node, mode, index }: TableRowProps<Expense>) {
  const expenseData = (year: number) => {
    if (year <= 2005 && !node.salary)
      return (
        <>
          <DataTableCell value={node.general_exp} align="center" colSpan={10} />
          <DataTableCell value={node.sga} align="center" />
        </>
      );
    if (year <= 2010)
      return (
        <>
          <DataTableCell value={node.salary} colSpan={3} align="center" />
          <DataTableCell value={node.manage_exp} align="center" colSpan={7} />
          <DataTableCell value={node.sga} align="center" />
        </>
      );
    if (year <= 2015)
      return (
        <>
          <DataTableCell value={node.salary} colSpan={3} align="center" />
          <DataTableCell value={node.game_exp} />
          <DataTableCell value={node.team_exp} />
          <DataTableCell value={node.academy_exp} />
          <DataTableCell value={node.women_exp} />
          <DataTableCell value={node.sga} align="center" colSpan={4} />
        </>
      );
    if (year <= 2021)
      return (
        <>
          <DataTableCell value={node.salary} colSpan={3} align="center" />
          <DataTableCell value={node.game_exp} />
          <DataTableCell value={node.team_exp} />
          <DataTableCell value={node.academy_exp} />
          <DataTableCell value={node.women_exp} />
          <DataTableCell value={node.goods_exp} />
          <DataTableCell value={node.sga} align="center" colSpan={3} />
        </>
      );
    if (year <= 2023)
      return (
        <>
          <DataTableCell value={node.salary} colSpan={3} align="center" />
          <DataTableCell value={node.game_exp} />
          <DataTableCell value={node.team_exp} />
          <DataTableCell value={node.academy_exp} />
          <DataTableCell value={node.women_exp} />
          <DataTableCell value={node.goods_exp} />
          <DataTableCell value={node.other_cost} />
          <DataTableCell value={node.sga} align="center" colSpan={2} />
        </>
      );

    if (node.transfer_int_exp === null && node.transfer_dom_exp === null) {
      return (
        <>
          <DataTableCell value={node.salary} />
          <DataTableCell value={node.transfer_exp} align="center" colSpan={2} />
          <DataTableCell value={node.game_exp} />
          <DataTableCell value={node.team_exp} />
          <DataTableCell value={node.academy_exp} />
          <DataTableCell value={node.women_exp} />
          <DataTableCell value={node.goods_exp} />
          <DataTableCell value={node.other_cost} />
          <DataTableCell value={node.sga} align="center" colSpan={2} />
        </>
      );
    }

    return (
      <>
        <DataTableCell value={node.salary} />
        <DataTableCell value={node.transfer_int_exp} />
        <DataTableCell value={node.transfer_dom_exp} />
        <DataTableCell value={node.game_exp} />
        <DataTableCell value={node.team_exp} />
        <DataTableCell value={node.academy_exp} />
        <DataTableCell value={node.women_exp} />
        <DataTableCell value={node.goods_exp} />
        <DataTableCell value={node.other_cost} />
        <DataTableCell value={node.sga} align="center" colSpan={2} />
      </>
    );
  };

  return (
    <Table.Row>
      <TableBodyHeader mode={mode} node={node} index={index} />
      <DataTableCell value={node.expense} emphasized />
      {expenseData(node.year)}
    </Table.Row>
  );
}

export function AttdTableRow({ node, mode, index }: TableRowProps<Attd>) {
  // const { displayFullAttd } = useAppState();
  return (
    <Table.Row>
      <TableBodyHeader mode={mode} node={node} index={index} />
      <DataTableCell value={node.ticket} emphasized />
      <DataTableCell value={node.league_games} />
      <DataTableCell value={node.average_attd} emphasized separator />
      <DataTableCell value={node.league_attd} separator />
      {/*displayFullAttd && (
        <>
          <DataTableCell value={node.leaguecup_attd} separator />
          <DataTableCell value={node.acl_attd} separator />
          <DataTableCell value={node.po_attd} separator />
          <DataTableCell value={node.second_attd} separator />
        </>
      )*/}
      <DataTableCell value={node.all_games} />
      <DataTableCell value={node.all_attd} emphasized separator />
      <DataTableCell value={node.unit_price} separator />
    </Table.Row>
  );
}
