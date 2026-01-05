import {
  getLabel,
  getClubInfoLabel,
  AllFinancialDatumFields,
} from "@cieloazul310/jclub-financial";
import type { DownloadState } from "@/stores/download-store";
import { RequiredFields } from "./required-fields";
import type { DatasetIntermediate, FieldAndLabel } from "./types";

/**
 * 表示するデータのプロパティとラベル(英語または日本語)を生成
 */
export function createDataFields({
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

/**
 *
 */
export function creareDatasetFields({
  convertFieldLabel,
}: Pick<DownloadState, "convertFieldLabel">) {
  return (clubInfo: Omit<DatasetIntermediate, "data">) => {
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
