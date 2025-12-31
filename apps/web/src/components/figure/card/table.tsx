import type { ReactNode } from "react";
import {
  getLabel,
  type ExtendedFinancialDatum,
  type SortableKeys,
} from "@cieloazul310/jclub-financial";
import { cx, css } from "styled-system/css";
import { useTableStore } from "@/providers/table-store-provider";
import { Table } from "@/components/ui/table";
import { Diff } from "@/components/shortcodes/diff";
import { format } from "@/utils/format";
import type { Mode, Tab } from "@/utils/types";
import { cardValues } from "./values";

type CardTableRowProps = {
  label: ReactNode;
  value: ReactNode;
  delta?: ReactNode;
  inset?: boolean;
  emphasized?: boolean;
  strong?: boolean;
  red?: boolean;
};

export function CardTableRow({
  label,
  value,
  delta,
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
        className={inset ? css({ pl: 6 }) : undefined}
        fontWeight="N"
        verticalAlign="middle"
        p={1}
        scope="row"
      >
        {label}
      </Table.Header>
      <Table.Cell
        className={cx(
          css({ fontFamily: "Helvetica, Arial, sans-serif" }),
          strong ? css({ fontWeight: "bold" }) : undefined,
          red ? css({ color: "red.900" }) : undefined,
        )}
        p={1}
        align="right"
      >
        {value}
      </Table.Cell>
      <Table.Cell
        className={css({ fontFamily: "Helvetica, Arial, sans-serif" })}
        p={1}
        align="right"
      >
        {delta}
      </Table.Cell>
    </Table.Row>
  );
}

export const renderRow = ({
  tab,
  datum,
  mode,
  sortKey,
  onClick,
}: {
  tab: Tab;
  mode: Mode;
  datum: ExtendedFinancialDatum;
  sortKey: SortableKeys;
  onClick: (id: SortableKeys) => () => void;
}) => {
  const values = cardValues[tab];
  return values.map(({ id, label, separator, redIfMinus, ...rest }) => {
    if (typeof datum[id]?.value !== "number") return null;
    const { value, delta } = datum[id];
    const sortable = mode === "year";
    const selected = sortable && sortKey === id;
    const red = redIfMinus && value < 0;
    return (
      <CardTableRow
        key={id}
        label={
          <button
            className={cx(
              css({ textAlign: "start" }),
              sortable &&
                css({
                  cursor: "pointer",
                  color: {
                    _hover: "keyColor.primary.100",
                    _active: "keyColor.secondary",
                  },
                  textDecoration: { _hover: "underline" },
                }),
              selected &&
                css({
                  color: "keyColor.secondary",
                }),
            )}
            onClick={onClick(id)}
          >
            {label ?? getLabel(id)}
          </button>
        }
        value={format(value, { separator })}
        delta={delta && <Diff>{format(delta, { separator })}</Diff>}
        red={red}
        {...rest}
      />
    );
  });
};

type CardTableBaseProps = Table.RootProps;

export function CardTableBase({
  children,
  dense = true,
  textStyle = "std-16N-170",
  ...rest
}: CardTableBaseProps) {
  const props = { dense, textStyle, ...rest } satisfies Table.RootProps;

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

type CardTableProps = {
  datum: ExtendedFinancialDatum;
  mode: Mode;
};

export function CardTable({ datum, mode }: CardTableProps) {
  const { tab, sortKey, sortAsc, setSortKey, toggleSort } = useTableStore(
    (store) => store,
  );
  const onClick = (id: SortableKeys) => () => {
    if (mode === "club") return;
    if (sortKey === id) {
      toggleSort();
    } else {
      setSortKey(id);
      if (sortAsc) {
        toggleSort();
      }
    }
  };

  return (
    <CardTableBase>
      {renderRow({ tab, datum, mode, sortKey, onClick })}
    </CardTableBase>
  );
}
