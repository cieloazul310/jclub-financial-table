import { Table } from "@/components/ui/table";
import { TableWrapper } from "./table-wrapper";
import { FigureWrapper, type FigureWrapperProps } from "./wrapper";

export function PLFigureRaw({ dense = true, ...rest }: Table.RootProps) {
  const props = { dense, ...rest };
  return (
    <TableWrapper>
      <Table.Root {...props}>
        <Table.Head>
          <Table.Row>
            <Table.Cell>項目</Table.Cell>
            <Table.Cell>計算</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <strong>売上高 (営業収入)</strong>
            </Table.Cell>
            <Table.Cell />
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <strong>営業費用</strong>
            </Table.Cell>
            <Table.Cell textStyle="dns-14N-130">売上原価 + 販管費</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell pl={8}>売上原価</Table.Cell>
            <Table.Cell />
          </Table.Row>
          <Table.Row>
            <Table.Cell pl={8}>販売費及び一般管理費</Table.Cell>
            <Table.Cell />
          </Table.Row>
          <Table.Row bg="keyColor.bg">
            <Table.Cell>営業利益</Table.Cell>
            <Table.Cell textStyle="dns-14N-130">売上高 - 営業費用</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell pl={8}>営業外収益</Table.Cell>
            <Table.Cell />
          </Table.Row>
          <Table.Row>
            <Table.Cell pl={8}>営業外費用</Table.Cell>
            <Table.Cell />
          </Table.Row>
          <Table.Row bg="keyColor.bg">
            <Table.Cell>経常利益</Table.Cell>
            <Table.Cell textStyle="dns-14N-130">
              営業利益 + 営業外収益 - 営業外費用
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell pl={8}>特別利益</Table.Cell>
            <Table.Cell />
          </Table.Row>
          <Table.Row>
            <Table.Cell pl={8}>特別損失</Table.Cell>
            <Table.Cell />
          </Table.Row>
          <Table.Row bg="keyColor.bg">
            <Table.Cell>税引前当期利益</Table.Cell>
            <Table.Cell textStyle="dns-14N-130">
              経常利益 + 特別利益 - 特別損失
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell pl={8}>法人税および住民税等</Table.Cell>
            <Table.Cell />
          </Table.Row>
          <Table.Row bg="keyColor.bg">
            <Table.Cell>
              <strong>当期純利益</strong>
            </Table.Cell>
            <Table.Cell textStyle="dns-14N-130">
              税引前利益 - 法人税等
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </TableWrapper>
  );
}

export function PLFigure(props: FigureWrapperProps) {
  return (
    <FigureWrapper {...props}>
      <PLFigureRaw />
    </FigureWrapper>
  );
}
