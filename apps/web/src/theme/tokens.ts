import { defineTokens } from "@pandacss/dev";

export const tokens = defineTokens({
  sizes: {
    "mobile-header-height": { value: "3.5rem" },
  },
  zIndex: {
    /**
     * reference:
     * https://chakra-ui.com/docs/theming/z-index
     */
    docked: { value: 10 },
    dropdown: { value: 1000 },
    sticky: { value: 1100 },
    banner: { value: 1200 },
    overlay: { value: 1300 },
    modal: { value: 1400 },
    popover: { value: 1500 },
    skipNav: { value: 1600 },
    toast: { value: 1700 },
    tooltip: { value: 1800 },
  },
});
