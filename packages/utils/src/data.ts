import { allSortableFields, getGeneral, getSeasonResult } from "./all-fields";
import type { FinancialDatum, ExtendedFinancialDatum } from "./types";

function processDatum(datum: FinancialDatum, prev?: FinancialDatum | null) {
  const general = getGeneral(datum);
  const seasonResult = getSeasonResult(datum);
  const obj: ExtendedFinancialDatum = {
    ...general,
    ...seasonResult,
  } as any;

  for (const key of allSortableFields) {
    const value = datum[key];
    obj[key] = {
      value,
      growth: value && prev?.[key] ? value - prev[key] : null,
    };
  }
  return obj;
}

export function extendClubData(
  data: FinancialDatum[],
): ExtendedFinancialDatum[] {
  const sorted = [...data].sort((a, b) => a.year - b.year);
  return sorted.map((d, index, arr) => {
    const prev = index === 0 ? null : arr[index - 1];

    return processDatum(d, prev);
  });
}

export function extendYearData(
  data: FinancialDatum[],
  prevData: FinancialDatum[] | null,
): ExtendedFinancialDatum[] {
  return data.map((datum) => {
    const prev = prevData?.find(({ slug }) => slug === datum.slug);

    return processDatum(datum, prev);
  });
}
