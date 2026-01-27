import type { ReactNode } from "react";
import { cx, css } from "styled-system/css";
import { styled } from "styled-system/jsx";
import type { ComponentProps, HTMLStyledProps } from "styled-system/types";
import { Table } from "@/components/ui/table";
import { Diff } from "./diff";

export function SummaryTable({
  children,
  caption,
  disableDiff = false,
  position = "relative",
  maxWidth = "full",
  overflowX = "auto",
  ...rest
}: HTMLStyledProps<"div"> & {
  disableDiff?: boolean;
  caption?: ReactNode;
}) {
  const props = { position, maxWidth, overflowX, ...rest };
  return (
    <styled.div {...props}>
      <Table.Root dense>
        <colgroup>
          <col className={css({ minWidth: "140px" })} />
          <col span={2} />
        </colgroup>
        <Table.Head>
          <Table.Row>
            <Table.Header
              className={css({ minWidth: "140px" })}
              align="right"
              scope="col"
            >
              項目
            </Table.Header>
            <Table.Header align="right" scope="col">
              数値
            </Table.Header>
            {!disableDiff && (
              <Table.Header align="right" scope="col">
                前年差
              </Table.Header>
            )}
          </Table.Row>
        </Table.Head>
        <Table.Body>{children}</Table.Body>
        {caption && <caption>{caption}</caption>}
      </Table.Root>
    </styled.div>
  );
}

export function checkIsMinus(value: string | number) {
  if (typeof value === "number") return value < 0;
  const firstCharacter = value.slice(0, 1);
  return firstCharacter === "-" || firstCharacter === "▲";
}

export function createDisplayValue(value: string | number) {
  const isMinus = checkIsMinus(value);
  if (!isMinus) return { isMinus, displayValue: value };
  return { isMinus, displayValue: `▲${value.toString().slice(1)}` };
}

export function SummaryTableRow({
  label,
  val,
  diff,
  emphasizedIfMinus = false,
  ...props
}: ComponentProps<typeof Table.Row> & {
  label: string;
  val: number | string;
  diff?: number | string;
  emphasizedIfMinus?: boolean;
}) {
  const { isMinus, displayValue } = createDisplayValue(val);
  const red = emphasizedIfMinus && isMinus;

  return (
    <Table.Row {...props}>
      <Table.Header scope="row" align="right">
        {label}
      </Table.Header>
      <Table.Cell
        align="right"
        whiteSpace="nowrap"
        className={cx(red && css({ color: "red.900" }))}
      >
        {isMinus && <span className={css({ srOnly: true })}>マイナス</span>}
        {displayValue}
      </Table.Cell>
      {diff ? (
        <Table.Cell align="right" whiteSpace="nowrap">
          <Diff>{diff}</Diff>
        </Table.Cell>
      ) : (
        <Table.Cell />
      )}
    </Table.Row>
  );
}
