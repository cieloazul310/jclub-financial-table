// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.6.2 (commit: 28e00dd4b6f1071a2ce90bff052f51433ea1fe48)
"use client";
import { ark } from "@ark-ui/react/factory";
import { emergencyBanner } from "styled-system/recipes";
import { createSlotRecipeContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createSlotRecipeContext(emergencyBanner);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(ark.div, "root");

export const Heading = withContext(ark.h2, "heading");

export const Body = withContext(ark.div, "body");

export const Action = withContext(ark.div, "action");

export const Button = withContext(ark.button, "button");
