// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.6.2 (commit: 28e00dd4b6f1071a2ce90bff052f51433ea1fe48)
/**
 * source:
 * https://github.com/cschroeter/park-ui/blob/main/components/react/src/components/ui/styled/checkbox.tsx
 */
"use client";
import { Checkbox } from "@ark-ui/react/checkbox";
import { checkbox } from "styled-system/recipes";
import { createSlotRecipeContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withRootProvider, withProvider, withContext } =
  createSlotRecipeContext(checkbox);

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

export type { CheckboxCheckedChangeDetails as CheckedChangeDetails } from "@ark-ui/react/checkbox";
