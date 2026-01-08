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
      containerNames: ["article-content", "article-sidebar"],
      containerSizes: {
        xs: "320px",
        sm: "384px",
        md: "448px",
        lg: "512px",
        xl: "576px",
        "2xl": "672px",
        "3xl": "768px",
        "4xl": "896px",
        "5xl": "1024px",
        "6xl": "1152px",
        "7xl": "1280px",
        "8xl": "1440px",
      },
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
