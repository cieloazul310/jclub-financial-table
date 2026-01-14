import { css } from "styled-system/css";
import { Table } from "@/components/ui/table";
import { TableWrapper, type TableWrapperProps } from "./table-wrapper";

export function ExpenseList({ ...rest }: TableWrapperProps) {
  const props = { ...rest };
  return (
    <TableWrapper {...props}>
      <Table.Root dense>
        <colgroup>
          <col span={6} className={css({ minWidth: "6em" })} />
        </colgroup>
        <Table.Head>
          <Table.Row>
            <Table.Header scope="column">区分</Table.Header>
            <Table.Header scope="column">2005-10</Table.Header>
            <Table.Header scope="column">2011-15</Table.Header>
            <Table.Header scope="column">2016-2021</Table.Header>
            <Table.Header scope="column">2022-23</Table.Header>
            <Table.Header scope="column">2024-</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Header
              scope="row"
              rowSpan={8}
              borderColor="solid-gray.420"
              borderRightWidth="1px"
            >
              売上原価
            </Table.Header>
            <Table.Cell rowSpan={2}>事業費のうちチーム人件費</Table.Cell>
            <Table.Cell colSpan={2} rowSpan={2}>
              チーム人件費
            </Table.Cell>
            <Table.Cell
              rowSpan={2}
              borderColor="solid-gray.420"
              borderRightWidth="1px"
            >
              トップチーム人件費
            </Table.Cell>
            <Table.Cell>トップチーム人件費</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>移籍関連費用</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell
              rowSpan={6}
              borderColor="solid-gray.420"
              borderRightWidth="1px"
            >
              事業費
            </Table.Cell>
            <Table.Cell colSpan={4}>試合関連経費</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell colSpan={4}>トップチーム運営経費</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell colSpan={4}>アカデミー運営経費</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell colSpan={4}>女子チーム運営経費</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell
              rowSpan={3}
              bg="solid-gray.bg"
              borderColor="solid-gray.420"
              borderRightWidth="1px"
            >
              販売費および一般管理費
            </Table.Cell>
            <Table.Cell colSpan={3}>物販関連経費</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell
              rowSpan={2}
              borderColor="solid-gray.420"
              borderRightWidth="1px"
              bg="solid-gray.bg"
            >
              販売費および一般管理費
            </Table.Cell>
            <Table.Cell colSpan={2}>その他売上原価</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Header
              bg="solid-gray.bg"
              borderColor="solid-gray.420"
              borderRightWidth="1px"
            >
              販管費
            </Table.Header>
            <Table.Cell
              borderColor="solid-gray.420"
              borderRightWidth="1px"
              bg="solid-gray.bg"
            >
              一般管理費
            </Table.Cell>
            <Table.Cell colSpan={2} bg="solid-gray.bg">
              販売費および一般管理費
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </TableWrapper>
  );
}
