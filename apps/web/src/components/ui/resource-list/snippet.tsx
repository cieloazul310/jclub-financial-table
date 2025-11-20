// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.1.3 (commit: bfe7626d9eda231b7d1d4abd98d482444e982347)
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
