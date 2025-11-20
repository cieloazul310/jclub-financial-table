import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/top-index.ts"],
  format: ["esm", "cjs"],
  external: ["@cieloazul310/jclub-financial-utils"],
  outDir: "./scripts/templates-tsup",
  dts: true,
});
