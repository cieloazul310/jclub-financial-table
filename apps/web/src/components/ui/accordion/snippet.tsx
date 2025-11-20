// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.1.3 (commit: bfe7626d9eda231b7d1d4abd98d482444e982347)
/**
 * reference:
 * https://github.com/cschroeter/park-ui/blob/main/components/react/src/components/ui/styled/accordion.tsx
 */
"use client";
import { Accordion } from "@ark-ui/react/accordion";
import { accordion } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";
import type { ComponentProps } from "styled-system/types";

const { withProvider, withContext } = createStyleContext(accordion);

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withProvider(Accordion.RootProvider, "root");

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider(Accordion.Root, "root");

export const ItemContent = withContext(Accordion.ItemContent, "itemContent");

export const DefaultIndicator = (
  <svg
    aria-hidden={true}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <g>
      <path
        d="M16.668 5.5L10.0013 12.1667L3.33464 5.5L2.16797 6.66667L10.0013 14.5L17.8346 6.66667L16.668 5.5Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export const ItemIndicator = withContext(
  Accordion.ItemIndicator,
  "itemIndicator",
  { defaultProps: { children: DefaultIndicator } },
);

export const Item = withContext(Accordion.Item, "item");

export const ItemTrigger = withContext(Accordion.ItemTrigger, "itemTrigger", {
  defaultProps: { className: "group" },
});

export {
  AccordionContext as Context,
  AccordionItemContext as ItemContext,
} from "@ark-ui/react/accordion";

export type {
  AccordionFocusChangeDetails as FocusChangeDetails,
  AccordionValueChangeDetails as ValueChangeDetails,
} from "@ark-ui/react/accordion";
