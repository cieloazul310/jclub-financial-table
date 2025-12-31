import type { PropsWithChildren, ReactNode } from "react";
import { Portal } from "@ark-ui/react/portal";
import { Tooltip as UITooltip } from "./my-ui/tooltip";

export function Tooltip({
  children,
  content,
}: PropsWithChildren<{ content: ReactNode }>) {
  return (
    <UITooltip.Root>
      <UITooltip.Trigger asChild>{children}</UITooltip.Trigger>
      <Portal>
        <UITooltip.Positioner>
          <UITooltip.Content>{content}</UITooltip.Content>
        </UITooltip.Positioner>
      </Portal>
    </UITooltip.Root>
  );
}
