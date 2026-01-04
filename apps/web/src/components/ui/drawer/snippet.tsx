// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.2.1 (commit: f4833b6c4447a8e5eeac4e4c8491960122be65be)
/**
 * source:
 * https://github.com/cschroeter/park-ui/blob/main/components/react/src/components/ui/styled/drawer.tsx
 */
"use client";
import { Dialog } from "@ark-ui/react/dialog";
import { ark } from "@ark-ui/react/factory";
import { drawer } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withRootProvider, withContext } = createStyleContext(drawer);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withRootProvider(Dialog.RootProvider);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withRootProvider(Dialog.Root);

export const Backdrop = withContext(Dialog.Backdrop, "backdrop");

export const CloseTrigger = withContext(Dialog.CloseTrigger, "closeTrigger");

export const Content = withContext(Dialog.Content, "content");

export const Description = withContext(Dialog.Description, "description");

export const Positioner = withContext(Dialog.Positioner, "positioner");

export const Title = withContext(Dialog.Title, "title");

export const Trigger = withContext(Dialog.Trigger, "trigger");

export const Header = withContext(ark.div, "header");

export const Body = withContext(ark.div, "body");

export const Footer = withContext(ark.div, "footer");

export { DialogContext as Context } from "@ark-ui/react/dialog";

export type {
  DialogContextProps as ContextProps,
  DialogOpenChangeDetails as OpenChangeDetails,
} from "@ark-ui/react/dialog";
