import type { PropsWithChildren } from "react";
import type { MDXComponents } from "mdx/types";
import { Tweet, TweetSkeleton } from "react-tweet";
import { cx, css } from "styled-system/css";
import { styled } from "styled-system/jsx";
import type { HTMLStyledProps } from "styled-system/types";
import { NotificationBanner } from "@/components/ui/notification-banner";
import { Paragraph } from "@/components/article";
import { Link } from "@/components/link";
import { withArticle } from "@/styles/with-article";
import { Blockquote } from "./blockquote";
import { Diff } from "./diff";
import { WorkInProgress, Written } from "./annotation";
import { Details } from "./details";
import { LeadingText } from "./leading-text";
import { PanelLink, PanelLinkShorthand } from "./panel-link";
import { SummaryTable, SummaryTableRow } from "./summary-table";

export const Ad = () => (
  <div className={css({ my: 8, minHeight: "120px", bg: "solid-gray.bg" })}>
    Ad
  </div>
);

const Red = ({ color = "error.2", ...props }: HTMLStyledProps<"span">) => (
  <styled.span color={color} {...props} />
);

const Green = ({ color = "success.2", ...props }: HTMLStyledProps<"span">) => (
  <styled.span color={color} {...props} />
);

export const Alert = ({
  children,
  title,
  severity = "warning",
}: PropsWithChildren<{
  title?: string;
  severity?: NotificationBanner.RootProps["type"];
}>) => (
  <NotificationBanner.Root type={severity} my={8}>
    <NotificationBanner.Icon />
    {title && (
      <NotificationBanner.Header>
        <NotificationBanner.Heading>{title}</NotificationBanner.Heading>
      </NotificationBanner.Header>
    )}
    <NotificationBanner.Body>{children}</NotificationBanner.Body>
  </NotificationBanner.Root>
);

export const shortcodes = {
  Ad,
  Alert,
  /**
   * @deprecated
   */
  AppLink: (props) => <Link {...props} />,
  Blockquote: ({ className, ...props }) => (
    <Blockquote {...props} my={8} className={cx(className, withArticle)} />
  ),
  Details: ({ className, ...props }) => (
    <Details {...props} my={8} className={cx(className, withArticle)} />
  ),
  Diff,
  Green,
  LeadingText,
  PanelLink: ({ className, ...props }) => (
    <PanelLink {...props} my={8} className={cx(className, withArticle)} />
  ),
  PanelLinkShorthand,
  Red,
  SummaryTable: ({ className, ...props }) => (
    <SummaryTable {...props} my={8} className={cx(className, withArticle)} />
  ),
  SummaryTableRow,
  WorkInProgress,
  Written,
  /**
   * @deprecated
   */
  Typography: () => null,
  SimpleTable: () => null,
  SubParagraph: ({ ...props }) => (
    <Paragraph textStyle="std-16N-170" {...props} />
  ),
  Tweet: ({ ...props }) => (
    <div className="light">
      <Tweet fallback={<TweetSkeleton />} {...props} />
    </div>
  ),
} satisfies MDXComponents;
