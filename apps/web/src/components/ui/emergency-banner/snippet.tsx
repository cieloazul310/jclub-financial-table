// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.1.3 (commit: bfe7626d9eda231b7d1d4abd98d482444e982347)
"use client";
import { ark } from "@ark-ui/react/factory";
import { emergencyBanner } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createStyleContext(emergencyBanner);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(ark.div, "root");

export const Heading = withContext(ark.h2, "heading");

export const Body = withContext(ark.div, "body");

export const Action = withContext(ark.div, "action");

export const Button = withContext(ark.button, "button");
