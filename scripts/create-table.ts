import { readFile, writeFile } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { parse } from "yaml";
import type { ClubInfo } from "../packages/utils/src/types";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export async function createClubTable() {
  const file = await readFile(
    resolve(__dirname, "../packages/utils/clubs.yml"),
    "utf8",
  );
  const allClubs = parse(file) as ClubInfo[];

  const tableHeader =
    "| 略称 | 呼称 | clubId |\n| ------ | --------- | -------- |";

  const tableRows = allClubs
    .map(({ id, name, short_name }) => {
      return `| ${short_name} | ${name} | ${id} |`;
    })
    .join("\n");

  return [tableHeader, tableRows].join("\n");
}

export async function createDictionaryTable() {
  const file = await readFile(
    resolve(__dirname, "../packages/utils/dictionary.yml"),
    "utf8",
  );
  const dictionary = parse(file) as Record<
    string,
    { label_ja: string; available_from?: number; available_to?: number }
  >;

  const tableHeader = "| 日本語ラベル | key |\n| ------ | --------- |";

  const tableRows = Object.entries(dictionary)
    .map(([key, { label_ja }]) => {
      return `| ${label_ja} | ${key} |`;
    })
    .join("\n");

  return [tableHeader, tableRows].join("\n");
}

export async function insertToDocs(
  docsPath: string,
  insertString: string,
  name: string,
) {
  const readme = await readFile(docsPath, "utf8");
  const isMdx = /.mdx$/.test(docsPath);
  let updated: string;

  if (isMdx) {
    const regex = new RegExp(
      `\\{\\/\\* @${name}-start \\*\\/\\}([\\s\\S]*?)\\{\\/\\* @${name}-end \\*\\/\\}`,
    );
    updated = readme.replace(
      regex,
      `\\{\\/\\* @${name}-start \\*\\/\\}\n${insertString}\n\\{\\/\\* @${name}-end \\*\\/\\}`,
    );
  } else {
    const regex = new RegExp(
      `<!-- @${name}-start -->([\\s\\S]*?)<!-- @${name}-end -->`,
    );
    updated = readme.replace(
      regex,
      `<!-- @${name}-start -->\n${insertString}\n<!-- @${name}-end -->`,
    );
  }

  await writeFile(docsPath, updated);
  console.log("README.md updated!");
}
