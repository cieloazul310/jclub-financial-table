import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import eslintConfigPrettier from "eslint-config-prettier";
import { config as baseConfig } from "./base.mjs";

export const config = defineConfig(
  ...baseConfig,
  ...nextVitals,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "styled-system/**",
  ]),
  eslintConfigPrettier,
);
