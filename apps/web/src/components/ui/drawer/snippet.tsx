// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.4.0 (commit: bcc735b9ff8b1fd3aaabce4f0f3263380ccc575d)
/**
 * source:
 * https://github.com/cschroeter/park-ui/blob/main/components/react/src/components/ui/styled/drawer.tsx
 */
"use client";
import { Drawer } from "@ark-ui/react/drawer";
import { ark } from "@ark-ui/react/factory";
import { drawer } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withRootProvider, withContext } = createStyleContext(drawer);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withRootProvider(Drawer.RootProvider);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withRootProvider(Drawer.Root);

export const Backdrop = withContext(Drawer.Backdrop, "backdrop");

export const CloseTrigger = withContext(Drawer.CloseTrigger, "closeTrigger");

export const Content = withContext(Drawer.Content, "content");

export const Grabber = withContext(Drawer.Grabber, "grabber");

export const GrabberIndicator = withContext(
  Drawer.GrabberIndicator,
  "grabberIndicator",
);

export const Description = withContext(Drawer.Description, "description");

export const Positioner = withContext(Drawer.Positioner, "positioner");

export const Title = withContext(Drawer.Title, "title");

export const Trigger = withContext(Drawer.Trigger, "trigger");

export const Header = withContext(ark.div, "header");

export const Body = withContext(ark.div, "body");

export const Footer = withContext(ark.div, "footer");

export { DialogContext as Context } from "@ark-ui/react/dialog";

export type {
  DialogContextProps as ContextProps,
  DialogOpenChangeDetails as OpenChangeDetails,
} from "@ark-ui/react/dialog";
