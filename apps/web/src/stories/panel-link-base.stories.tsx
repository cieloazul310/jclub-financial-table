import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Image from "next/image";
import { FileIcon } from "lucide-react";
import { css } from "styled-system/css";
import { cq } from "styled-system/patterns";
import { ChipLabel } from "@/components/ui/chip-label";
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
      <Image
        src="https://cieloazul310.github.io/ogimage.png"
        alt="水戸地図"
        width={320}
        height={180}
        unoptimized
      />
    ),
    asLink: true,
  },
};

export const WithoutImage: Story = {
  args: {
    children: "水戸地図",
    href: "https://cieloazul310.github.io",
    image: <ImagePlaceholder href="https://cieloazul310.github.io" />,
    asLink: true,
  },
};

export const WithLongTitle: Story = {
  args: {
    children:
      "いわてグルージャ盛岡が株式譲渡を発表 NOVA傘下からエムグループ傘下へ",
    href: "https://grulla-morioka.jp/tab01_game/1201_2/",
    image: (
      <ImagePlaceholder href="https://grulla-morioka.jp/tab01_game/1201_2/" />
    ),
    imageOverlay: (
      <ChipLabel
        className={css({ position: "absolute", top: 2, right: 2 })}
        variant="ghost"
      >
        <FileIcon />
        PDF
      </ChipLabel>
    ),
    asLink: true,
  },
};
