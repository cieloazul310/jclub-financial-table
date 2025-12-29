import type { ReactNode } from "react";
import {
  type FinancialDatum,
  type General,
  type SeasonResult,
} from "@cieloazul310/jclub-financial";
import { cx, css } from "styled-system/css";
import { Table } from "@/components/ui/table";

export type CardValue = {
  key: Exclude<keyof FinancialDatum, keyof General | keyof SeasonResult>;
  value: number | null;
  diff?: number | null;
  inset?: boolean;
  emphasized?: boolean;
  strong?: boolean;
  redIfMinus?: boolean;
  separator?: boolean;
  sortable?: boolean;
};

type CardTableRowProps = {
  label: ReactNode;
  value: ReactNode;
  diff?: ReactNode;
  inset?: boolean;
  emphasized?: boolean;
  strong?: boolean;
  red?: boolean;
};

export function CardTableRow({
  label,
  value,
  diff,
  inset = false,
  emphasized = false,
  strong = false,
  red = false,
}: CardTableRowProps) {
  return (
    <Table.Row
      className={emphasized ? css({ bg: "solid-gray.bg" }) : undefined}
    >
      <Table.Header
        className={inset ? css({ pl: 8 }) : undefined}
        fontWeight="N"
        p={1}
        scope="row"
      >
        {label}
      </Table.Header>
      <Table.Cell
        className={cx(
          strong ? css({ fontWeight: "bold" }) : undefined,
          red ? css({ color: "red.900" }) : undefined,
        )}
        py={1}
        align="right"
      >
        {value}
      </Table.Cell>
      <Table.Cell py={1} align="right">
        {diff}
      </Table.Cell>
    </Table.Row>
  );
}

type CardTableBaseProps = Table.RootProps;

export function CardTableBase({
  children,
  dense = true,
  textStyle = "std-16N-170",
  ...rest
}: CardTableBaseProps) {
  const props = { dense, textStyle, ...rest };

  return (
    <Table.Root {...props}>
      <colgroup>
        <col />
        <col className={css({ width: "5em" })} />
        <col className={css({ width: "6em" })} />
      </colgroup>
      <Table.Body>{children}</Table.Body>
    </Table.Root>
  );
}
