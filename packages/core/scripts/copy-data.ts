import { writeFile } from "fs/promises";
import { resolve, join } from "path";
import { getAllClubs } from "@cieloazul310/jclub-financial-utils";

async function copyData() {
  const __dirname = import.meta.dirname;
  const outDir = resolve(__dirname, "../src/data");
  const clubs = getAllClubs();

  clubs.forEach(async ({ slug }) => {
    const file = join(outDir, `${slug}.ts`);

    const data = `export * from "@cieloazul310/jclub-financial-data/${slug}";`;
    await writeFile(file, data);
  });
}

try {
  await copyData();
  console.log("Data files processed.");
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
