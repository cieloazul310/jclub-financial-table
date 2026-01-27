import type {
  FinancialDatum,
  Expense,
} from "@cieloazul310/jclub-financial/types";
import { styled } from "styled-system/jsx";
import { Table } from "@/components/ui/table";
import type { Mode } from "@/utils/types";
import { valueStyle } from "./styles";

export function createExpenseRow() {
  const colgroup = (
    <colgroup>
      <styled.col bg="white" span={3} />
      <styled.col bg="solid-gray.bg" minWidth="6em" />
      {Array.from({ length: 9 }).map((_, i) => (
        <styled.col key={i.toString()} minWidth="6em" />
      ))}
    </colgroup>
  );

  const head = (mode: Mode) => (
    <Table.Row>
      <Table.Header scope="column">
        {mode === "club" ? "年" : "クラブ"}
      </Table.Header>
      <Table.Header scope="column">所属</Table.Header>
      <Table.Header scope="column">順位</Table.Header>
      <Table.Header scope="column">営業費用</Table.Header>
      <Table.Header scope="column">チーム人件費</Table.Header>
      <Table.Header scope="column">試合関連</Table.Header>
      <Table.Header scope="column">トップチーム運営</Table.Header>
      <Table.Header scope="column">アカデミー運営</Table.Header>
      <Table.Header scope="column">女子チーム運営</Table.Header>
      <Table.Header scope="column">物販関連</Table.Header>
      <Table.Header scope="column">その他売上原価</Table.Header>
      <Table.Header scope="column">販売費</Table.Header>
      <Table.Header scope="column">一般管理費</Table.Header>
    </Table.Row>
  );
  const renderRow = (
    data: Pick<
      FinancialDatum,
      "name" | "year" | "category" | "rank" | keyof Expense
    >,
    mode: Mode,
  ) => {
    const {
      year,
      name,
      category,
      rank,
      expenses,
      team_wages,
      match_expenses,
      topteam_expenses,
      academy_expenses,
      womens_team_expenses,
      retail_expenses,
      other_costs,
      selling_general_admin_expenses,
      general_expenses,
      manage_expenses,
    } = data;

    const rowHead = (
      <>
        <Table.Header scope="row">{mode === "club" ? year : name}</Table.Header>
        <Table.Header scope="row">{category}</Table.Header>
        <Table.Header scope="row">{rank}</Table.Header>
      </>
    );
    const expenseData = (inputYear: number) => {
      if (inputYear <= 2005 && !team_wages)
        return (
          <>
            <Table.Cell align="center" colSpan={8}>
              {general_expenses}
            </Table.Cell>
            <Table.Cell align="center">
              {selling_general_admin_expenses}
            </Table.Cell>
          </>
        );
      if (inputYear <= 2010)
        return (
          <>
            <Table.Cell className={valueStyle()}>{team_wages}</Table.Cell>
            <Table.Cell align="center" colSpan={7}>
              {manage_expenses}
            </Table.Cell>
            <Table.Cell align="center">
              {selling_general_admin_expenses}
            </Table.Cell>
          </>
        );
      if (inputYear <= 2015)
        return (
          <>
            <Table.Cell className={valueStyle()}>{team_wages}</Table.Cell>
            <Table.Cell className={valueStyle()}>{match_expenses}</Table.Cell>
            <Table.Cell className={valueStyle()}>{topteam_expenses}</Table.Cell>
            <Table.Cell className={valueStyle()}>{academy_expenses}</Table.Cell>
            <Table.Cell className={valueStyle()}>
              {womens_team_expenses}
            </Table.Cell>
            <Table.Cell align="center" colSpan={4}>
              {selling_general_admin_expenses}
            </Table.Cell>
          </>
        );
      if (inputYear <= 2021)
        return (
          <>
            <Table.Cell className={valueStyle()}>{team_wages}</Table.Cell>
            <Table.Cell className={valueStyle()}>{match_expenses}</Table.Cell>
            <Table.Cell className={valueStyle()}>{topteam_expenses}</Table.Cell>
            <Table.Cell className={valueStyle()}>{academy_expenses}</Table.Cell>
            <Table.Cell className={valueStyle()}>
              {womens_team_expenses}
            </Table.Cell>
            <Table.Cell className={valueStyle()}>{retail_expenses}</Table.Cell>
            <Table.Cell align="center" colSpan={3}>
              {selling_general_admin_expenses}
            </Table.Cell>
          </>
        );

      return (
        <>
          <Table.Cell className={valueStyle()}>{team_wages}</Table.Cell>
          <Table.Cell className={valueStyle()}>{match_expenses}</Table.Cell>
          <Table.Cell className={valueStyle()}>{topteam_expenses}</Table.Cell>
          <Table.Cell className={valueStyle()}>{academy_expenses}</Table.Cell>
          <Table.Cell className={valueStyle()}>
            {womens_team_expenses}
          </Table.Cell>
          <Table.Cell className={valueStyle()}>{retail_expenses}</Table.Cell>
          <Table.Cell className={valueStyle()}>{other_costs}</Table.Cell>
          <Table.Cell align="center" colSpan={2}>
            {selling_general_admin_expenses}
          </Table.Cell>
        </>
      );
    };

    return (
      <Table.Row key={`${name}${year.toString()}`}>
        {rowHead}
        <Table.Cell className={valueStyle({ strong: true })}>
          {expenses}
        </Table.Cell>
        {expenseData(year)}
      </Table.Row>
    );
  };

  return { colgroup, head, renderRow };
}
