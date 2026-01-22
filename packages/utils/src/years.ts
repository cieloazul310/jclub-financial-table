import type { YearInfo } from "./types";
import years from "./data/years.json";

/**
 * 利用可能なすべての年度情報を取得する。ソートは年度昇順。
 * @returns YearInfo[]
 * @see {@link https://github.com/cieloazul310/jclub-financial-table/blob/main/packages/utils/years.yml years.yml}
 */
export function getAllYears() {
  const allYears = years;
  return [...allYears].sort((a, b) => a.year - b.year) as YearInfo[];
}

/**
 * 指定された年度の情報を取得する
 * @param year 年度
 * @returns YearInfo | undefined
 * @see {@link https://github.com/cieloazul310/jclub-financial-table/blob/main/packages/utils/years.yml years.yml}
 */
export function getYearInfo(year: number) {
  const allYears = getAllYears();
  return allYears.find((yearInfo) => yearInfo.year === year);
}
