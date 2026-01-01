import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { css } from "styled-system/css";
import { ChipLabel } from "@/components/ui/chip-label";
import { PostListItemBase } from "@/components/post/list-item";

const headerText = (
  <span className={css({ display: "flex", gap: 2, textStyle: "dns-16N-130" })}>
    <ChipLabel variant="ghost" zIndex={1} textStyle="dns-14B-130">
      岩手
    </ChipLabel>
    <ChipLabel
      colorPalette="solid-gray"
      variant="ghost"
      zIndex={1}
      textStyle="dns-14B-130"
    >
      資本政策
    </ChipLabel>
  </span>
);

const footerText = (
  <span
    className={css({
      display: "flex",
      flexDirection: { base: "column", sm: "row" },
      gap: { base: 0, sm: 2 },
      alignItems: { base: "start", sm: "baseline" },
      textStyle: "dns-16N-130",
    })}
  >
    <time dateTime="2025-12-01">2025年12月1日</time>
    <small className={css({ color: "solid-gray.600" })}>
      最終更新日:
      <time dateTime="2025-12-02">2025年12月2日</time>
    </small>
  </span>
);

const meta = {
  title: "Components/ListItem",
  component: PostListItemBase,
  args: {
    title:
      "いわてグルージャ盛岡が株式譲渡を発表 NOVA傘下からエムグループ傘下へ",
    href: "/posts/2025/12/grulla",
    headerText,
    footerText,
  },
} satisfies Meta<typeof PostListItemBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const List: Story = {
  render: ({ ...args }) => (
    <div
      className={css({ display: "grid", gridTemplateColumns: "1fr", gap: 2 })}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <PostListItemBase key={index.toString()} {...args} />
      ))}
    </div>
  ),
};

export const WithGrid: Story = {
  render: ({ ...args }) => (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 2,
      })}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <PostListItemBase key={index.toString()} {...args} />
      ))}
    </div>
  ),
};
