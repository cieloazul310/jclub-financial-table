"use client";

import { Toast } from "@ark-ui/react/toast";
import { XIcon } from "lucide-react";
import { toast } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createStyleContext(toast);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(Toast.Root, "root");

export const Title = withContext(Toast.Title, "title");
export const Description = withContext(Toast.Description, "description");

export const CloseTrigger = withContext(Toast.CloseTrigger, "closeTrigger", {
  defaultProps: { children: <XIcon /> },
});
export const ActionTrigger = withContext(Toast.ActionTrigger, "actionTrigger");

export { ToastContext as Context } from "@ark-ui/react/toast";
