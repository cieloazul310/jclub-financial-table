import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { getLabel } from "@cieloazul310/jclub-financial";
import { cx, css } from "styled-system/css";
import { CardItemBase, CardItemHeader } from "@/components/figure/card/item";
import { CardTableBase, CardTableRow } from "@/components/figure/card/table";
import { CategoryLabel } from "@/components/category-label";
import { Link } from "@/components/link";
import { Diff } from "@/components/shortcodes/diff";
import { format } from "@/utils/format";
import { pl } from "./card-values";

const meta = {
  title: "Figure/Card/Item",
  component: CardItemBase,
} satisfies Meta<typeof CardItemBase>;

export default meta;
type Story = StoryObj<typeof meta>;

const children = (
  <CardTableBase>
    {pl.map(
      ({ key, sortable, value, diff, separator, redIfMinus, ...rest }) =>
        value !== null && (
          <CardTableRow
            key={key}
            label={
              <button
                className={cx(
                  css({ textAlign: "start" }),
                  sortable
                    ? css({
                        cursor: "pointer",
                        _hover: {
                          color: "keyColor.primary",
                          textDecoration: "underline",
                        },
                      })
                    : undefined,
                )}
                onClick={sortable ? fn() : undefined}
              >
                {getLabel(key)}
              </button>
            }
            value={format(value, { separator })}
            diff={diff && <Diff>{diff}</Diff>}
            red={redIfMinus && value < 0}
            {...rest}
          />
        ),
    )}
  </CardTableBase>
);

export const Club: Story = {
  args: {
    header: (
      <CardItemHeader
        title={
          <Link href="/" color="inherit">
            2026年度決算
          </Link>
        }
        header={
          <span className={css({ display: "flex", gap: 1, mb: 1 })}>
            <CategoryLabel category="J1" />
            <span>水戸</span>
            <span>J1 14位</span>
          </span>
        }
        footer={<span>損益計算書(P/L)</span>}
      />
    ),
    children,
  },
};

export const Year: Story = {
  args: {
    header: (
      <CardItemHeader
        title={
          <Link href="/" color="inherit">
            水戸ホーリーホック
          </Link>
        }
        header={
          <span className={css({ display: "flex", gap: 1, mb: 1 })}>
            <CategoryLabel category="J1" />
            <span>2025年度</span>
            <span>J1 14位</span>
          </span>
        }
        footer={<span>損益計算書(P/L)</span>}
      />
    ),
    children,
  },
};
