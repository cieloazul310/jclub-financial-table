// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.1.3 (commit: bfe7626d9eda231b7d1d4abd98d482444e982347)
import { ark } from "@ark-ui/react/factory";
import { styled } from "styled-system/jsx";
import {
  digitalGoDivider,
  type DigitalGoDividerVariantProps,
} from "styled-system/recipes";
import type { HTMLStyledProps } from "styled-system/jsx";

export interface DividerProps
  extends DigitalGoDividerVariantProps,
    Omit<HTMLStyledProps<"hr">, "color"> {}

export const Divider = styled(ark.hr, digitalGoDivider);
