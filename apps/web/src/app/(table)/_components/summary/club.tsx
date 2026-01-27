import type { ReactNode } from "react";
import type { ClubInfo } from "@cieloazul310/jclub-financial/types";
import { css } from "styled-system/css";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { List, UnorderedList } from "@/components/ui/list";
import { Table } from "@/components/ui/table";
import { Link } from "@/components/link";

type ClubSummaryInfo = Pick<
  ClubInfo,
  | "fullname"
  | "company"
  | "period"
  | "category"
  | "hometown"
  | "relatedCompanies"
  | "annotation"
  | "website"
  | "settlement"
>;

const tableData: {
  title: string;
  key: keyof ClubSummaryInfo;
  value: (club: ClubSummaryInfo) => ReactNode;
}[] = [
  { title: "正式名称", key: "fullname", value: ({ fullname }) => fullname },
  { title: "法人名", key: "company", value: ({ company }) => company },
  { title: "決算期", key: "period", value: ({ period }) => `${period}月期` },
  { title: "所属カテゴリ", key: "category", value: ({ category }) => category },
  { title: "ホームタウン", key: "hometown", value: ({ hometown }) => hometown },
  {
    title: "関連する法人",
    key: "relatedCompanies",
    value: ({ relatedCompanies }) =>
      relatedCompanies ? (
        <UnorderedList my={0}>
          {relatedCompanies.map((item) => (
            <List key={item}>{item}</List>
          ))}
        </UnorderedList>
      ) : (
        ""
      ),
  },
];

export function ClubSummary({
  club,
  ...rest
}: HTMLStyledProps<"section"> & { club: ClubSummaryInfo }) {
  const props = { ...rest };

  return (
    <styled.section {...props}>
      <Table.Root width="full" dense={{ base: true, sm: false }}>
        <colgroup>
          <col className={css({ minWidth: { base: "140px", sm: "180px" } })} />
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
      </Table.Root>
      <UnorderedList mb={4} textStyle="std-16N-170">
        <List>
          2021年以前の「チーム人件費」はアカデミー指導者報酬、レディースチーム選手・指導者報酬を含む。2022年度以降はトップチームに限定した「トップチーム人件費」。2024年以降は更に「移籍関連費用」が別項目となった。
        </List>
        {club.annotation?.map((str) => (
          <List key={str}>{str}</List>
        ))}
      </UnorderedList>
      <nav className={css({ display: "flex", gap: { base: 2, md: 4 } })}>
        {club.website && <Link href={club.website}>公式サイト</Link>}
        {club.settlement && <Link href={club.settlement}>決算情報</Link>}
      </nav>
    </styled.section>
  );
}
