import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { cq } from "styled-system/patterns";
import { PanelLinkBase } from "@/components/shortcodes/panel-link/base";
import { ImagePlaceholder } from "@/components/shortcodes/panel-link/image-placeholder";

const meta = {
  title: "Components/PanelLink/Base",
  component: PanelLinkBase,
  argTypes: {
    asLink: {
      type: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div className={cq()}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PanelLinkBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: "水戸地図",
    href: "https://cieloazul310.github.io",
    image: (
      <img src="https://cieloazul310.github.io/ogimage.png" alt="水戸地図" />
    ),
    asLink: true,
  },
};

export const WithoutImage: Story = {
  args: {
    children: "水戸地図",
    href: "https://cieloazul310.github.io",
    image: <ImagePlaceholder href="https://cieloazul310.github.io" internal />,
    asLink: true,
  },
};

export const WithLongTitle: Story = {
  args: {
    children:
      "いわてグルージャ盛岡が株式譲渡を発表 NOVA傘下からエムグループ傘下へ",
    href: "https://cieloazul310.github.io",
    image: <ImagePlaceholder href="https://cieloazul310.github.io" internal />,
    asLink: true,
  },
};
