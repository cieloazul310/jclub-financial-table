import { readFile, writeFile } from "fs/promises";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";
import jsdocToMd from "jsdoc-to-markdown";

import {
  createClubTable,
  createDictionaryTable,
  insertToDocs,
} from "./create-table";

export const __dirname = dirname(fileURLToPath(import.meta.url));

async function generateApiDocs(basePath: string, files: string[]) {
  const docs = await jsdocToMd.render({
    files: files.map((filename) => join(basePath, filename)),
    configure: resolve(__dirname, "./jsdoc2md.json"),
    "heading-depth": 3,
  });
  await insertToDocs(join(basePath, "README.md"), docs, "api-docs");
}

async function main() {
  const packages = resolve(__dirname, "../packages");

  await generateApiDocs(join(packages, "utils"), [
    "src/clubs.ts",
    "src/dictionary.ts",
    "src/years.ts",
  ]);

  await generateApiDocs(join(packages, "data"), [
    "src/index.ts",
    "src/index-for-clubs.ts",
  ]);

  const clubTable = await createClubTable();
  const dictionaryTable = await createDictionaryTable();

  await insertToDocs(
    resolve(__dirname, "../packages/utils/README.md"),
    clubTable,
    "club-table",
  );
  await insertToDocs(
    resolve(__dirname, "../packages/utils/README.md"),
    dictionaryTable,
    "dictionary-table",
  );
}

// ESM-safe check: run main when the script is executed directly
if (fileURLToPath(import.meta.url) === process.argv[1]) {
  (async () => {
    await main();
  })();
}
