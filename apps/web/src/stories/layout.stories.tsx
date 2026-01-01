import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { layout } from "styled-system/recipes";
import { Layout } from "@/components/layout";
import { Heading2, Paragraph } from "@/components/article";

const meta = {
  title: "Components/Layout",
  component: Layout,
  argTypes: {
    breakpoint: {
      control: "inline-radio",
      options: layout.variantMap.breakpoint,
    },
    headerAlways: {
      control: "boolean",
      options: layout.variantMap.headerAlways,
    },
  },
  args: {
    breakpoint: "lg",
    headerAlways: false,
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: (
      <>
        <Heading2>Layout Test</Heading2>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Paragraph>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Paragraph>
      </>
    ),
  },
};
