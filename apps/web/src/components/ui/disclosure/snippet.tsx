// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.6.2 (commit: 28e00dd4b6f1071a2ce90bff052f51433ea1fe48)
"use client";
import { Collapsible } from "@ark-ui/react/collapsible";
import { disclosure } from "styled-system/recipes";
import { createSlotRecipeContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createSlotRecipeContext(disclosure);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withProvider(Collapsible.RootProvider, "root");

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(Collapsible.Root, "root");

export type SummaryProps = ComponentProps<typeof Summary>;
export const Summary = withContext(Collapsible.Trigger, "trigger", {
  defaultProps: { className: "group" },
});

const DefaultIndicator = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={true}
  >
    <path d="M12 15.525L16.925 10.625H7.07502L12 15.525Z" />
  </svg>
);

export type IndicatorProps = ComponentProps<typeof Indicator>;
export const Indicator = withContext(Collapsible.Indicator, "indicator", {
  defaultProps: { children: DefaultIndicator },
});

export type ContentProps = ComponentProps<typeof Content>;
export const Content = withContext(Collapsible.Content, "content");

export { CollapsibleContext as Context } from "@ark-ui/react/collapsible";

export type { CollapsibleOpenChangeDetails as OpenChangeDetails } from "@ark-ui/react/collapsible";
