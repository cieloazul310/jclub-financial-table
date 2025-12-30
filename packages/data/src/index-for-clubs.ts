import { readFile } from "fs/promises";
import { resolve } from "path";
import { extendClubData } from "@cieloazul310/jclub-financial-utils";
import type {
  FinancialDatum,
  ExtendedFinancialDatum,
} from "@cieloazul310/jclub-financial-utils/types";

export async function getData(
  from: number = -Infinity,
  to: number = Infinity,
): Promise<FinancialDatum[]> {
  const years: number[] = [2020];
  const selected = years.filter((year) => year >= from && year <= to);

  const imports = selected.map(async (year) => {
    try {
      const raw = await readFile(resolve(__dirname, `${year}.json`), "utf8");
      return JSON.parse(raw) as FinancialDatum;
    } catch (err) {
      // If the file doesn't exist, skip this year; rethrow other errors
      const e = err as NodeJS.ErrnoException;
      if (e && e.code === "ENOENT") return null;
      throw err;
    }
  });

  const results = await Promise.all(imports);
  return results.filter((r): r is FinancialDatum => r !== null);
}

export const years: number[] = [2020];

export async function getExtendedData(
  from: number = -Infinity,
  to: number = Infinity,
): Promise<ExtendedFinancialDatum[]> {
  const data = await getData();
  const extendedData = extendClubData(data);
  return extendedData.filter(
    ({ year }) => year.value >= from && year.value <= to,
  );
}

export default getData;
