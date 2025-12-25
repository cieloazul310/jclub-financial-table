// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.2.0 (commit: c8809a4c14c2008b2e0301bac7e5bf6f9df8f80f)
import { ark } from "@ark-ui/react/factory";
import { styled } from "styled-system/jsx";
import { chipLabel, type ChipLabelVariantProps } from "styled-system/recipes";
import type { HTMLStyledProps } from "styled-system/jsx";

export interface ChipLabelProps
  extends ChipLabelVariantProps,
    HTMLStyledProps<"span"> {}

export const ChipLabel = styled(ark.span, chipLabel);
