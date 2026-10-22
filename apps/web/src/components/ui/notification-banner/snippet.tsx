// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.6.2 (commit: 28e00dd4b6f1071a2ce90bff052f51433ea1fe48)
/**
 * Reference:
 * https://github.com/cschroeter/park-ui/blob/main/components/react/src/components/ui/styled/alert.tsx
 */
"use client";
import { ark } from "@ark-ui/react/factory";
import { notificationBanner } from "styled-system/recipes";
import { createSlotRecipeContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } =
  createSlotRecipeContext(notificationBanner);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(ark.div, "root");

export const Body = withContext(ark.div, "body");

export const Header = withContext(ark.div, "header");

export const Heading = withContext(ark.h2, "heading");

export const Icon = withContext(ark.div, "icon");

export const Close = withContext(ark.button, "close");

export const Actions = withContext(ark.div, "actions");
