// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.2.1 (commit: f4833b6c4447a8e5eeac4e4c8491960122be65be)
"use client";
import { RadioGroup } from "@ark-ui/react/radio-group";
import { radioGroup } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createStyleContext(radioGroup);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withProvider(RadioGroup.RootProvider, "root");

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(RadioGroup.Root, "root");

export const Indicator = withContext(RadioGroup.Indicator, "indicator");

export const ItemControl = withContext(RadioGroup.ItemControl, "itemControl");

export const Item = withContext(RadioGroup.Item, "item");

export const ItemText = withContext(RadioGroup.ItemText, "itemText");

export const Label = withContext(RadioGroup.Label, "label");

export {
  RadioGroupContext as Context,
  RadioGroupItemHiddenInput as ItemHiddenInput,
} from "@ark-ui/react/radio-group";

export type { RadioGroupValueChangeDetails as ValueChangeDetails } from "@ark-ui/react/radio-group";
