import type { PropsWithChildren } from "react";
import type { Extended, General } from "@cieloazul310/jclub-financial/types";
import { cx, css } from "styled-system/css";
import { circle } from "styled-system/patterns";
import type { ComponentProps } from "styled-system/types";
import { Table } from "@/components/ui/table";
import { Mode } from "@/utils/types";
import { Link } from "@/components/link";
import { Tooltip } from "@/components/tooltip";

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
  minWidth = "6em",
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

export function WithPeriodMonth({
  datum,
  children,
}: PropsWithChildren<{
  datum: Extended<Pick<General, "reporting_period_months">>;
}>) {
  const { reporting_period_months } = datum;
  if (!reporting_period_months || reporting_period_months.value === 12)
    return children;

  return (
    <Tooltip content={`決算期変更により${reporting_period_months.value}ヶ月間`}>
      <span className={css({ position: "relative" })}>
        {children}
        <span
          className={circle({
            bg: "success.1",
            color: "white",
            position: "absolute",
            top: 0,
            right: 0,
            transform: "translate(6px, -2px)",
            size: "8px",
            p: 1,
            zIndex: 1,
          })}
        />
      </span>
    </Tooltip>
  );
}

interface TableBodyLabelProps {
  mode: Mode;
  index: number;
  datum: Extended<
    Pick<General, "short_name" | "clubId" | "year" | "reporting_period_months">
  >;
}

export function TableBodyLabel({ mode, index, datum }: TableBodyLabelProps) {
  if (mode === "club")
    return (
      <TableHeaderLabel
        mode={mode}
        className={cx(tbodyLabelStyle, css({ textAlign: "center" }))}
        scope="row"
      >
        <WithPeriodMonth datum={datum}>
          <Link href={`/year/${datum.year.value}/`} color="inherit">
            {datum.year.value}
          </Link>
        </WithPeriodMonth>
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
        <WithPeriodMonth datum={datum}>
          <Link href={`/club/${datum.clubId.value}/`} color="inherit">
            {datum.short_name.value}
          </Link>
        </WithPeriodMonth>
      </TableHeaderLabel>
    </>
  );
}
