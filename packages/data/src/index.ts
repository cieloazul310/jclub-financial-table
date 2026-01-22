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

export const clubIds = getAllClubs().map(({ id }) => id);

/**
 * 指定されたクラブIDのデータを取得する
 * @param clubId クラブID
 * @returns `Promise<FinancialDatum[]>` 指定されたクラブIDのデータの配列
 */
export async function getDataByClub(clubId: string): Promise<FinancialDatum[]> {
  const dir = join(base, clubId);
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
  clubId: string,
): Promise<ExtendedFinancialDatum[]> {
  const data = await getDataByClub(clubId);
  return extendClubData(data);
}

/**
 * 年度を指定してデータを取得する
 * @param year 年度
 * @returns `Promise<FinancialDatum[]>` 指定された年度のデータの配列
 */
export async function getDataByYear(year: number): Promise<FinancialDatum[]> {
  const output = [];
  for (const clubId of clubIds) {
    const pathname = join(base, clubId, String(year) + ".json");
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

/**
 * 年度とクラブを指定してデータを取得する
 * @param clubId クラブID
 * @param year 年度
 * @returns `Promise<FinancialDatum | null>` 指定された年度範囲のデータ
 */
export async function getDatum(
  clubId: string,
  year: number,
): Promise<FinancialDatum | null> {
  const pathname = join(base, clubId, String(year) + ".json");
  return await loadJsonSync(pathname);
}
