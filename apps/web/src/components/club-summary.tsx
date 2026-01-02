import type { ClubInfo } from "@cieloazul310/jclub-financial/types";
import { css } from "styled-system/css";
import { List, UnorderedList } from "@/components/ui/list";
import { Table } from "@/components/ui/table";

type ClubSummaryInfo = Pick<
  ClubInfo,
  | "fullname"
  | "company"
  | "period"
  | "category"
  | "hometown"
  | "relatedCompanies"
  | "annotation"
>;

const tableData: {
  title: string;
  key: keyof ClubSummaryInfo;
  value: (club: ClubSummaryInfo) => string;
}[] = [
  { title: "正式名称", key: "fullname", value: ({ fullname }) => fullname },
  { title: "法人名", key: "company", value: ({ company }) => company },
  { title: "決算期", key: "period", value: ({ period }) => `${period}月期` },
  { title: "所属カテゴリ", key: "category", value: ({ category }) => category },
  { title: "ホームタウン", key: "hometown", value: ({ hometown }) => hometown },
  {
    title: "関連する法人",
    key: "relatedCompanies",
    value: ({ relatedCompanies }) => relatedCompanies?.join("、") ?? "",
  },
];

export function ClubSummary({ club }: { club: ClubSummaryInfo }) {
  return (
    <Table.Root width="full" captionSide="bottom">
      <colgroup>
        <col className={css({ width: { base: "120px", md: "180px" } })} />
      </colgroup>
      <Table.Body>
        {tableData.map(
          ({ title, key, value }) =>
            club[key] && (
              <Table.Row key={title}>
                <Table.Header>{title}</Table.Header>
                <Table.Cell>{value(club)}</Table.Cell>
              </Table.Row>
            ),
        )}
      </Table.Body>
      <caption
        className={css({
          color: "solid-gray.600",
          textAlign: "left",
          textStyle: "std-16N-170",
        })}
      >
        <UnorderedList>
          <List>
            2021年以前の「チーム人件費」はアカデミー指導者報酬、レディースチーム選手・指導者報酬を含む。2022年度以降はトップチームに限定した「トップチーム人件費」。2024年以降は更に「移籍関連費用」が別項目となった。
          </List>
          {club.annotation?.map((str) => (
            <List key={str}>{str}</List>
          ))}
        </UnorderedList>
      </caption>
    </Table.Root>
  );
}
