// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.2.1 (commit: f4833b6c4447a8e5eeac4e4c8491960122be65be)
/**
 * Reference:
 * https://github.com/cschroeter/park-ui/blob/main/components/react/src/components/ui/styled/alert.tsx
 */
"use client";
import { ark } from "@ark-ui/react/factory";
import { resourceList } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createStyleContext(resourceList);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(ark.div, "root");

export const Main = withContext(ark.div, "main", {
  defaultProps: { className: "group" },
});

export const Action = withContext(ark.div, "action");

export const Content = withContext(ark.div, "content");

export const Title = withContext(ark.h2, "title");
