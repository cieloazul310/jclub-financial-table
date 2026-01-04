// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.2.1 (commit: f4833b6c4447a8e5eeac4e4c8491960122be65be)
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
