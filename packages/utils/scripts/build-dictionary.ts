import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { parse } from "yaml";

async function buildDictonary() {
  const __dirname = import.meta.dirname;
  const file = await readFile(resolve(__dirname, "../dictionary.yml"), "utf8");
  const parsed = parse(file);

  const hoge = `
  import type { FinancialDatum } from "./types";

  export const dictionary: Record<keyof Omit<FinancialDatum, "slug">, string> = ${JSON.stringify(parsed, null, 2)};
  `
  
  await writeFile(resolve(__dirname, "../src/dictionary.ts"), hoge);
}

try {
  await buildDictonary();
  console.log("Build dictionary");
} catch (e) {
  console.error(e);
}
