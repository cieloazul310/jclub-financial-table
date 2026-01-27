import { css } from "styled-system/css";
import { Table } from "@/components/ui/table";
import { UnorderedList, type UnorderedListProps } from "@/components/ui/list";
import { List } from "@/components/ui/list";
import {
  TableWrapper,
  type TableWrapperProps,
} from "@/components/table-wrapper";

export function SpecialCase({
  ...props
}: Omit<UnorderedListProps, "children">) {
  return (
    <UnorderedList {...props}>
      <List>債務超過、3期連続赤字をライセンス交付の判定対象としない</List>
      <List>対象年度に新たに債務超過に陥っても判定対象としない</List>
    </UnorderedList>
  );
}

export function GracePeriod({
  ...props
}: Omit<UnorderedListProps, "children">) {
  return (
    <UnorderedList {...props}>
      <List>
        債務超過が解消されていなくてもよいが、前年度より債務超過額が増加してはいけない
      </List>
      <List>新たに債務超過に陥ってはいけない</List>
      <List>3期連続赤字のカウントをスタートする</List>
    </UnorderedList>
  );
}

export function Normal({ ...props }: Omit<UnorderedListProps, "children">) {
  return (
    <UnorderedList {...props}>
      <List>債務超過が解消されていなければならない</List>
      <List>赤字が継続しているクラブは、3期連続赤字に抵触する可能性がある</List>
    </UnorderedList>
  );
}

export function Tokurei2020(props: TableWrapperProps) {
  return (
    <TableWrapper {...props}>
      <Table.Root>
        <Table.Caption className={css({ textAlign: "start" })}>
          2020年当初の特例措置
        </Table.Caption>
        <colgroup>
          <col span={5} className={css({ minWidth: "12em" })} />
        </colgroup>
        <Table.Head>
          <Table.Row>
            {Array.from({ length: 5 }).map((_, index) => (
              <Table.Cell
                key={index.toString()}
                className={css({ minWidth: "12em" })}
                scope="column"
                align="center"
              >
                {index + 2020}年度
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row bg="keyColor.bg">
            <Table.Cell colSpan={2} align="center">
              <strong>特例措置</strong>
            </Table.Cell>
            <Table.Cell colSpan={2} align="center">
              <strong>猶予期間</strong>
            </Table.Cell>
            <Table.Cell align="center">
              <strong>特例措置なし</strong>
            </Table.Cell>
          </Table.Row>
          <Table.Row textStyle="dns-16N-130">
            <Table.Cell colSpan={2}>
              <SpecialCase />
            </Table.Cell>
            <Table.Cell colSpan={2}>
              <GracePeriod />
            </Table.Cell>
            <Table.Cell>
              <Normal />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </TableWrapper>
  );
}

export function Tokurei2023(props: TableWrapperProps) {
  return (
    <TableWrapper {...props}>
      <Table.Root>
        <Table.Caption className={css({ textAlign: "start" })}>
          2023年改定後の特例措置
        </Table.Caption>
        <colgroup>
          <col className={css({ minWidth: "6em" })} />
          <col span={6} className={css({ minWidth: "12em" })} />
        </colgroup>
        <Table.Head>
          <Table.Row>
            <Table.Cell className={css({ minWidth: "6em" })} />
            {Array.from({ length: 6 }).map((_, index) => (
              <Table.Cell
                key={index.toString()}
                className={css({ minWidth: "12em" })}
                scope="column"
                align="center"
              >
                {index + 2020}年度
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row bg="keyColor.bg/20">
            <Table.Header scope="row">改定前</Table.Header>
            <Table.Cell colSpan={2} align="center">
              特例措置
            </Table.Cell>
            <Table.Cell colSpan={2} align="center">
              猶予期間
            </Table.Cell>
            <Table.Cell colSpan={2} align="center">
              特例措置なし
            </Table.Cell>
          </Table.Row>
          <Table.Row bg="keyColor.bg">
            <Table.Header scope="row">改定後</Table.Header>
            <Table.Cell colSpan={2} align="center">
              <strong>特例措置</strong>
            </Table.Cell>
            <Table.Cell align="center">
              <strong>猶予期間</strong>
            </Table.Cell>
            <Table.Cell align="center">
              <strong>
                <ins>特例措置</ins>
              </strong>
            </Table.Cell>
            <Table.Cell align="center">
              <strong>
                <ins>猶予期間</ins>
              </strong>
            </Table.Cell>
            <Table.Cell align="center">
              <strong>特例措置なし</strong>
            </Table.Cell>
          </Table.Row>
          <Table.Row textStyle="dns-16N-130">
            <Table.Cell />
            <Table.Cell colSpan={2}>
              <SpecialCase />
            </Table.Cell>
            <Table.Cell>
              <GracePeriod />
            </Table.Cell>
            <Table.Cell>
              <SpecialCase />
            </Table.Cell>
            <Table.Cell>
              <GracePeriod />
            </Table.Cell>
            <Table.Cell>
              <Normal />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </TableWrapper>
  );
}

export function Tokurei2026(props: TableWrapperProps) {
  return (
    <TableWrapper {...props}>
      <Table.Root>
        <Table.Caption className={css({ textAlign: "start" })}>
          シーズン移行に伴う特例措置
        </Table.Caption>
        <colgroup>
          <col span={5} className={css({ minWidth: "12em" })} />
        </colgroup>
        <Table.Head>
          <Table.Row>
            {[
              "25シーズン",
              "26特別シーズン",
              "26/27シーズン",
              "27/28シーズン",
              "28/29シーズン",
            ].map((value) => (
              <Table.Cell
                key={value}
                className={css({ minWidth: "12em" })}
                scope="column"
                align="center"
              >
                {value}
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row bg="keyColor.bg">
            <Table.Cell align="center">
              <strong>特例措置なし</strong>
            </Table.Cell>
            <Table.Cell colSpan={2} align="center">
              <strong>
                <ins>特例措置</ins>
              </strong>
            </Table.Cell>
            <Table.Cell align="center">
              <strong>
                <ins>猶予期間</ins>
              </strong>
            </Table.Cell>
            <Table.Cell align="center">
              <strong>特例措置なし</strong>
            </Table.Cell>
          </Table.Row>
          <Table.Row textStyle="dns-16N-130">
            <Table.Cell>
              <Normal />
            </Table.Cell>
            <Table.Cell colSpan={2}>
              <SpecialCase />
            </Table.Cell>
            <Table.Cell>
              <GracePeriod />
            </Table.Cell>
            <Table.Cell>
              <Normal />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </TableWrapper>
  );
}
