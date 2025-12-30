// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig } from "eslint/config";
import { config as nextJsConfig } from "@repo/eslint-config/next-js";

export default defineConfig(...nextJsConfig);
