// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.1.3 (commit: bfe7626d9eda231b7d1d4abd98d482444e982347)
"use client";
import { ark } from "@ark-ui/react/factory";
import { card } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createStyleContext(card);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(ark.div, "root", {
  defaultProps: { className: "group" },
});

export const Main = withContext(ark.div, "main");

export const Image = withContext(ark.div, "image");

export const Sub = withContext(ark.div, "sub");

export const Title = withContext(ark.h2, "title");
