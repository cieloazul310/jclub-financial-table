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
      <DataTableCell value={datum.expenses} strong />
      <DataTableCell value={datum.operating_profit} emphasized />
      <DataTableCell value={datum.non_operating_income} />
      <DataTableCell value={datum.non_operating_expenses} />
      <DataTableCell value={datum.ordinary_profit} emphasized />
      <DataTableCell value={datum.extraordinary_income} />
      <DataTableCell value={datum.extraordinary_loss} />
      <DataTableCell value={datum.profit_before_tax} emphasized />
      <DataTableCell value={datum.tax} />
      <DataTableCell value={datum.net_profit} emphasized />
      <DataTableCell value={datum.related_companies_revenue} />
    </Table.Row>
  );
}

export function BSTableRow({ datum, mode, index }: TableRowProps<BS>) {
  return (
    <Table.Row>
      <TableBodyHeader mode={mode} datum={datum} index={index} />
      <DataTableCell value={datum.assets} emphasized />
      <DataTableCell value={datum.current_assets} />
      <DataTableCell value={datum.non_current_assets} />
      <DataTableCell value={datum.liabilities} emphasized />
      <DataTableCell value={datum.current_liabilities} />
      <DataTableCell value={datum.non_current_liabilities} />
      <DataTableCell value={datum.net_assets} emphasized redIfMinus />
      <DataTableCell value={datum.share_capital} />
      <DataTableCell value={datum.capital_surplus} />
      <DataTableCell value={datum.retained_earnings} />
      <DataTableCell value={datum.net_profit} />
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
        <DataTableCell value={datum.other_revenue} align="center" colSpan={6} />
      );
    if (year <= 2015)
      return (
        <>
          <DataTableCell value={datum.academy_revenue} align="center" />
          <DataTableCell
            value={datum.other_revenue}
            align="center"
            colSpan={5}
          />
        </>
      );
    if (year <= 2021)
      return (
        <>
          <DataTableCell value={datum.academy_revenue} align="center" />
          <DataTableCell value={datum.retail_revenue} align="center" />
          <DataTableCell
            value={datum.other_revenue}
            colSpan={4}
            align="center"
          />
        </>
      );
    if (year <= 2023)
      return (
        <>
          <DataTableCell value={datum.academy_revenue} align="center" />
          <DataTableCell value={datum.retail_revenue} align="center" />
          <DataTableCell value={datum.womens_team_revenue} align="center" />
          <DataTableCell
            value={datum.other_revenue}
            colSpan={3}
            align="center"
          />
        </>
      );
    if (
      typeof datum.transfer_revenue_international?.value !== "number" ||
      typeof datum.transfer_revenue_domestic?.value !== "number"
    ) {
      return (
        <>
          <DataTableCell value={datum.academy_revenue} align="center" />
          <DataTableCell value={datum.retail_revenue} align="center" />
          <DataTableCell value={datum.womens_team_revenue} align="center" />
          <DataTableCell
            value={datum.transfer_revenue}
            colSpan={2}
            align="center"
          />
          <DataTableCell value={datum.other_revenue} align="center" />
        </>
      );
    }

    return (
      <>
        <DataTableCell value={datum.academy_revenue} align="center" />
        <DataTableCell value={datum.retail_revenue} align="center" />
        <DataTableCell value={datum.womens_team_revenue} align="center" />
        <DataTableCell
          value={datum.transfer_revenue_international}
          align="center"
        />
        <DataTableCell value={datum.transfer_revenue_domestic} align="center" />
        <DataTableCell value={datum.other_revenue} align="center" />
      </>
    );
  };

  return (
    <Table.Row>
      <TableBodyHeader mode={mode} datum={datum} index={index} />
      <DataTableCell value={datum.revenue} emphasized />
      <DataTableCell value={datum.sponsor_revenue} />
      <DataTableCell value={datum.ticket_revenue} />
      <DataTableCell value={datum.jleague_distribution} />
      {otherRevs(datum.year.value)}
      <DataTableCell value={datum.related_companies_revenue} />
    </Table.Row>
  );
}

