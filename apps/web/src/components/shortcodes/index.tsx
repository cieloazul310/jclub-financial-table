import type { PropsWithChildren } from "react";
import type { MDXComponents } from "mdx/types";
import { cx, css } from "styled-system/css";
import type {
  ComponentProps,
  JsxHTMLProps,
  JsxStyleProps,
} from "styled-system/types";
import { Link } from "@/components/link";
import { NotificationBanner } from "@/components/ui/notification-banner";
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

const Red = ({ children }: PropsWithChildren) => (
  <span className={css({ color: "red.primary" })}>{children}</span>
);

const Green = ({ children }: PropsWithChildren) => (
  <span className={css({ color: "green.primary" })}>{children}</span>
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
} satisfies MDXComponents;
