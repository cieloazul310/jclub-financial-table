import { defineConfig } from "eslint/config";
import { config as nextJsConfig } from "@repo/eslint-config/next-js";

export default defineConfig(...nextJsConfig);
