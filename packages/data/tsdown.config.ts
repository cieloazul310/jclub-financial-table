import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/top-index.ts", "src/for-each-club/index.ts"],
  format: {
    esm: {
      target: ["esnext"],
      outDir: "./scripts/templates/esm",
    },
    cjs: {
      target: ["node22"],
      outDir: "./scripts/templates/cjs",
    },
  },
  clean: true,
  shims: true,
  dts: true,
});
