import { cx, css } from "styled-system/css";
import { Table } from "@/components/ui/table";
import { TableWrapper } from "@/components/docs/figures/table-wrapper";
import { format } from "@/utils/format";
import { Diff } from "./diff";

type SimpleTableProps = {
  cols: string[];
  rows: string[];
  data: number[][];
  unit?: string;
  disableUnit?: boolean;
  customUnits?: (string | null)[];
  emphasizedRows?: number[];
  emphasizedColsIfMinus?: number[];
  diff?: boolean;
  diffLabel?: string;
  separator?: boolean;
  decimal?: number;
};

export function SimpleTable({
  cols,
  rows,
  data,
  unit,
  disableUnit = false,
  customUnits,
  emphasizedRows = [],
  emphasizedColsIfMinus = [],
  diff,
  diffLabel,
  separator = false,
  decimal = 0,
}: SimpleTableProps) {
  const diffData = data[data.length - 1]?.map((value, index) => {
    const prevValue = data?.[data.length - 2]?.[index];
    if (!prevValue) return null;
    return value - prevValue;
  });

  return (
    <TableWrapper>
      <Table.Root dense>
        <Table.Head>
          <Table.Row>
            <Table.Cell align="right" whiteSpace="nowrap">
              {disableUnit ? "" : `(単位: ${unit ?? "百万円"})`}
            </Table.Cell>
            {cols.map((label) => (
              <Table.Header key={label} align="right" scope="col">
                {label}
              </Table.Header>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((label, rowIndex) => (
            <Table.Row
              key={label}
              className={cx(
                emphasizedRows.includes(rowIndex + 1) &&
                  css({ bg: "keyColor.bg" }),
              )}
            >
              <Table.Header align="right" scope="row">
                {label}
              </Table.Header>
              {data?.[rowIndex]?.map((value, colIndex) => (
                <Table.Cell
                  key={`${rowIndex}-${colIndex}`}
                  align="right"
                  whiteSpace="nowrap"
                  className={cx(
                    emphasizedRows.includes(rowIndex + 1) &&
                      css({ fontWeight: "bold" }),
                    emphasizedColsIfMinus.includes(colIndex + 1) && value < 0
                      ? css({ color: "error.2" })
                      : undefined,
                  )}
                >
                  {format(value, { separator, decimal })}
                  {customUnits?.[colIndex]}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
        {diff && (
          <Table.Foot>
            <Table.Row>
              <Table.Cell align="right">{diffLabel ?? "差分"}</Table.Cell>
              {diffData?.map((value, colIndex) => (
                <Table.Cell
                  key={`diff-${colIndex}`}
                  align="right"
                  whiteSpace="nowrap"
                >
                  <Diff>{format(value, { separator, decimal })}</Diff>
                  {customUnits?.[colIndex]}
                </Table.Cell>
              ))}
            </Table.Row>
          </Table.Foot>
        )}
      </Table.Root>
    </TableWrapper>
  );
}
