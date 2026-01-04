// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.2.1 (commit: f4833b6c4447a8e5eeac4e4c8491960122be65be)
/**
 * Reference:
 * https://github.com/cschroeter/park-ui/blob/main/components/react/src/components/ui/styled/alert.tsx
 */
"use client";
import { ark } from "@ark-ui/react/factory";
import { notificationBanner } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createStyleContext(notificationBanner);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(ark.div, "root");

export const Body = withContext(ark.div, "body");

export const Header = withContext(ark.div, "header");

export const Heading = withContext(ark.h2, "heading");

export const Icon = withContext(ark.div, "icon");

export const Close = withContext(ark.button, "close");

export const Actions = withContext(ark.div, "actions");
