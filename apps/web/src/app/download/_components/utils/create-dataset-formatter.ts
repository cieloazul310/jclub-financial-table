import type { DownloadState } from "@/stores/download-store";
import { createDataFields } from "./data-fields";
import { createDataFilter } from "./data-filter";
import { createFormatter } from "./data-formatter";
import type { Dataset } from "./types";

export function createDatasetFormatter({
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

  const dataFilter = createDataFilter(
    {
      visibleCategories,
      visibleClubs,
      visibleYears,
    },
    fields,
  );
  const formatter = createFormatter(
    { dataFormat, groupBy, convertFieldLabel },
    fields,
  );

  return (input: Dataset[]) => {
    const filtered = dataFilter(input);
    return formatter(filtered);
  };
}
