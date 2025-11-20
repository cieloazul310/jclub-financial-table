"use client";

import { cx, css } from "styled-system/css";
import type { ComponentProps } from "styled-system/types";
import { Table } from "@/components/ui/table";
import { useTableStore } from "@/providers/table-store-provider";
import type { Mode, SortableKey } from "@/utils/types";

export function TableHeadCell({
  sortableKey,
  mode,
  children,
  py = 1,
  px = 0.5,
  minWidth = "6em",
  verticalAlign = "middle",
  textStyle = "dns-14B-130",
  ...rest
}: Omit<ComponentProps<typeof Table.Cell>, "align"> & {
  mode: Mode;
  sortableKey?: SortableKey;
}) {
  const props = { py, px, minWidth, textStyle, verticalAlign, ...rest };
  const { sortKey, setSortKey, toggleSort } = useTableStore((store) => store);
  const sortable = mode === "year" && !!sortableKey;
  const selected = mode === "year" && sortKey === sortableKey;

  const onClick = () => {
    if (!sortable) return;
    if (selected) {
      toggleSort();
    } else {
      setSortKey(sortableKey);
    }
  };

  return (
    <Table.Cell align="center" className={cx(selected && css({ bg: "keyColor.primary" }))} {...props} >
      <button
        className={cx(
          css({
            textWrap: "balance"
          }),
          sortable && css({ cursor: "pointer"}),
          (sortable && !selected) &&
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
    </Table.Cell>
  );
}
