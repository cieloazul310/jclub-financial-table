import { Portal } from "@ark-ui/react/portal";
import { css } from "styled-system/css";
import { Button } from "@/components/ui/button";
import {
  Toast as UIToast,
  Toaster,
  createToaster,
} from "@/components/my-ui/toast";

export const toaster = createToaster({
  placement: "bottom-end",
});

export function Toast() {
  return (
    <Portal>
      <Toaster toaster={toaster}>
        {(toast) => (
          <UIToast.Root key={toast.id} justifyContent="space-between">
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: 1,
              })}
            >
              {toast.title && (
                <UIToast.Description>{toast.title}</UIToast.Description>
              )}
              {toast.description && (
                <UIToast.Description>{toast.description}</UIToast.Description>
              )}
            </div>
            <UIToast.CloseTrigger asChild>
              <Button
                variant="text"
                size="sm"
                px={4}
                minWidth="auto"
                flexShrink={0}
              >
                OK
              </Button>
            </UIToast.CloseTrigger>
          </UIToast.Root>
        )}
      </Toaster>
    </Portal>
  );
}
