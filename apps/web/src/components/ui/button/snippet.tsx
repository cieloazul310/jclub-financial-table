// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.1.3 (commit: bfe7626d9eda231b7d1d4abd98d482444e982347)
/**
 * source:
 * https://github.com/cschroeter/park-ui/blob/main/components/react/src/components/ui/styled/button.tsx
 */
import { ark } from "@ark-ui/react/factory";
import { styled } from "styled-system/jsx";
import { button, type ButtonVariantProps } from "styled-system/recipes";
import type { HTMLStyledProps } from "styled-system/types";

export interface ButtonProps
  extends ButtonVariantProps,
    HTMLStyledProps<"button"> {}

export const Button = styled(ark.button, button);
