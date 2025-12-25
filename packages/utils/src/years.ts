import type { YearInfo } from "./types";
import years from "./data/years.json";

export function getAllYears() {
  return years as YearInfo[];
}