export function ExpenseTableRow({
  datum,
  mode,
  index,
}: TableRowProps<Expense>) {
  const expenseData = (year: number) => {
    if (year <= 2005 && !datum.team_wages)
      return (
        <>
          <DataTableCell
            value={datum.general_expenses}
            align="center"
            colSpan={9}
          />
          <DataTableCell
            value={datum.selling_general_admin_expenses}
            align="center"
          />
        </>
      );
    if (year <= 2010)
      return (
        <>
          <DataTableCell value={datum.team_wages} colSpan={3} align="center" />
          <DataTableCell
            value={datum.manage_expenses}
            align="center"
            colSpan={6}
          />
          <DataTableCell
            value={datum.selling_general_admin_expenses}
            align="center"
          />
        </>
      );
    if (year <= 2015)
      return (
        <>
          <DataTableCell value={datum.team_wages} colSpan={3} align="center" />
          <DataTableCell value={datum.match_expenses} />
          <DataTableCell value={datum.topteam_expenses} />
          <DataTableCell value={datum.academy_expenses} />
          <DataTableCell value={datum.womens_team_expenses} />
          <DataTableCell
            value={datum.selling_general_admin_expenses}
            align="center"
            colSpan={5}
          />
        </>
      );
    if (year <= 2021)
      return (
        <>
          <DataTableCell value={datum.team_wages} colSpan={3} align="center" />
          <DataTableCell value={datum.match_expenses} />
          <DataTableCell value={datum.topteam_expenses} />
          <DataTableCell value={datum.academy_expenses} />
          <DataTableCell value={datum.womens_team_expenses} />
          <DataTableCell value={datum.retail_expenses} />
          <DataTableCell
            value={datum.selling_general_admin_expenses}
            align="center"
            colSpan={2}
          />
        </>
      );
    if (year <= 2023)
      return (
        <>
          <DataTableCell value={datum.team_wages} colSpan={3} align="center" />
          <DataTableCell value={datum.match_expenses} />
          <DataTableCell value={datum.topteam_expenses} />
          <DataTableCell value={datum.academy_expenses} />
          <DataTableCell value={datum.womens_team_expenses} />
          <DataTableCell value={datum.retail_expenses} />
          <DataTableCell value={datum.other_costs} />
          <DataTableCell
            value={datum.selling_general_admin_expenses}
            align="center"
          />
        </>
      );

    if (
      typeof datum.transfer_expenses_international?.value !== "number" ||
      typeof datum.transfer_expenses_domestic?.value !== "number"
    ) {
      return (
        <>
          <DataTableCell value={datum.team_wages} />
          <DataTableCell
            value={datum.transfer_expenses}
            align="center"
            colSpan={2}
          />
          <DataTableCell value={datum.match_expenses} />
          <DataTableCell value={datum.topteam_expenses} />
          <DataTableCell value={datum.academy_expenses} />
          <DataTableCell value={datum.womens_team_expenses} />
          <DataTableCell value={datum.retail_expenses} />
          <DataTableCell value={datum.other_costs} />
          <DataTableCell
            value={datum.selling_general_admin_expenses}
            align="center"
            colSpan={2}
          />
        </>
      );
    }

    return (
      <>
        <DataTableCell value={datum.team_wages} />
        <DataTableCell value={datum.transfer_expenses_international} />
        <DataTableCell value={datum.transfer_expenses_domestic} />
        <DataTableCell value={datum.match_expenses} />
        <DataTableCell value={datum.topteam_expenses} />
        <DataTableCell value={datum.academy_expenses} />
        <DataTableCell value={datum.womens_team_expenses} />
        <DataTableCell value={datum.retail_expenses} />
        <DataTableCell value={datum.other_costs} />
        <DataTableCell
          value={datum.selling_general_admin_expenses}
          align="center"
          colSpan={2}
        />
      </>
    );
  };

  return (
    <Table.Row>
      <TableBodyHeader mode={mode} datum={datum} index={index} />
      <DataTableCell value={datum.expenses} emphasized />
      {expenseData(datum.year.value)}
    </Table.Row>
  );
}

export function AttdTableRow({ datum, mode, index }: TableRowProps<Attd>) {
  // const { displayFullAttd } = useAppState();
  return (
    <Table.Row>
      <TableBodyHeader mode={mode} datum={datum} index={index} />
      <DataTableCell value={datum.ticket_revenue} emphasized />
      <DataTableCell value={datum.league_games} />
      <DataTableCell value={datum.average_attendance} emphasized separator />
      <DataTableCell value={datum.league_attendance} separator />
      {/*displayFullAttd && (
        <>
          <DataTableCell value={datum.leaguecup_attendance} separator />
          <DataTableCell value={datum.acl_attendance} separator />
          <DataTableCell value={datum.playoffs_attendance} separator />
          <DataTableCell value={datum.second_attendance} separator />
        </>
      )*/}
      <DataTableCell value={datum.all_games} />
      <DataTableCell value={datum.all_attendance} emphasized separator />
      <DataTableCell value={datum.unit_price} separator />
    </Table.Row>
  );
}
