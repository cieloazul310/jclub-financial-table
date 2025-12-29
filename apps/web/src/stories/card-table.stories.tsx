import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { getLabel } from "@cieloazul310/jclub-financial";
import { cx, css } from "styled-system/css";
import { CardTableBase, CardTableRow } from "@/components/figure/card/table";
import { Diff } from "@/components/shortcodes/diff";
import { val } from "@/utils/val";
import { pl } from "./card-values";

const meta = {
  title: "Figure/Card/Table",
  component: CardTableBase,
} satisfies Meta<typeof CardTableBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: pl.map(
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
            value={val(value, { separator: separator })}
            diff={diff && <Diff>{diff}</Diff>}
            red={redIfMinus && value < 0}
            {...rest}
          />
        ),
    ),
  },
};
