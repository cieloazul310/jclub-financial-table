import { readFile, writeFile, mkdir, access } from "fs/promises";
import { resolve, join } from "path";

async function buildTypes() {
  const __dirname = import.meta.dirname;
  const source = await readFile(
    resolve(__dirname, "../src/types/index.ts"),
    "utf8",
  );
  const outDir = resolve(__dirname, "../dist");

  try {
    await access(outDir);
  } catch {
    mkdir(outDir);
  }
  // Simple conversion: `export * from "pkg"` -> `module.exports = require("pkg")`
  const cjsContent = source.replace(
    /export\s+\*\s+from\s+(['"])(.+?)\1\s*;?/g,
    (_m, q, pkg) => {
      return `module.exports = require(${q}${pkg}${q});`;
    },
  );

  // Write multiple variants into dist so consumers (and editors) can resolve
  await writeFile(join(outDir, "types.mjs"), source, "utf8");
  await writeFile(join(outDir, "types.cjs"), cjsContent, "utf8");
  // Emit declaration-style files so TS can pick them up for both ESM/CJS
  await writeFile(join(outDir, "types.d.mts"), source, "utf8");
  await writeFile(join(outDir, "types.d.cts"), source, "utf8");
}

try {
  await buildTypes();
  console.log("Types processed.");
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
