// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.2.0 (commit: c8809a4c14c2008b2e0301bac7e5bf6f9df8f80f)
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
