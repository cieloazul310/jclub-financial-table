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

  const isLonger = reporting_period_months.value > 12;

  return (
    <Tooltip content={`決算期変更により${reporting_period_months.value}ヶ月間`}>
      <span className={css({ position: "relative" })}>
        {children}
        <span
          className={cx(
            circle({
              color: "white",
              position: "absolute",
              top: 0,
              right: 0,
              transform: "translate(6px, -2px)",
              size: "8px",
              p: 1,
              zIndex: 1,
            }),
            isLonger ? css({ bg: "success.1" }) : css({ bg: "error.1" }),
          )}
        />
      </span>
    </Tooltip>
  );
}

const useTooltip = (reporting_period_months?: number) => {
  if (!reporting_period_months || reporting_period_months === 12)
    return {
      Wrapper: ({ children }: PropsWithChildren) => children,
      Marker: () => null,
    };

  const isLonger = reporting_period_months > 12;

  return {
    Wrapper: ({ children }: PropsWithChildren) => (
      <Tooltip content={`決算期変更により${reporting_period_months}ヶ月間`}>
        {children}
      </Tooltip>
    ),
    Marker: () => (
      <span
        className={cx(
          css({
            top: 0,
            right: 0,
            width: ".8em",
            height: ".8em",
            position: "absolute",
            zIndex: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%)",
          }),
          isLonger ? css({ bg: "success.1" }) : css({ bg: "error.1" }),
        )}
      />
    ),
  };
};

interface TableBodyLabelProps {
  mode: Mode;
  index: number;
  datum: Extended<
    Pick<General, "short_name" | "clubId" | "year" | "reporting_period_months">
  >;
}

export function TableBodyLabel({ mode, index, datum }: TableBodyLabelProps) {
  const { Wrapper, Marker } = useTooltip(datum.reporting_period_months?.value);

  if (mode === "club")
    return (
      <Wrapper>
        <TableHeaderLabel
          mode={mode}
          className={cx(tbodyLabelStyle, css({ textAlign: "center" }))}
          scope="row"
        >
          <Link href={`/year/${datum.year.value}/`} color="inherit">
            {datum.year.value}
          </Link>
          <Marker />
        </TableHeaderLabel>
      </Wrapper>
    );

  return (
    <>
      <TableHeaderIndex
        className={cx(tbodyLabelStyle, css({ textAlign: "right" }))}
        scope="row"
      >
        {index + 1}
      </TableHeaderIndex>
      <Wrapper>
        <TableHeaderLabel
          mode={mode}
          className={cx(tbodyLabelStyle, css({ textAlign: "right" }))}
          scope="row"
        >
          <Link href={`/club/${datum.clubId.value}/`} color="inherit">
            {datum.short_name.value}
          </Link>
          <Marker />
        </TableHeaderLabel>
      </Wrapper>
    </>
  );
}
