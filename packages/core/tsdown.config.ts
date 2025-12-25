import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/*.ts"],
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
