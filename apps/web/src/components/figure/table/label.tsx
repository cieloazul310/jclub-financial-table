import type { Extended, General } from "@cieloazul310/jclub-financial/types";
import { cx, css } from "styled-system/css";
import type { ComponentProps } from "styled-system/types";
import { Table } from "@/components/ui/table";
import { Mode } from "@/utils/types";
import { Link } from "@/components/link";

const theadLabelStyle = css({
  textStyle: "dns-16B-120",
  py: 1,
  px: 0.5,
  bgColor: "solid-gray.bg",
  textAlign: "center",
});
const tbodyLabelStyle = css({
  textStyle: "dns-16B-120",
  zIndex: 2,
  bgColor: "white",
});

function TableHeaderLabel({
  mode,
  position = "sticky",
  minWidth = "8em",
  width = "100px",
  borderRightWidth = "1px",
  borderColor = "solid-gray.200",
  verticalAlign = "middle",
  className,
  ...rest
}: {
  mode: Mode;
} & ComponentProps<typeof Table.Header>) {
  const props = {
    position,
    minWidth,
    width,
    borderRightWidth,
    borderColor,
    verticalAlign,
    ...rest,
  };
  return (
    <Table.Header
      className={cx(
        mode === "club" ? css({ left: 0 }) : css({ left: "36px" }),
        className,
      )}
      {...props}
    />
  );
}

function TableHeaderIndex({
  position = "sticky",
  left = 0,
  minWidth = "36px",
  width = "36px",
  px = 0.5,
  verticalAlign = "middle",
  ...rest
}: ComponentProps<typeof Table.Header>) {
  const props = { position, left, minWidth, width, px, verticalAlign, ...rest };
  return <Table.Header {...props} />;
}

export function TableHeadLabel({ mode }: { mode: Mode }) {
  if (mode === "club")
    return (
      <TableHeaderLabel mode={mode} className={theadLabelStyle}>
        年
      </TableHeaderLabel>
    );

  return (
    <>
      <TableHeaderIndex
        className={cx(theadLabelStyle, css({ textAlign: "right" }))}
      >
        i
      </TableHeaderIndex>
      <TableHeaderLabel mode={mode} className={theadLabelStyle}>
        クラブ
      </TableHeaderLabel>
    </>
  );
}

interface TableBodyLabelProps {
  mode: Mode;
  index: number;
  datum: Extended<Pick<General, "name" | "slug" | "year">>;
}

export function TableBodyLabel({ mode, index, datum }: TableBodyLabelProps) {
  if (mode === "club")
    return (
      <TableHeaderLabel
        mode={mode}
        className={cx(tbodyLabelStyle, css({ textAlign: "center" }))}
        scope="row"
      >
        <Link href={`/year/${datum.year.value}/`} color="inherit">
          {datum.year.value}
        </Link>
      </TableHeaderLabel>
    );

  return (
    <>
      <TableHeaderIndex
        className={cx(tbodyLabelStyle, css({ textAlign: "right" }))}
        scope="row"
      >
        {index + 1}
      </TableHeaderIndex>
      <TableHeaderLabel
        mode={mode}
        className={cx(tbodyLabelStyle, css({ textAlign: "right" }))}
        scope="row"
      >
        <Link href={`/club/${datum.slug.value}/`} color="inherit">
          {datum.name.value}
        </Link>
      </TableHeaderLabel>
    </>
  );
}
