import {
  getLabel,
  AllAttdFields,
  type SortableFields,
} from "@cieloazul310/jclub-financial";

export function getSortState({
  sortAsc,
  sortField,
}: {
  sortAsc: boolean;
  sortField: SortableFields;
}) {
  const label = getLabel(sortField);

  const rankSort = sortAsc ? "低い順" : "高い順";
  const valueSort = sortAsc ? "少ない順" : "多い順";
  const sortState = sortField === "rank" ? rankSort : valueSort;

  return {
    label,
    sortField,
    sortState,
  };
}

export function getUnit(field: SortableFields) {
  if (AllAttdFields.every((value) => value !== field)) {
    return "百万円";
  }
  if (field === "unit_price") return "円";
  if (/_attd$/.test(field)) return "人";
  if (/_games$/.test(field)) return "試合";
  return "百万円";
}
