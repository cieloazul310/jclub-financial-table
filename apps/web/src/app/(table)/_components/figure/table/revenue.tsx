import type {
  FinancialDatum,
  Revenue,
} from "@cieloazul310/jclub-financial/types";
import { styled } from "styled-system/jsx";
import type { Mode } from "@/utils/types";
import { Table } from "@/components/ui/table";
import { valueStyle } from "./styles";

export function createRevenueRow() {
  const colgroup = (
    <colgroup>
      <styled.col bg="white" span={3} />
      <styled.col bg="solid-gray.bg" minWidth="6em" />
      {Array.from({ length: 7 }).map((_, i) => (
        <styled.col key={i.toString()} minWidth="6em" />
      ))}
      <styled.col bg="solid-gray.bg" minWidth="6em" />
    </colgroup>
  );

  const head = (mode: Mode) => (
    <Table.Row>
      <Table.Header scope="column">
        {mode === "club" ? "年" : "クラブ"}
      </Table.Header>
      <Table.Header scope="column">所属</Table.Header>
      <Table.Header scope="column">順位</Table.Header>
      <Table.Header scope="column">営業収入</Table.Header>
      <Table.Header scope="column">スポンサー</Table.Header>
      <Table.Header scope="column">入場料</Table.Header>
      <Table.Header scope="column">配分金</Table.Header>
      <Table.Header scope="column">アカデミー関連</Table.Header>
      <Table.Header scope="column">物販</Table.Header>
      <Table.Header scope="column">女子チーム</Table.Header>
      <Table.Header scope="column">その他</Table.Header>
      <Table.Header scope="column">(関連法人)</Table.Header>
    </Table.Row>
  );
  const renderRow = (
    data: Pick<
      FinancialDatum,
      "name" | "year" | "category" | "rank" | keyof Revenue
    >,
    mode: Mode,
  ) => {
    const {
      year,
      name,
      category,
      rank,
      revenue,
      sponsor_revenue,
      ticket_revenue,
      jleague_distribution,
      academy_revenue,
      womens_team_revenue,
      retail_revenue,
      other_revenue,
      related_companies_revenue,
    } = data;

    const rowHead = (
      <>
        <Table.Header scope="row">{mode === "club" ? year : name}</Table.Header>
        <Table.Header scope="row">{category}</Table.Header>
        <Table.Header scope="row">{rank}</Table.Header>
      </>
    );
    const otherRevs = (inputYear: number) => {
      if (inputYear <= 2010)
        return (
          <Table.Cell className={valueStyle({ centerize: true })} colSpan={4}>
            {other_revenue}
          </Table.Cell>
        );
      if (inputYear <= 2015)
        return (
          <>
            <Table.Cell className={valueStyle({ centerize: true })}>
              {academy_revenue}
            </Table.Cell>
            <Table.Cell className={valueStyle({ centerize: true })} colSpan={3}>
              {other_revenue}
            </Table.Cell>
          </>
        );
      if (inputYear <= 2021)
        return (
          <>
            <Table.Cell className={valueStyle({ centerize: true })}>
              {academy_revenue}
            </Table.Cell>
            <Table.Cell className={valueStyle({ centerize: true })}>
              {retail_revenue}
            </Table.Cell>
            <Table.Cell colSpan={2} className={valueStyle({ centerize: true })}>
              {other_revenue}
            </Table.Cell>
          </>
        );
      return (
        <>
          <Table.Cell className={valueStyle({ centerize: true })}>
            {academy_revenue}
          </Table.Cell>
          <Table.Cell className={valueStyle({ centerize: true })}>
            {retail_revenue}
          </Table.Cell>
          <Table.Cell className={valueStyle({ centerize: true })}>
            {womens_team_revenue}
          </Table.Cell>
          <Table.Cell className={valueStyle({ centerize: true })}>
            {other_revenue}
          </Table.Cell>
        </>
      );
    };

    return (
      <Table.Row key={`${name}${year.toString()}`}>
        {rowHead}
        <Table.Cell className={valueStyle({ strong: true })}>
          {revenue}
        </Table.Cell>
        <Table.Cell className={valueStyle()}>{sponsor_revenue}</Table.Cell>
        <Table.Cell className={valueStyle()}>{ticket_revenue}</Table.Cell>
        <Table.Cell className={valueStyle()}>{jleague_distribution}</Table.Cell>
        {otherRevs(year)}
        <Table.Cell className={valueStyle()}>
          {related_companies_revenue}
        </Table.Cell>
      </Table.Row>
    );
  };

  return { colgroup, head, renderRow };
}
