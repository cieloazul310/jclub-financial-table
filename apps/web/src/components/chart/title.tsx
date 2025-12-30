"use client";

import { css } from "styled-system/css";
import { useTableStore } from "@/providers/table-store-provider";

export function useChartTitle() {
  const { tab } = useTableStore((store) => store);
  if (tab === "bs") return "資産の部、負債の部、純資産の部推移";
  if (tab === "expense") return "チーム人件費推移";
  if (tab === "attd") return "平均入場者数推移";
  return "営業収入推移";
}

export function ChartTitle() {
  const title = useChartTitle();

  return (
    <figcaption
      className={css({
        gridArea: "caption",
        textStyle: "dns-16N-130",
        textAlign: "center",
      })}
    >
      {title}
    </figcaption>
  );
}
