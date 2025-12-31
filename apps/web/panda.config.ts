import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@cieloazul310/digital-go-pandacss-preset";
import { tokens } from "./src/theme/tokens";
import { semanticTokens } from "./src/theme/semantic-tokens";
import { recipes } from "./src/theme/recipes";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  presets: [createPreset()],

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens,
      recipes,
      semanticTokens,
    },
  },
  staticCss: {
    recipes: {
      "notification-banner": [
        {
          type: ["warning", "info1", "info2", "success", "error"],
        },
      ],
    },
  },

  jsxFramework: "react",

  // The output directory for your css system
  outdir: "styled-system",
});
