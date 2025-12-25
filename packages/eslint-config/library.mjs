import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import { config as baseConfig } from "./base.mjs";

export const config = defineConfig(
  ...baseConfig,
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  eslintConfigPrettier,
);
