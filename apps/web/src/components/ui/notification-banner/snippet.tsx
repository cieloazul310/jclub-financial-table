// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.1.3 (commit: bfe7626d9eda231b7d1d4abd98d482444e982347)
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
