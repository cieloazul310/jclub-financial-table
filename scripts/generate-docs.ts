import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";
import jsdocToMd from "jsdoc-to-markdown";

import {
  createClubTable,
  createDictionaryTable,
  insertToDocs,
} from "./create-table";

export const __dirname = dirname(fileURLToPath(import.meta.url));

type GenerateApiDocsOptions = Partial<
  Omit<jsdocToMd.JsdocOptions, "files" | "configure"> & jsdocToMd.RenderOptions
>;

async function generateApiDocs(
  basePath: string,
  files: string[],
  options: GenerateApiDocsOptions = {},
) {
  const defaultProps = {
    "heading-depth": 3,
  } satisfies GenerateApiDocsOptions;
  const opt = { ...defaultProps, ...options };
  const { ...rest } = opt;
  const docs = await jsdocToMd.render({
    files: files.map((filename) => join(basePath, filename)),
    configure: resolve(__dirname, "./jsdoc2md.json"),
    ...rest,
  });
  return docs;
}

async function main() {
  const packages = resolve(__dirname, "../packages");

  // ユーティリティパッケージのAPIドキュメントを生成
  const utilsDocs = await generateApiDocs(
    join(packages, "utils"),
    ["src/clubs.ts", "src/dictionary.ts", "src/years.ts"],
    {
      "heading-depth": 4,
    },
  );

  // コアパッケージのREADMEにAPIドキュメントを挿入
  await insertToDocs(
    resolve(__dirname, "../packages/core/README.md"),
    utilsDocs,
    "api-docs",
  );
  // ユーティリティパッケージのREADMEにAPIドキュメントを挿入
  await insertToDocs(
    resolve(__dirname, "../packages/utils/README.md"),
    utilsDocs,
    "api-docs",
  );

  // データパッケージのAPIドキュメントを生成
  const dataDocs = await generateApiDocs(
    join(packages, "data"),
    ["src/index.ts"],
    {
      "heading-depth": 4,
    },
  );

  // コアパッケージのREADMEにAPIドキュメントを挿入
  await insertToDocs(
    resolve(__dirname, "../packages/core/README.md"),
    dataDocs,
    "api-docs-index",
  );

  // データパッケージのREADMEにAPIドキュメントを挿入
  await insertToDocs(
    resolve(__dirname, "../packages/data/README.md"),
    dataDocs,
    "api-docs-index",
  );

  // データパッケージのクラブ向けAPIドキュメントを生成
  const dataForClubsDocs = await generateApiDocs(
    join(packages, "data"),
    ["src/index-for-clubs.ts"],
    {
      "heading-depth": 4,
    },
  );
  await insertToDocs(
    resolve(__dirname, "../packages/data/README.md"),
    dataForClubsDocs,
    "api-docs-for-clubs",
  );

  const clubTable = await createClubTable();
  const dictionaryTable = await createDictionaryTable();

  // ユーティリティパッケージのREADMEにテーブルを挿入
  await insertToDocs(
    resolve(__dirname, "../packages/utils/README.md"),
    clubTable,
    "club-table",
  );
  // ユーティリティパッケージのREADMEにテーブルを挿入
  await insertToDocs(
    resolve(__dirname, "../packages/utils/README.md"),
    dictionaryTable,
    "dictionary-table",
  );

  // コアパッケージのREADMEにテーブルを挿入
  await insertToDocs(
    resolve(__dirname, "../packages/core/README.md"),
    clubTable,
    "club-table",
  );
}

// ESM-safe check: run main when the script is executed directly
if (fileURLToPath(import.meta.url) === process.argv[1]) {
  (async () => {
    await main();
  })();
}
