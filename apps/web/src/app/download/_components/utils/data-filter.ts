import type { FinancialDatum } from "@cieloazul310/jclub-financial";
import type { DownloadFilterState } from "@/stores/download-store";
import type {
  Dataset,
  DatasetIntermediate,
  FieldAndLabel,
  IntermediateDatum,
} from "./types";

function getDataFilters({
  visibleClubs,
  visibleCategories,
  visibleYears,
}: Omit<DownloadFilterState, "visibleFields">) {
  const clubsFilter = (datasetItem: Dataset) =>
    visibleClubs.some((club) => datasetItem.id === club);
  const categoriesFilter = (datum: FinancialDatum) =>
    visibleCategories.some((category) => category === datum.category);
  const yearsFilter = (datum: FinancialDatum) =>
    visibleYears.some((year) => year === datum.year);

  return { clubsFilter, categoriesFilter, yearsFilter };
}

function pickAndLabeled(datum: FinancialDatum, dataFields: FieldAndLabel[]) {
  const newDatum: IntermediateDatum = {
    __clubId: datum.clubId,
    __year: datum.year,
  };

  dataFields.forEach(({ field, label }) => {
    const value = datum[field];
    if (typeof value === "string" || typeof value === "number") {
      newDatum[label ?? field] = value;
    }
  });
  return newDatum;
}

function createFieldsMapper(fields: FieldAndLabel[]) {
  return (datum: FinancialDatum) => pickAndLabeled(datum, fields);
}

export function createDataFilter(
  {
    visibleClubs,
    visibleCategories,
    visibleYears,
  }: Omit<DownloadFilterState, "visibleFields">,
  fields: FieldAndLabel[],
): (input: Dataset[]) => DatasetIntermediate[] {
  const { clubsFilter, categoriesFilter, yearsFilter } = getDataFilters({
    visibleClubs,
    visibleCategories,
    visibleYears,
  });
  const fieldsMapper = createFieldsMapper(fields);

  const datasetMapper = ({ data, ...rest }: Dataset) => {
    const filtered = data.filter(
      (datum) => yearsFilter(datum) && categoriesFilter(datum),
    );
    return {
      ...rest,
      data: filtered.map(fieldsMapper),
    };
  };

  return (dataset: Dataset[]) => {
    return dataset.filter(clubsFilter).map(datasetMapper);
  };
}
