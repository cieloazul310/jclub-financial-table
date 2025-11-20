// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.1.3 (commit: bfe7626d9eda231b7d1d4abd98d482444e982347)
import { ark } from "@ark-ui/react/factory";
import { styled } from "styled-system/jsx";
import {
  hamburgerMenuButton,
  type HamburgerMenuButtonVariantProps,
} from "styled-system/recipes";
import type { HTMLStyledProps } from "styled-system/jsx";

export interface HamburgerMenuButtonProps
  extends HamburgerMenuButtonVariantProps,
    HTMLStyledProps<"button"> {}

export const HamburgerMenuButton = styled(ark.button, hamburgerMenuButton);

export * from "./close-icon";
export * from "./close-with-label-icon";
export * from "./hamburger-icon";
export * from "./hamburger-with-label-icon";
