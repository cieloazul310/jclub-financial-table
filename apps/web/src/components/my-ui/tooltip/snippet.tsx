"use client";

import { Tooltip } from "@ark-ui/react/tooltip";
import { tooltip } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import { ComponentProps } from "styled-system/types";

const { withRootProvider, withContext } = createStyleContext(tooltip);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withRootProvider(Tooltip.Root);

export const Trigger = withContext(Tooltip.Trigger, "trigger");
export const Content = withContext(Tooltip.Content, "content");
export const Arrow = withContext(Tooltip.Arrow, "arrow");
export const ArrowTip = withContext(Tooltip.ArrowTip, "arrowTip");
export const Positioner = withContext(Tooltip.Positioner, "positioner");

export { TooltipContext as Context } from "@ark-ui/react/tooltip";
