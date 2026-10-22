// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.6.2 (commit: 28e00dd4b6f1071a2ce90bff052f51433ea1fe48)
/**
 * source:
 * https://github.com/cschroeter/park-ui/blob/main/components/react/src/components/ui/styled/tabs.tsx
 */
"use client";
import { Tabs } from "@ark-ui/react/tabs";
import { tabs } from "styled-system/recipes";
import { createSlotRecipeContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createSlotRecipeContext(tabs);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withProvider(Tabs.RootProvider, "root");

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(Tabs.Root, "root");

export const Content = withContext(Tabs.Content, "content");

export const Indicator = withContext(Tabs.Indicator, "indicator");

export const List = withContext(Tabs.List, "list");

export const Trigger = withContext(Tabs.Trigger, "trigger");

export { TabsContext as Context } from "@ark-ui/react/tabs";

export type {
  TabsFocusChangeDetails as FocusChangeDetails,
  TabsValueChangeDetails as ValueChangeDetails,
} from "@ark-ui/react/tabs";
