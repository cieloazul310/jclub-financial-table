import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/*", "src/types/*"],
  format: {
    esm: {
      target: ["esnext"],
    },
    cjs: {
      target: ["node22"],
    },
  },
  clean: true,
  dts: true,
});
