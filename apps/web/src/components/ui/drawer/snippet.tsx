// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.1.3 (commit: bfe7626d9eda231b7d1d4abd98d482444e982347)
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

export {
  DialogContext as Context,
  type DialogContextProps as ContextProps,
} from "@ark-ui/react/dialog";
