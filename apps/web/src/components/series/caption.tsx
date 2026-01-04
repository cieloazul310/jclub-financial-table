import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { useSeriesStore } from "@/providers/series-store-provider";
import { getSortState, getUnit } from "@/utils/sort-state";

export function SeriesCaption({
  display = "flex",
  flexDirection = { base: "column", sm: "row-reverse" },
  gap = { base: 1, sm: 2 },
  alignItems = "end",
  justifyContent = "end",
  textStyle = "dns-16N-130",
  ...rest
}: HTMLStyledProps<"figcaption">) {
  const props = {
    display,
    flexDirection,
    gap,
    alignItems,
    justifyContent,
    textStyle,
    ...rest,
  };

  const { currentField, sortField, sortYear, sortAsc } = useSeriesStore(
    (store) => store,
  );
  const { label, sortState } = getSortState({ sortField, sortAsc });
  const unit = getUnit(currentField);
  const sortLabel = `${label}(${sortYear}) ${sortState}`;

  return (
    <styled.figcaption {...props}>
      <span>
        単位: <strong>{unit}</strong>
      </span>
      <span>{sortLabel}</span>
    </styled.figcaption>
  );
}
