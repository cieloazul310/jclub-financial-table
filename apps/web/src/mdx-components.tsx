import type { MDXComponents } from "mdx/types";
import { css } from "styled-system/css";
import { List, OrderedList, UnorderedList } from "@/components/ui/list";
import { Divider } from "@/components/ui/divider";
import { Table } from "@/components/ui/table";
import {
  Paragraph,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Pre,
  Code,
} from "@/components/article";
import { Link } from "@/components/link";
import { shortcodes } from "@/components/shortcodes";
import { Blockquote } from "@/components/shortcodes/blockquote";

export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    p: Paragraph,
    a: Link,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    h5: Heading5,
    ol: (props) => <OrderedList {...props} />,
    ul: (props) => <UnorderedList {...props} />,
    li: (props) => <List {...props} />,
    hr: (props) => <Divider {...props} my={8} />,
    table: (props) => (
      <div
        className={css({
          position: "relative",
          maxWidth: "full",
          overflowX: "auto",
          my: 8,
        })}
      >
        <Table.Root dense={{ base: true, sm: false }} {...props} />
      </div>
    ),
    thead: (props) => <Table.Head {...props} />,
    tbody: (props) => <Table.Body {...props} />,
    tr: (props) => <Table.Row {...props} />,
    th: (props) => <Table.Header {...props} />,
    td: (props) => <Table.Cell minWidth="6em" {...props} />,
    blockquote: (props) => <Blockquote my={8} {...props} />,
    pre: Pre,
    code: Code,
    ...shortcodes,
    ...components,
  };
}
