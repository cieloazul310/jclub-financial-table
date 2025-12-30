import type { ReactNode } from "react";
import type { ExtendedFinancialDatum } from "@cieloazul310/jclub-financial";
import { cx, css } from "styled-system/css";
import { Card } from "@/components/ui/card";
import { Link } from "@/components/link";
import { CategoryLabel } from "@/components/category-label";
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
};

export function CardItemHeader({ title, header, footer }: CardItemHeaderProps) {
  return (
    <hgroup className={css({ display: "flex", flexDirection: "column" })}>
      {header}
      <Card.Title>{title}</Card.Title>
      {footer}
    </hgroup>
  );
}

function tabToLabel(tab: Tab) {
  switch (tab) {
    case "pl":
      return "損益計算書 (P/L)";
    case "bs":
      return "貸借対照表 (B/S)";
    case "revenue":
      return "営業収入";
    case "expense":
      return "営業費用";
    case "attd":
      return "入場者数";
    default:
      return "";
  }
}

type CardItemProps = {
  datum: ExtendedFinancialDatum;
  mode: Mode;
  tab: Tab;
};

export function CardItem({ datum, mode, tab }: CardItemProps) {
  const { year, slug, fullname, name, category, rank, elevation } = datum;

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
  const cardHeader = (
    <span className={css({ display: "flex", gap: 2, mb: 1 })}>
      <CategoryLabel category={category.value} />
      <span>{mode === "club" ? name.value : `${year.value}年`}</span>
      <span>
        {category.value} {rank.value}位
      </span>
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
  const cardFooter = <span>{tabToLabel(tab)}</span>;

  return (
    <CardItemBase minWidth="320px">
      <CardItemHeader
        title={cardTitle}
        header={cardHeader}
        footer={cardFooter}
      />
      <CardTable datum={datum} mode={mode} />
    </CardItemBase>
  );
}
