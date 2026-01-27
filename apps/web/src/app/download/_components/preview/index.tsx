"use client";

import { useEffect, useId } from "react";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { token } from "styled-system/tokens";
import { useTabsContext } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useDownloadStore } from "@/providers/download-store-provider";
import { useWindowSize } from "@/utils/use-window-resize";
import { DataFormatHandler } from "./data-format-handler";
import { PreviewActions } from "./actions";
import type { Dataset } from "../utils/types";
import { createDatasetFormatter } from "../utils/create-dataset-formatter";

/**
 * 画面サイズをmd以上に変更する際に、タブがプレビューの場合、タブをフィルタに設定するフック
 */
function useInitializeTab() {
  const { value, setValue } = useTabsContext();
  const { windowWidth } = useWindowSize();

  return useEffect(() => {
    const breakpointsMd = parseInt(token("breakpoints.md"), 10);

    if (windowWidth && windowWidth > breakpointsMd && value === "preview") {
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
}: HTMLStyledProps<"div"> & { dataset: Dataset[] }) {
  const props = { minHeight, display, flexDirection, gap, ...rest };
  const downloadState = useDownloadStore((store) => store);
  const previewid = useId();

  useInitializeTab();

  const formatter = createDatasetFormatter(downloadState);
  const content = formatter(dataset);

  return (
    <styled.div {...props}>
      <DataFormatHandler />
      <Textarea
        id={previewid}
        width="full"
        height="full"
        textStyle="mono-16N-150"
        readOnly
        value={content}
        flexGrow={1}
      />
      <PreviewActions content={content} dataFormat={downloadState.dataFormat} />
    </styled.div>
  );
}
