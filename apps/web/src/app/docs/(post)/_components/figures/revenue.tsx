import { css } from "styled-system/css";
import { Table } from "@/components/ui/table";
import {
  TableWrapper,
  type TableWrapperProps,
} from "@/components/table-wrapper";

export function RevenueList({ ...rest }: TableWrapperProps) {
  const props = { ...rest };
  return (
    <TableWrapper {...props}>
      <Table.Root dense>
        <colgroup>
          <col span={6} className={css({ minWidth: "6em" })} />
        </colgroup>
        <Table.Head>
          <Table.Row>
            <Table.Header scope="column">2005-11</Table.Header>
            <Table.Header scope="column">2012-15</Table.Header>
            <Table.Header scope="column">2016-2017</Table.Header>
            <Table.Header scope="column">2018-2021</Table.Header>
            <Table.Header scope="column">2022-23</Table.Header>
            <Table.Header scope="column">2024</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={3}>広告料収入</Table.Cell>
            <Table.Cell colSpan={3}>スポンサー収入</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell colSpan={6}>入場料収入</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell colSpan={6}>Jリーグ配分金</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell
              rowSpan={5}
              bg="solid-gray.bg"
              borderColor="solid-gray.420"
              borderRightWidth="1px"
            >
              その他収入
            </Table.Cell>
            <Table.Cell colSpan={5}>アカデミー関連収入</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell
              rowSpan={4}
              bg="solid-gray.bg"
              borderColor="solid-gray.420"
              borderRightWidth="1px"
            >
              その他収入
            </Table.Cell>
            <Table.Cell colSpan={4}>物販関連収入</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell
              rowSpan={3}
              colSpan={2}
              bg="solid-gray.bg"
              borderColor="solid-gray.420"
              borderRightWidth="1px"
            >
              その他収入
            </Table.Cell>
            <Table.Cell colSpan={2}>女子チーム関連収入</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell
              rowSpan={2}
              colSpan={1}
              bg="solid-gray.bg"
              borderColor="solid-gray.420"
              borderRightWidth="1px"
            >
              その他収入
            </Table.Cell>
            <Table.Cell>移籍補償金等収入</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell bg="solid-gray.bg">その他収入</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </TableWrapper>
  );
}
