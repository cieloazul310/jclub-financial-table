// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.2.1 (commit: f4833b6c4447a8e5eeac4e4c8491960122be65be)
"use client";
import { ark } from "@ark-ui/react/factory";
import { Steps } from "@ark-ui/react/steps";
import { stepNavigation } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withRootProvider, withProvider, withContext } =
  createStyleContext(stepNavigation);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withRootProvider(Steps.RootProvider);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(Steps.Root, "root");

export const List = withContext(Steps.List, "list");

export const Item = withContext(Steps.Item, "item");

export const Trigger = withContext(Steps.Trigger, "trigger");

export const Indicator = withContext(Steps.Indicator, "indicator");

export const Separator = withContext(Steps.Separator, "separator");

export const Title = withContext(ark.span, "title");

export const Description = withContext(ark.p, "description");

export { StepsContext as Context } from "@ark-ui/react/steps";

export type { StepChangeDetails as ChangeDetails } from "@ark-ui/react/steps";
