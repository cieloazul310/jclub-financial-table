import type { HTMLStyledProps } from "styled-system/types";
import { Ad, AdInArticle as InArticle } from "./ad";
import { InView } from "./in-view";
import { AdWrapper } from "./wrapper";

export function AdInArticle({
  my = 12,
  ...rest
}: Omit<HTMLStyledProps<"div">, "children">) {
  const props = { my, ...rest };
  return <InArticle {...props} />;
}

export function AdInPage({
  ...rest
}: Omit<HTMLStyledProps<"div">, "children">) {
  const props = { ...rest };
  return <Ad {...props} />;
}

export function AdInLayout({
  ...rest
}: Omit<HTMLStyledProps<"div">, "children">) {
  const props = { ...rest };
  return <Ad slot="5693068398" {...props} />;
}

export function AdInFooter({
  ...props
}: Omit<HTMLStyledProps<"div">, "children">) {
  return <Ad slot="3332658358" {...props} />;
}

export function AdInSide({
  ...props
}: Omit<HTMLStyledProps<"div">, "children">) {
  return (
    <AdWrapper {...props}>
      <InView>
        <Ad slot="9056355562" />
      </InView>
    </AdWrapper>
  );
}
