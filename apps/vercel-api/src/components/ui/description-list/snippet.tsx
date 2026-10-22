// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.6.2 (commit: 28e00dd4b6f1071a2ce90bff052f51433ea1fe48)
"use client";
import { ark } from "@ark-ui/react/factory";
import { descriptionList } from "styled-system/recipes";
import { createSlotRecipeContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createSlotRecipeContext(descriptionList);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(ark.dl, "root");

export const Item = withContext(ark.div, "item");

export const Term = withContext(ark.dt, "term");

export const Marker = withContext(ark.span, "marker");

export const Description = withContext(ark.dd, "description");
