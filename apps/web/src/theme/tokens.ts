import { defineTokens } from "@pandacss/dev";

export const tokens = defineTokens({
  sizes: {
    "mobile-header-height": { value: "3.5rem" },
  },
  zIndex: {
    toast: { value: 1700 },
    tooltip: { value: 1800 },
  },
});
