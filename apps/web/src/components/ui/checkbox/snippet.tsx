// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.1.3 (commit: bfe7626d9eda231b7d1d4abd98d482444e982347)
/**
 * source:
 * https://github.com/cschroeter/park-ui/blob/main/components/react/src/components/ui/styled/checkbox.tsx
 */
"use client";
import { Checkbox } from "@ark-ui/react/checkbox";
import { checkbox } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withRootProvider, withProvider, withContext } =
  createStyleContext(checkbox);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withProvider(Checkbox.RootProvider, "root");

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(Checkbox.Root, "root", {
  defaultProps: { className: "group" },
});

export const Control = withContext(Checkbox.Control, "control");

export const Group = withProvider(Checkbox.Group, "group");

export const GroupProvider = withRootProvider(Checkbox.GroupProvider);

export const Indicator = withContext(Checkbox.Indicator, "indicator");

export const Label = withContext(Checkbox.Label, "label");

export {
  CheckboxContext as Context,
  CheckboxHiddenInput as HiddenInput,
} from "@ark-ui/react/checkbox";
