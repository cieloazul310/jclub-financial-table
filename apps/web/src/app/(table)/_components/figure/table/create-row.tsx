import { getLabel } from "@cieloazul310/jclub-financial";
import type { FinancialDatum } from "@cieloazul310/jclub-financial/types";
import type { Mode } from "@/utils/types";
import { Table } from "@/components/ui/table";
import { styled } from "styled-system/jsx";
import { valueStyle } from "./styles";

export function createRow<T extends keyof FinancialDatum>({
  fields,
  emphasizedFields = [],
  bgEmphasizedFields = [],
}: {
  fields: T[];
  emphasizedFields?: T[];
  bgEmphasizedFields?: T[];
}) {
  const colgroup = (
    <colgroup>
      <styled.col width="6em" />
      <styled.col width="6em" />
      <styled.col width="6em" />
      {fields.map((field) => (
        <styled.col key={field} minWidth="6em" />
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
      {fields.map((field) => (
        <Table.Header scope="column" key={field}>
          {getLabel(field)}
        </Table.Header>
      ))}
    </Table.Row>
  );
  const renderRow = (
    data: Pick<FinancialDatum, "short_name" | "year" | "category" | "rank" | T>,
    mode: Mode,
  ) => (
    <Table.Row key={`${data.short_name}${data.year.toString()}`}>
      <Table.Header scope="row">
        {mode === "club" ? data.year : data.short_name}
      </Table.Header>
      <Table.Header scope="row">{data.category}</Table.Header>
      <Table.Header scope="row">{data.rank}</Table.Header>
      {fields.map((field) => (
        <Table.Cell
          key={field}
          className={valueStyle({ strong: emphasizedFields.includes(field) })}
          // emphasized={emphasizedFields.includes(field)}
          // bgEmphasized={bgEmphasizedFields.includes(field)}
        >
          {data[field]}
        </Table.Cell>
      ))}
    </Table.Row>
  );

  return { colgroup, head, renderRow };
}
