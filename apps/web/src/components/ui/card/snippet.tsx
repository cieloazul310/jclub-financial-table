// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.6.2 (commit: 28e00dd4b6f1071a2ce90bff052f51433ea1fe48)
"use client";
import { ark } from "@ark-ui/react/factory";
import { card } from "styled-system/recipes";
import { createSlotRecipeContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createSlotRecipeContext(card);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(ark.div, "root", {
  defaultProps: { className: "group" },
});

export const Main = withContext(ark.div, "main");

export const Image = withContext(ark.div, "image");

export const Sub = withContext(ark.div, "sub");

export const Title = withContext(ark.h2, "title");
