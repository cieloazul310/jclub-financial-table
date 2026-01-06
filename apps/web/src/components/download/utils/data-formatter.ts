import { csvFormat } from "d3";
import { getAllYears, getAllClubs } from "@cieloazul310/jclub-financial";
import type {
  DownloadFormatState,
  DownloadState,
} from "@/stores/download-store";
import { creareDatasetFields } from "./data-fields";
import type {
  IntermediateDatum,
  FieldAndLabel,
  DatasetIntermediate,
} from "./types";

const sortedClubIds = getAllClubs()
  .sort((a, b) => parseInt(a.code, 10) - parseInt(b.code, 10))
  .map(({ id }) => id);

export function sortFlatData({
  groupBy,
}: Pick<DownloadFormatState, "groupBy">) {
  if (groupBy === "year") {
    return (a: IntermediateDatum, b: IntermediateDatum) =>
      a.__year - b.__year ||
      sortedClubIds.indexOf(a.__clubId) - sortedClubIds.indexOf(b.__clubId);
  }

  return (a: IntermediateDatum, b: IntermediateDatum) =>
    sortedClubIds.indexOf(a.__clubId) - sortedClubIds.indexOf(b.__clubId) ||
    a.__year - b.__year;
}

const removeIntermediate = ({
  __clubId,
  __year,
  ...datum
}: IntermediateDatum) => datum;

function dataForJson({
  groupBy,
  convertFieldLabel,
}: Pick<DownloadState, "groupBy" | "convertFieldLabel">) {
  const dataLike = (dataset: DatasetIntermediate[]) => {
    if (groupBy === "club") {
      const clubLabelConverter = creareDatasetFields({ convertFieldLabel });

      return dataset
        .sort(
          (a, b) => sortedClubIds.indexOf(a.id) - sortedClubIds.indexOf(b.id),
        )
        .map(({ data, ...club }) => {
          const converted = clubLabelConverter(club);
          return {
            ...converted,
            data: data
              .sort((a, b) => a.__year - b.__year)
              .map(removeIntermediate),
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
            .filter((datum) => datum.__year === year)
            .map(removeIntermediate),
        }))
        .filter(({ data }) => data.length);
    }
    return flatten.map(removeIntermediate);
  };

  return (dataset: DatasetIntermediate[]) =>
    JSON.stringify(dataLike(dataset), null, 2);
}

function dataForCsv(
  { groupBy }: Pick<DownloadState, "groupBy">,
  fields: FieldAndLabel[],
) {
  const csvDataLike = (dataset: DatasetIntermediate[]) => {
    const flatten = dataset.map(({ data }) => data).flat();

    const data = flatten
      .sort(sortFlatData({ groupBy }))
      .map(removeIntermediate);

    return data;
  };

  return (dataset: DatasetIntermediate[]) =>
    csvFormat(
      csvDataLike(dataset),
      fields.map(({ label }) => label),
    );
}

export function createFormatter(
  {
    dataFormat,
    groupBy,
    convertFieldLabel,
  }: Pick<DownloadState, keyof DownloadFormatState | "convertFieldLabel">,
  fields: FieldAndLabel[],
) {
  if (dataFormat === "json") {
    const json = dataForJson({ groupBy, convertFieldLabel });
    return json;
  }

  /**
   * csv
   */
  const csv = dataForCsv({ groupBy }, fields);
  return csv;
}
