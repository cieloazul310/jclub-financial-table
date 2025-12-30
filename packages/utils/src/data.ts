import {
  AllFields,
  AllGeneralFields,
  AllSeasonResultFields,
  type GeneralFields,
  type FinancialDatum,
  type ExtendedFinancialDatum,
  type SeasonResultFields,
} from "./types";

function isGeneralFields(key: string): key is GeneralFields {
  return AllGeneralFields.some((str) => str === key);
}
function isSeasonResultFields(key: string): key is SeasonResultFields {
  return AllSeasonResultFields.some((str) => str === key);
}

function processDatum(datum: FinancialDatum, prev?: FinancialDatum | null) {
  const obj = {} as any;

  for (const key of AllFields) {
    const value = datum[key];
    if (isGeneralFields(key) || isSeasonResultFields(key)) {
      if (value) {
        obj[key] = { value };
      }
      continue;
    }
    if (typeof value === "number") {
      obj[key] = {
        value,
        delta: typeof prev?.[key] === "number" ? value - prev[key] : null,
      };
      continue;
    }
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
