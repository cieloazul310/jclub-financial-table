import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/**"],
  format: {
    esm: {
      target: ["esnext"],
    },
    cjs: {
      target: ["node22"],
    },
  },
  outDir: "dist",
  dts: true,
  clean: true,
});
