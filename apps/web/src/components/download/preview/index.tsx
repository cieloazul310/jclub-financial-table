"use client";

import { useEffect } from "react";
import { css } from "styled-system/css";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { token } from "styled-system/tokens";
import { Button } from "@/components/ui/button";
import { useTabsContext } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useDownloadStore } from "@/providers/download-store-provider";
import { useWindowSize } from "@/utils/use-window-resize";
import { DataFormatHandler } from "./data-format-handler";
import { useDatasetFormatter } from "./data-formatter";
import type { DownloadDataset } from "../types";

/**
 * 画面サイズをmd以上に変更する際に、タブがプレビューの場合、タブをフィルタに設定するフック
 */
function useInitializeTab() {
  const { value, setValue } = useTabsContext();
  const { windowWidth } = useWindowSize();

  return useEffect(() => {
    const breakpointsMd = parseInt(token("breakpoints.md"), 10);

    if (windowWidth > breakpointsMd && value === "preview") {
      console.log("Tab changed!", windowWidth, breakpointsMd);
      setValue("item-filter");
    }
  }, [windowWidth, value, setValue]);
}

export function Preview({
  dataset,
  minHeight = {
    base: "calc(100vh - {sizes.header-height} - {spacing.24})",
    md: "calc(100vh - {sizes.header-height} - {spacing.8})",
  },
  display = "flex",
  flexDirection = "column",
  gap = 4,
  ...rest
}: HTMLStyledProps<"div"> & { dataset: DownloadDataset[] }) {
  const props = { minHeight, display, flexDirection, gap, ...rest };
  const {
    visibleClubs,
    visibleCategories,
    visibleYears,
    visibleFields,
    dataFormat,
    groupBy,
    convertFieldLabel,
  } = useDownloadStore((store) => store);

  useInitializeTab();

  const formatter = useDatasetFormatter({
    visibleClubs,
    visibleCategories,
    visibleYears,
    visibleFields,
    dataFormat,
    groupBy,
    convertFieldLabel,
  });

  const render = formatter(dataset);

  return (
    <styled.div {...props}>
      <DataFormatHandler />
      <Textarea
        width="full"
        height="full"
        textStyle="mono-16N-150"
        readOnly
        value={render}
        flexGrow={1}
      />
      <div className={css({ display: "flex", justifyContent: "end", gap: 2 })}>
        <Button variant="outline">コピー</Button>
        <Button>ダウンロード</Button>
      </div>
    </styled.div>
  );
}
