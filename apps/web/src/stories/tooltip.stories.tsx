import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Portal } from "@ark-ui/react/portal";
import { Tooltip } from "@/components/my-ui/tooltip";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/MyUI/Tooltip",
  component: Tooltip.Root,
} satisfies Meta<typeof Tooltip.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    open: true,
    children: (
      <>
        <Tooltip.Trigger asChild>
          <Button>Hover</Button>
        </Tooltip.Trigger>
        <Portal>
          <Tooltip.Positioner>
            <Tooltip.Content>Tooltip</Tooltip.Content>
          </Tooltip.Positioner>
        </Portal>
      </>
    ),
  },
};
