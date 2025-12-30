import { readFile, readdir } from "fs/promises";
import { resolve, join } from "path";
import {
  getAllClubs,
  extendClubData,
  extendYearData,
} from "@cieloazul310/jclub-financial-utils";
import type {
  FinancialDatum,
  ExtendedFinancialDatum,
} from "@cieloazul310/jclub-financial-utils/types";

const base = resolve(__dirname);

async function loadJsonSync(file: string): Promise<FinancialDatum | null> {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (err) {
    return null;
  }
}

export const clubs = getAllClubs().map(({ slug }) => slug);

export async function getDataByClub(club: string): Promise<FinancialDatum[]> {
  const dir = join(base, club);
  try {
    const files = (await readdir(dir)).filter((filename) =>
      filename.endsWith(".json"),
    );
    const data = files.map(
      async (filename) => await loadJsonSync(join(dir, filename)),
    );
    return (await Promise.all(data)).filter((json): json is FinancialDatum =>
      Boolean(json),
    );
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getExtendedDataByClub(
  club: string,
): Promise<ExtendedFinancialDatum[]> {
  const data = await getDataByClub(club);
  return extendClubData(data);
}

export async function getDataByYear(year: number): Promise<FinancialDatum[]> {
  const output = [];
  for (const club of clubs) {
    const pathname = join(base, club, String(year) + ".json");
    const item = await loadJsonSync(pathname);
    if (item) output.push(item);
  }
  return output;
}

export async function getExtendedDataByYear(
  year: number,
): Promise<ExtendedFinancialDatum[]> {
  const data = await getDataByYear(year);
  const prevData = await getDataByYear(year - 1);

  return extendYearData(data, prevData);
}

export async function getDatum(
  club: string,
  year: number,
): Promise<FinancialDatum | null> {
  const pathname = join(base, club, String(year) + ".json");
  return await loadJsonSync(pathname);
}
