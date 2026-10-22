// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.6.2 (commit: 28e00dd4b6f1071a2ce90bff052f51433ea1fe48)
import { ark } from "@ark-ui/react/factory";
import { styled } from "styled-system/jsx";
import {
  digitalGoDivider,
  type DigitalGoDividerVariantProps,
} from "styled-system/recipes";
import type { HTMLStyledProps } from "styled-system/jsx";

export interface DividerProps
  extends DigitalGoDividerVariantProps, Omit<HTMLStyledProps<"hr">, "color"> {}

export const Divider = styled(ark.hr, digitalGoDivider);
