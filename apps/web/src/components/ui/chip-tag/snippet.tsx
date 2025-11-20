// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.1.3 (commit: bfe7626d9eda231b7d1d4abd98d482444e982347)
"use client";
import { ark } from "@ark-ui/react/factory";
import { chipTag } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createStyleContext(chipTag);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(ark.div, "root", {
  defaultProps: { className: "group" },
});

export const Icon = withContext(ark.span, "icon");

export const Label = withContext(ark.span, "label");

export const RemoveButton = withContext(ark.span, "removeButton", {
  defaultProps: { "aria-label": "取り除く", role: "button" },
});

export const AddButton = withContext(ark.span, "addButton", {
  defaultProps: { "aria-label": "追加する", role: "button" },
});
