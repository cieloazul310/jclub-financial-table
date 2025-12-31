import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Portal } from "@ark-ui/react/portal";
import { css } from "styled-system/css";
import {
  Toast,
  Toaster as ArkToaster,
  createToaster,
} from "@/components/my-ui/toast";
import { Button } from "@/components/ui/button";

const toaster = createToaster({
  placement: "bottom-end",
  duration: Infinity,
});

const Toaster = () => (
  <Portal>
    <ArkToaster toaster={toaster}>
      {(toast) => (
        <Toast.Root key={toast.id} justifyContent="space-between">
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: 1,
            })}
          >
            {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
            {toast.description && (
              <Toast.Description>{toast.description}</Toast.Description>
            )}
          </div>
          <Toast.CloseTrigger>
            <Button variant="text" size="sm" px={4} minWidth="auto">
              OK
            </Button>
          </Toast.CloseTrigger>
        </Toast.Root>
      )}
    </ArkToaster>
  </Portal>
);

const meta = {
  title: "Components/MyUI/Toast",
  decorators: [
    (Story: any) => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Button
      onClick={() =>
        toaster.create({
          description: "表をクリップボードにコピーしました",
          type: "info",
        })
      }
    >
      開く
    </Button>
  ),
};
