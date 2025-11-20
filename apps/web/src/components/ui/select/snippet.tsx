// Generated from digital-go-design-system-with-panda@@cieloazul310/digital-go-pandacss-cli@0.1.3 (commit: bfe7626d9eda231b7d1d4abd98d482444e982347)
/**
 * reference:
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/react/src/components/select/select.tsx
 */
"use client";
import type { JSX, RefAttributes } from "react";
import { Select, type CollectionItem } from "@ark-ui/react/select";
import { select, type SelectVariantProps } from "styled-system/recipes";
import { createStyleContext } from "styled-system/jsx";

const { withProvider, withContext } = createStyleContext(select);

export type RootProviderProps<T extends CollectionItem> =
  Select.RootProviderProps<T> & SelectVariantProps;
export const RootProvider = withProvider(Select.RootProvider, "root") as {
  <T extends CollectionItem>(props: RootProviderProps<T>): JSX.Element;
};

export type RootProps<T extends CollectionItem> = Select.RootProps<T> &
  RefAttributes<HTMLDivElement> &
  SelectVariantProps;
export const Root = withProvider(Select.Root, "root") as {
  <T extends CollectionItem>(props: RootProps<T>): JSX.Element;
};

const DefaultClearIcon = (
  <svg
    aria-hidden={true}
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <g>
      <path
        d="m6.4 18.6-1-1 5.5-5.6-5.6-5.6 1.1-1 5.6 5.5 5.6-5.6 1 1.1L13 12l5.6 5.6-1 1L12 13l-5.6 5.6Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export const ClearTrigger = withContext(Select.ClearTrigger, "clearTrigger", {
  defaultProps: { children: DefaultClearIcon },
});

export const Content = withContext(Select.Content, "content");

export const Control = withContext(Select.Control, "control");

const DefaultIndicator = (
  <svg
    aria-hidden={true}
    fill="none"
    height="16"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      d="M13.3344 4.40002L8.00104 9.73336L2.66771 4.40002L1.73438 5.33336L8.00104 11.6L14.2677 5.33336L13.3344 4.40002Z"
      fill="currentColor"
    />
  </svg>
);

export const Indicator = withContext(Select.Indicator, "indicator", {
  defaultProps: { children: DefaultIndicator },
});

export const ItemGroupLabel = withContext(
  Select.ItemGroupLabel,
  "itemGroupLabel",
);

export const ItemGroup = withContext(Select.ItemGroup, "itemGroup");

export const ItemIndicator = withContext(Select.ItemIndicator, "itemIndicator");

export const Item = withContext(Select.Item, "item");

export const ItemText = withContext(Select.ItemText, "itemText");

export const Label = withContext(Select.Label, "label");

export const List = withContext(Select.List, "list");

export const Positioner = withContext(Select.Positioner, "positioner");

export const Trigger = withContext(Select.Trigger, "trigger");

export const ValueText = withContext(Select.ValueText, "valueText");

export {
  SelectContext as Context,
  SelectHiddenSelect as HiddenSelect,
} from "@ark-ui/react/select";
