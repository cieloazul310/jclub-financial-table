import { readFile, writeFile, mkdir, access } from "fs/promises";
import { resolve, join } from "path";

async function buildTypes() {
  const __dirname = import.meta.dirname;
  const source = await readFile(resolve(__dirname, "../src/types/index.ts"), "utf8");
  const outDir = resolve(__dirname, "../dist");

  try {
    await access(outDir)
  } catch {
    mkdir(outDir);
  }

  await writeFile(join(outDir, "types.mjs"), source);
  await writeFile(join(outDir, "types.cjs"), source);
  await writeFile(join(outDir, "types.d.ts"), source);
}

try {
  await buildTypes();
  console.log("Types processed.");
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
