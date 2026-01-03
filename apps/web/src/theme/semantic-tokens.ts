import { defineSemanticTokens } from "@pandacss/dev";

export const semanticTokens = defineSemanticTokens({
  fonts: {
    table: { value: ["Helvetica", "Arial", "{fonts.body}"] },
  },
  sizes: {
    "common-main-width": {
      value: {
        base: "{sizes.3xl}",
        lg: "{sizes.4xl}",
        xl: "{sizes.5xl}",
        "2xl": "{sizes.6xl}",
      },
    },
    "sidebar-width": {
      value: "{sizes.72}",
    },
  },
});
