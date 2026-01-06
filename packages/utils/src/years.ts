import type { YearInfo } from "./types";
import years from "./data/years.json";

export function getAllYears() {
  const allYears = years;
  return [...allYears].sort((a, b) => a.year - b.year) as YearInfo[];
}

export function getYearInfo(year: number) {
  const allYears = getAllYears();
  return allYears.find((yearInfo) => yearInfo.year === year);
}
