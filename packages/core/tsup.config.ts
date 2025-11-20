import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src"],
  format: ["esm", "cjs"],
  outDir: "dist",
  splitting: false,
  external: [
    "@cieloazul310/jclub-financial-data",
    "@cieloazul310/jclub-financial-utils",
  ],
  dts: true,
  clean: true,
});
