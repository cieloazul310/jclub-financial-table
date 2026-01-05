import { csvFormat } from "d3";
import {
  getAllClubs,
  getAllYears,
  getLabel,
  getClubInfoLabel,
  AllFinancialDatumFields,
  type FinancialDatum,
} from "@cieloazul310/jclub-financial";
import type {
  DownloadFilterState,
  DownloadFormatState,
  DownloadState,
} from "@/stores/download-store";
import { RequiredFields, type DownloadDataset } from "../types";

type FieldAndLabel = {
  field: keyof FinancialDatum;
  label: string;
};

type OutputDatum = { _slug: string; _year: number } & Record<
  string,
  string | number
>;

type DownloadDatasetOutput = Omit<DownloadDataset, "data"> & {
  data: OutputDatum[];
};

const sortedClubs = getAllClubs()
  .sort((a, b) => parseInt(a.code, 10) - parseInt(b.code, 10))
  .map(({ slug }) => slug);

function createDataFields({
  visibleFields,
  convertFieldLabel,
}: Pick<DownloadState, "visibleFields" | "convertFieldLabel">) {
  const fields = new Set(
    [...RequiredFields, ...visibleFields].sort(
      (a, b) =>
        AllFinancialDatumFields.indexOf(a) - AllFinancialDatumFields.indexOf(b),
    ),
  );

  return [...fields].map((field) => ({
    field,
    label: convertFieldLabel ? getLabel(field) : field,
  })) satisfies FieldAndLabel[];
}

function creareDatasetFields({
  convertFieldLabel,
}: Pick<DownloadState, "convertFieldLabel">) {
  return (clubInfo: Omit<DownloadDatasetOutput, "data">) => {
    if (!convertFieldLabel) return clubInfo;
    const converted: Record<string, any> = {};
    Object.entries(clubInfo).forEach(([key, value]) => {
      if (value !== null) {
        const label = getClubInfoLabel(key);
        converted[label] = value;
      }
    });
    return converted;
  };
}

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

function pickAndLabeled(datum: FinancialDatum, dataFields: FieldAndLabel[]) {
  const newDatum: OutputDatum = {
    _slug: datum.slug,
    _year: datum.year,
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

export function useDataFilter(
  {
    visibleClubs,
    visibleCategories,
    visibleYears,
  }: Omit<DownloadFilterState, "visibleFields">,
  fields: FieldAndLabel[],
): (input: DownloadDataset[]) => DownloadDatasetOutput[] {
  const { clubsFilter, categoriesFilter, yearsFilter } = createDataFilter({
    visibleClubs,
    visibleCategories,
    visibleYears,
  });
  const fieldsMapper = createFieldsMapper(fields);

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

export function flatDataSort({
  groupBy,
}: Pick<DownloadFormatState, "groupBy">) {
  if (groupBy === "year") {
    return (a: OutputDatum, b: OutputDatum) =>
      a._year - b._year ||
      sortedClubs.indexOf(a._slug) - sortedClubs.indexOf(b._slug);
  }
  return (a: OutputDatum, b: OutputDatum) =>
    sortedClubs.indexOf(a._slug) - sortedClubs.indexOf(b._slug) ||
    a._year - b._year;
}

export function useFormatter(
  {
    dataFormat,
    groupBy,
    convertFieldLabel,
  }: Pick<DownloadState, keyof DownloadFormatState | "convertFieldLabel">,
  fields: FieldAndLabel[],
) {
  return (dataset: DownloadDatasetOutput[]) => {
    if (dataFormat === "json") {
      const json = () => {
        if (groupBy === "club") {
          const clubLabelConverter = creareDatasetFields({ convertFieldLabel });

          return dataset
            .sort(
              (a, b) =>
                sortedClubs.indexOf(a.slug) - sortedClubs.indexOf(b.slug),
            )
            .map(({ data, ...club }) => {
              const converted = clubLabelConverter(club);
              return {
                ...converted,
                data: data
                  .sort((a, b) => a._year - b._year)
                  .map(({ _slug, _year, ...datum }) => datum),
              };
            });
        }

        const flatten = dataset.map(({ data }) => data).flat();
        if (groupBy === "year") {
          const allYears = getAllYears();

          return allYears
            .map(({ year }) => ({
              year,
              data: flatten
                .filter((datum) => datum._year === year)
                .map(({ _slug, _year, ...datum }) => datum),
            }))
            .filter(({ data }) => data.length);
        }
        return flatten.map(({ _slug, _year, ...datum }) => datum);
      };

      return JSON.stringify(json(), null, 2);
    }

    const flatten = dataset.map(({ data }) => data).flat();
    const data = flatten
      .sort(flatDataSort({ groupBy }))
      .map(({ _slug, _year, ...datum }) => datum);

    return csvFormat(
      data,
      fields.map(({ label }) => label),
    );
  };
}

export function useDatasetFormatter({
  visibleClubs,
  visibleCategories,
  visibleYears,
  visibleFields,
  dataFormat,
  groupBy,
  convertFieldLabel,
}: DownloadState) {
  const fields = createDataFields({
    visibleFields,
    convertFieldLabel,
  });

  const dataFilter = useDataFilter(
    {
      visibleCategories,
      visibleClubs,
      visibleYears,
    },
    fields,
  );
  const formatter = useFormatter(
    { dataFormat, groupBy, convertFieldLabel },
    fields,
  );

  return (input: DownloadDataset[]) => {
    const filtered = dataFilter(input);
    return formatter(filtered);
  };
}
