"use client";

import type { SortableFields } from "@cieloazul310/jclub-financial";
import { cx, css } from "styled-system/css";
import type { ComponentProps } from "styled-system/types";
import { Table } from "@/components/ui/table";
import { useTableStore } from "@/providers/table-store-provider";
import type { Mode } from "@/utils/types";

export function TableHeadCell({
  sortableKey,
  mode,
  children,
  py = 1,
  px = 0.5,
  minWidth = "6em",
  verticalAlign = "middle",
  textAlign = "center",
  textStyle = "dns-14B-130",
  ...rest
}: Omit<ComponentProps<typeof Table.Cell>, "align"> & {
  mode: Mode;
  sortableKey?: SortableFields;
}) {
  const props = {
    py,
    px,
    minWidth,
    textStyle,
    verticalAlign,
    textAlign,
    ...rest,
  };
  const { sortField, setSortKey, toggleSort } = useTableStore((store) => store);
  const sortable = mode === "year" && !!sortableKey;
  const selected = mode === "year" && sortField === sortableKey;

  const onClick = () => {
    if (!sortable) return;
    if (selected) {
      toggleSort();
    } else {
      setSortKey(sortableKey);
    }
  };

  return (
    <Table.Header
      align="center"
      className={cx(selected && css({ bg: "keyColor.primary" }))}
      {...props}
    >
      <button
        className={cx(
          css({
            textWrap: "balance",
            minHeight: "40px",
            width: "full",
          }),
          sortable && css({ cursor: "pointer" }),
          sortable &&
            !selected &&
            css({
              color: {
                _hover: "keyColor.primary",
                _active: "keyColor.primary.100",
              },
            }),
          selected && css({ color: "white" }),
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </Table.Header>
  );
}
