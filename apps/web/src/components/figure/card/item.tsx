import type { ReactNode, PropsWithChildren } from "react";
import type { FinancialDatum } from "@cieloazul310/jclub-financial";
import { css } from "styled-system/css";
import { Card } from "@/components/ui/card";

type CardItemBaseProps = PropsWithChildren<{
  header: ReactNode;
}> &
  Omit<Card.RootProps, "children">;

export function CardItemBase({
  header,
  children,
  gridTemplateAreas = `"main"`,
  ...rest
}: CardItemBaseProps) {
  const props = { gridTemplateAreas, ...rest };
  return (
    <Card.Root {...props}>
      <Card.Main>
        {header}
        {children}
      </Card.Main>
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

type CardItemProps = {
  datum: FinancialDatum;
};

export function CardItem({ datum }: CardItemProps) {
  return (
    <CardItemBase
      header={<CardItemHeader title={datum.fullname} />}
    ></CardItemBase>
  );
}
