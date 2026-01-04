// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.2.1 (commit: f4833b6c4447a8e5eeac4e4c8491960122be65be)
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
