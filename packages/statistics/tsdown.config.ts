import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/type.ts"],
  format: {
    esm: {
      target: ["esnext"],
    },
    cjs: {
      target: ["node22"],
    },
  },
  outDir: "./dist",
  shims: true,
  dts: true,
  clean: true,
});
