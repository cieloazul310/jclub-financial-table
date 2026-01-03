import type { ReactNode } from "react";
import type { ExtendedFinancialDatum } from "@cieloazul310/jclub-financial";
import { cx, css } from "styled-system/css";
import { Card } from "@/components/ui/card";
import { Link } from "@/components/link";
import { CategoryLabel } from "@/components/category-label";
import { useTableStore } from "@/providers/table-store-provider";
import type { Mode, Tab } from "@/utils/types";
import { CardTable } from "./table";

type CardItemBaseProps = Card.RootProps;

export function CardItemBase({
  children,
  gridTemplateAreas = `"main"`,
  ...rest
}: CardItemBaseProps) {
  const props = { gridTemplateAreas, ...rest } satisfies Card.RootProps;
  return (
    <Card.Root {...props}>
      <Card.Main>{children}</Card.Main>
    </Card.Root>
  );
}

type CardItemHeaderProps = {
  title: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  page?: ReactNode;
};

export function CardItemHeader({
  title,
  header,
  footer,
  page,
}: CardItemHeaderProps) {
  return (
    <div className={css({ display: "flex", alignItems: "start" })}>
      <hgroup
        className={css({
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        })}
      >
        {header}
        <Card.Title>{title}</Card.Title>
        {footer}
      </hgroup>
      {page && (
        <small className={css({ textStyle: "oln-16B-100" })}>{page}</small>
      )}
    </div>
  );
}

const tabLabelMap = {
  pl: "損益計算書 (P/L)",
  bs: "貸借対照表 (B/S)",
  revenue: "営業収入",
  expense: "営業費用",
  attd: "入場者数",
};

type CardItemProps = {
  datum: ExtendedFinancialDatum;
  mode: Mode;
  tab: Tab;
  index: number;
  totalCount: number;
};

export function CardItem({
  datum,
  mode,
  tab,
  index,
  totalCount,
}: CardItemProps) {
  const { year, slug, fullname, name, category, rank, elevation } = datum;
  const { sortField, setSortKey, toggleSort } = useTableStore((store) => store);
  const onRankClick = () => {
    if (mode === "club") return;
    if (sortField === "rank") {
      toggleSort();
    } else {
      setSortKey("rank");
    }
  };

  const cardTitle =
    mode === "club" ? (
      <Link href={`/year/${year.value}/`} color="inherit">
        {year.value}年度決算
      </Link>
    ) : (
      <Link href={`/club/${slug.value}/`} color="inherit">
        {fullname.value}
      </Link>
    );

  const rankButton = (
    <button
      className={cx(
        css({ textAlign: "start" }),
        mode === "year" &&
          css({
            cursor: "pointer",
            color: {
              _hover: "keyColor.primary.100",
              _active: "keyColor.secondary",
            },
            textDecoration: { _hover: "underline" },
          }),
        sortField === "rank" &&
          css({
            color: "keyColor.secondary",
          }),
      )}
      onClick={onRankClick}
    >
      {category.value} {rank.value}位
    </button>
  );
  const cardHeader = (
    <span className={css({ display: "flex", gap: 2, mb: 1 })}>
      <CategoryLabel category={category.value} />
      <span>{mode === "club" ? name.value : `${year.value}年`}</span>
      {rankButton}
      {elevation?.value && (
        <span
          className={cx(
            elevation.value === "昇格" && css({ color: "success.2" }),
            elevation.value === "降格" && css({ color: "error.2" }),
          )}
        >
          {elevation.value}
        </span>
      )}
    </span>
  );
  const cardFooter = <span>{tabLabelMap[tab]}</span>;
  const page = mode === "year" ? `${index + 1}/${totalCount}` : undefined;

  return (
    <CardItemBase minWidth="320px">
      <CardItemHeader
        title={cardTitle}
        header={cardHeader}
        footer={cardFooter}
        page={page}
      />
      <CardTable datum={datum} mode={mode} />
    </CardItemBase>
  );
}
