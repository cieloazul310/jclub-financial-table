import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index-for-clubs.ts"],
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
  sourcemap: false,
  shims: true,
  dts: true,
});
