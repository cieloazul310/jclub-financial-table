import { readFile, writeFile, mkdir } from "fs/promises";
import { resolve, join } from "path";
import { parse } from "yaml";

export async function buildClubs() {
  const __dirname = import.meta.dirname;
  const outDir = resolve(__dirname, "../src/data");
  await mkdir(outDir, { recursive: true });
  
  const file = await readFile(resolve(__dirname, "../clubs.yml"), "utf8");
  const parsed = parse(file);

  await writeFile(
    join(outDir, "clubs.json"),
    JSON.stringify(parsed, null, 2),
    "utf8",
  );
}
