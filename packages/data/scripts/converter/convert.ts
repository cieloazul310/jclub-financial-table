import { readFile, writeFile, mkdir, access } from "fs/promises";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";
import * as yaml from "yaml";
import { parse } from "csv-parse/sync";
import type {
  ClubInfo,
  FinancialDatum,
} from "@cieloazul310/jclub-financial-utils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function converter({
  filepath,
  outDir = resolve(__dirname, "../../data"),
}: {
  filepath: string;
  outDir?: string;
}) {
  if (!filepath) {
    console.error("Please provide the path to the CSV file.");
    process.exit(1);
  }

  const clubs: ClubInfo[] = yaml.parse(
    await readFile(resolve(__dirname, "../../../utils/clubs.yml"), "utf8"),
  );
  const dict: {
    [K in keyof Omit<FinancialDatum, "clubId">]: {
      label_ja: string;
      available_from?: number | null;
      available_to?: number | null;
    };
  } = yaml.parse(
    await readFile(resolve(__dirname, "../../../utils/dictionary.yml"), "utf8"),
  );
  const dictList = Object.entries(dict).map(
    ([key, { label_ja }]) => [key, label_ja] as const,
  );

  const stringFileds = ["name", "fullname", "clubId", "category", "license"];
  const csvSource = await readFile(filepath, "utf8");

  const data: Record<string, string>[] = parse(csvSource, {
    columns: true,
    skipEmptyLines: true,
  });

  const formattedData = data
    .map((row) => {
      const currentClub = clubs.find(({ id }) => id === row.id);
      if (!currentClub) return null;

      const obj: Record<string, string | number> = {
        slug: currentClub.id,
        name: currentClub.short_name,
      };
      dictList.forEach(([key, label]) => {
        if (typeof row?.[label] !== "string") return;
        if (row[label] === "Null") return;

        if (stringFileds.includes(key)) {
          obj[key] = row[label];
        } else {
          obj[key] = parseFloat(row[label] ?? "0");
        }
      });
      obj.id = `${currentClub.id}${obj.year}`;
      obj.fullname = currentClub.name;

      return obj;
    })
    .filter(
      (datum): datum is Record<string, string | number> =>
        typeof datum === "object",
    );

  await Promise.all(
    formattedData.filter(Boolean).map(async (datum) => {
      const { slug, year } = datum;
      const dirPath = join(outDir, slug as string);
      try {
        await access(dirPath);
      } catch {
        await mkdir(dirPath, { recursive: true });
      }

      await writeFile(join(dirPath, `${year}.yml`), yaml.stringify(datum));
    }),
  );
}
