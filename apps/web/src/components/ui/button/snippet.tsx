// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.2.1 (commit: f4833b6c4447a8e5eeac4e4c8491960122be65be)
/**
 * source:
 * https://github.com/cschroeter/park-ui/blob/main/components/react/src/components/ui/styled/button.tsx
 */
import { ark } from "@ark-ui/react/factory";
import { styled } from "styled-system/jsx";
import { button, type ButtonVariantProps } from "styled-system/recipes";
import type { HTMLStyledProps } from "styled-system/types";

export interface ButtonProps
  extends ButtonVariantProps, HTMLStyledProps<"button"> {}

export const Button = styled(ark.button, button);
