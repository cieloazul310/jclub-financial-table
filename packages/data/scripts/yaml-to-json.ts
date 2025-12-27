// scripts/yaml-to-json.ts
import * as fs from "fs/promises";
import * as path from "path";
import { parse } from "yaml";
import { getAllClubs } from "@cieloazul310/jclub-financial-utils";
import { checkData } from "./check-data";

const __dirname = import.meta.dirname;

const srcDir = path.resolve(__dirname, "../dataset");
const outDir = path.resolve(__dirname, "../dist");
const templatePath = path.resolve(__dirname, "./templates");

await fs.mkdir(outDir, { recursive: true });

function indexReplacer(years: number[]) {
  return (str: string) => str.replaceAll(`[2020]`, `${JSON.stringify(years)}`);
}

async function processDataset() {
  const ids = await fs.readdir(srcDir, { withFileTypes: true });
  for (const idEnt of ids) {
    if (!idEnt.isDirectory()) continue;
    const id = idEnt.name;
    const srcIdDir = path.join(srcDir, id);
    const distIdDir = path.join(outDir, id);
    await fs.mkdir(distIdDir, { recursive: true });

    const entries = await fs.readdir(srcIdDir, { withFileTypes: true });
    const years: number[] = [];

    for (const ent of entries) {
      if (!ent.isFile()) continue;
      if (!/\.(ya?ml)$/i.test(ent.name)) continue;
      const p = path.join(srcIdDir, ent.name);
      const contents = await fs.readFile(p, "utf8");
      const parsed = parse(contents) as any;

      const out = checkData(parsed);
      // 年をファイル名またはデータから決める
      const yearFromName = Number(
        path.basename(ent.name, path.extname(ent.name)),
      );
      const year = Number.isFinite(yearFromName)
        ? yearFromName
        : out.year
          ? Number(out.year)
          : NaN;
      const fileName = Number.isFinite(year)
        ? `${year}.json`
        : `${path.basename(ent.name, path.extname(ent.name))}.json`;
      if (Number.isFinite(year)) years.push(year);

      const jsonPath = path.join(distIdDir, fileName);
      await fs.writeFile(jsonPath, JSON.stringify(out, null, 2), "utf8");
      console.log(`wrote ${path.relative(process.cwd(), jsonPath)}`);
    }

    // sort years descending (newest first)
    years.sort((a, b) => b - a);
    const replacer = indexReplacer(years);
    const mjs = await fs.readFile(
      path.resolve(templatePath, "esm/for-each-club/index.mjs"),
      "utf8",
    );
    const cjs = await fs.readFile(
      path.resolve(templatePath, "cjs/for-each-club/index.cjs"),
      "utf8",
    );
    const dts = await fs.readFile(
      path.resolve(templatePath, "esm/for-each-club/index.d.mts"),
      "utf8",
    );

    // テンプレート関数で生成
    await fs.writeFile(
      path.join(distIdDir, "index.mjs"),
      replacer(mjs),
      "utf8",
    );
    await fs.writeFile(
      path.join(distIdDir, "index.cjs"),
      replacer(cjs),
      "utf8",
    );
    await fs.writeFile(
      path.join(distIdDir, "index.d.ts"),
      replacer(dts),
      "utf8",
    );
  }
}

try {
  await processDataset();
  console.log("All datasets processed.");
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}

function topLevelIndexReplacer(clubs: string[]) {
  return (str: string) =>
    str.replaceAll(`["club-name-collection"]`, `${JSON.stringify(clubs)}`);
}

// Generate top-level index files (sync APIs) after processing
async function generateTopLevelIndex() {
  const dist = path.resolve("./dist");

  const clubs = getAllClubs().map(({ slug }) => slug);

  const mjs = await fs.readFile(
    path.resolve(templatePath, "esm/top-index.mjs"),
    "utf8",
  );
  const cjs = await fs.readFile(
    path.resolve(templatePath, "cjs/top-index.cjs"),
    "utf8",
  );
  const dts = await fs.readFile(
    path.resolve(templatePath, "esm/top-index.d.mts"),
    "utf8",
  );
  const replacer = topLevelIndexReplacer(clubs);

  await fs.writeFile(path.join(dist, "index.mjs"), replacer(mjs), "utf8");
  await fs.writeFile(path.join(dist, "index.cjs"), replacer(cjs), "utf8");
  await fs.writeFile(path.join(dist, "index.d.ts"), dts, "utf8");

  // Copy any esm shims from templates/esm matching esm-shims-*.mjs into dist
  try {
    const esmTemplateDir = path.resolve(templatePath, "esm");
    const files = await fs.readdir(esmTemplateDir);
    const shimFiles = files.filter((f) => /^esm-shims-.*\.mjs$/i.test(f));
    for (const f of shimFiles) {
      const src = path.join(esmTemplateDir, f);
      const dest = path.join(dist, f);
      // use fs.copyFile from fs/promises
      await fs.copyFile(src, dest);
      console.log(
        `copied ${path.relative(process.cwd(), src)} -> ${path.relative(process.cwd(), dest)}`,
      );
    }
  } catch (e) {
    console.warn("no esm shims copied:", e);
  }

  console.log("wrote top-level index files");
}

// run generator
try {
  await generateTopLevelIndex();
} catch (e) {
  console.error("failed to generate top-level index", e);
}
