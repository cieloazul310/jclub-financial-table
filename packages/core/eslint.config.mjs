import { defineConfig } from "eslint/config";
import { config as libraryConfig } from "@repo/eslint-config/library";

export default defineConfig(...libraryConfig);
