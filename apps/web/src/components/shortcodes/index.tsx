import type { MDXComponents } from "mdx/types";
import { cx } from "styled-system/css";
import { styled } from "styled-system/jsx";
import type { HTMLStyledProps } from "styled-system/types";
import { Paragraph } from "@/components/article";
import { withArticle } from "@/styles/with-article";
import { AdInArticle } from "@/components/ads";
import { notificationBanner } from "./alert";
import { Blockquote } from "./blockquote";
import { Diff } from "./diff";
import { WorkInProgress, Written } from "./annotation";
import { Details } from "./details";
import { LeadingText } from "./leading-text";
import { Tokurei2020, Tokurei2023, Tokurei2026 } from "./license-tokurei";
import { PanelLink, PanelLinkShorthand } from "./panel-link";
import { SimpleTable } from "./simple-table";
import { Source2025Club, Source2025Kanpo } from "./source-2025";
import { SummaryTable, SummaryTableRow } from "./summary-table";
import { Tweet } from "./tweet";

const Red = ({ color = "error.2", ...props }: HTMLStyledProps<"span">) => (
  <styled.span color={color} {...props} />
);

export const shortcodes = {
  Ad: AdInArticle,
  Blockquote: ({ className, ...props }) => (
    <Blockquote {...props} my={8} className={cx(className, withArticle)} />
  ),
  Details: ({ className, ...props }) => (
    <Details {...props} my={8} className={cx(className, withArticle)} />
  ),
  Diff,
  LeadingText,
  PanelLink: ({ className, ...props }) => (
    <PanelLink {...props} my={8} className={cx(className, withArticle)} />
  ),
  PanelLinkShorthand,
  Red,
  SimpleTable: ({ className, ...props }) => (
    <SimpleTable {...props} my={8} className={cx(className, withArticle)} />
  ),
  SummaryTable: ({ className, ...props }) => (
    <SummaryTable {...props} my={8} className={cx(className, withArticle)} />
  ),
  SummaryTableRow,
  WorkInProgress,
  Written,
  SubParagraph: ({ ...props }) => (
    <Paragraph textStyle="std-16N-170" {...props} />
  ),

  Source2025Club,
  Source2025Kanpo,

  Tweet,
  ...notificationBanner,
  Tokurei2020,
  Tokurei2023,
  Tokurei2026,
} satisfies MDXComponents;
