// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.6.2 (commit: 28e00dd4b6f1071a2ce90bff052f51433ea1fe48)
import { ark } from "@ark-ui/react/factory";
import { styled } from "styled-system/jsx";
import {
  hamburgerMenuButton,
  type HamburgerMenuButtonVariantProps,
} from "styled-system/recipes";
import type { HTMLStyledProps } from "styled-system/jsx";

export interface HamburgerMenuButtonProps
  extends HamburgerMenuButtonVariantProps, HTMLStyledProps<"button"> {}

export const HamburgerMenuButton = styled(ark.button, hamburgerMenuButton);

export * from "./close-icon";
export * from "./close-with-label-icon";
export * from "./hamburger-icon";
export * from "./hamburger-with-label-icon";
