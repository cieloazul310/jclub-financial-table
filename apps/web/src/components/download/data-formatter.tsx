import {
  getLabel,
  AllFinancialDatumFields,
  type FinancialDatum,
} from "@cieloazul310/jclub-financial";
import type {
  DownloadFilterState,
  DownloadFormatState,
} from "@/stores/download-store";
import { useDownloadStore } from "@/providers/download-store-provider";
import { RequiredFields, type DownloadDataset } from "./types";

function createDataFilter({
  visibleClubs,
  visibleCategories,
  visibleYears,
}: Omit<DownloadFilterState, "visibleFields">) {
  const clubsFilter = (datasetItem: DownloadDataset) =>
    visibleClubs.some((club) => datasetItem.slug === club);
  const categoriesFilter = (datum: FinancialDatum) =>
    visibleCategories.some((category) => category === datum.category);
  const yearsFilter = (datum: FinancialDatum) =>
    visibleYears.some((year) => year === datum.year);

  return { clubsFilter, categoriesFilter, yearsFilter };
}

function pickAndLabeled(
  datum: FinancialDatum,
  visibleFields: (keyof FinancialDatum)[],
  requiredFields: (keyof FinancialDatum)[] = RequiredFields,
) {
  const fields = new Set(
    [...requiredFields, ...visibleFields].sort(
      (a, b) =>
        AllFinancialDatumFields.indexOf(a) - AllFinancialDatumFields.indexOf(b),
    ),
  );
  const newDatum: Record<string, string | number> = {};

  for (const field of fields) {
    const label = getLabel(field);
    const value = datum[field];

    if (!value) continue;
    newDatum[label] = value;
  }
  return newDatum;
}

function createFieldsMapper({
  visibleFields,
}: Pick<DownloadFilterState, "visibleFields">) {
  return (datum: FinancialDatum) => pickAndLabeled(datum, visibleFields);
}

export function dataFilter() {
  const { visibleClubs, visibleCategories, visibleYears, visibleFields } =
    useDownloadStore((store) => store);

  const { clubsFilter, categoriesFilter, yearsFilter } = createDataFilter({
    visibleClubs,
    visibleCategories,
    visibleYears,
  });
  const fieldsMapper = createFieldsMapper({ visibleFields });

  const datasetMapper = ({ data, ...rest }: DownloadDataset) => {
    const filtered = data.filter(
      (datum) => yearsFilter(datum) && categoriesFilter(datum),
    );
    return {
      ...rest,
      data: filtered.map(fieldsMapper),
    };
  };

  return (dataset: DownloadDataset[]) => {
    return dataset.filter(clubsFilter).map(datasetMapper);
  };
}
