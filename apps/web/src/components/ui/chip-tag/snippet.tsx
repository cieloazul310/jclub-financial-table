// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.6.2 (commit: 28e00dd4b6f1071a2ce90bff052f51433ea1fe48)
"use client";
import { ark } from "@ark-ui/react/factory";
import { chipTag } from "styled-system/recipes";
import { createSlotRecipeContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createSlotRecipeContext(chipTag);

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
