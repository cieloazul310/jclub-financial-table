"use client";

import { useEffect } from "react";
import { css } from "styled-system/css";
import { Button } from "@/components/ui/button";
import { useTabsContext } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useWindowSize } from "@/utils/use-window-resize";
import { DataFormatHandler } from "./data-format-handler";
import { dataFilter } from "./data-formatter";
import type { DownloadDataset } from "./types";

/**
 * 画面サイズをmd以上に変更する際に、タブがプレビューの場合、タブをフィルタに設定するフック
 */
function useInitializeTab() {
  const { value, setValue } = useTabsContext();
  const { windowWidth } = useWindowSize();
  return useEffect(() => {
    const breakpointsMd = 768;

    if (windowWidth > breakpointsMd && value === "preview") {
      console.log("Tab changed!", windowWidth, breakpointsMd);
      setValue("item-filter");
    }
  }, [windowWidth, value, setValue]);
}

export function Preview({ dataset }: { dataset: DownloadDataset[] }) {
  useInitializeTab();

  const filter = dataFilter();
  const filteredDataset = filter(dataset);
  const render = JSON.stringify(filteredDataset, null, 2);

  return (
    <div
      className={css({
        px: { base: 2, md: 4 },
        pt: { base: 2, md: 4 },
        minHeight: {
          base: "calc(100vh - {sizes.header-height} - {spacing.24})",
          md: "calc(100vh - {sizes.header-height} - {spacing.8})",
        },
        display: "flex",
        flexDirection: "column",
        gap: 4,
      })}
    >
      <DataFormatHandler />
      <Textarea
        id="preview"
        width="full"
        height="full"
        readOnly
        value={render}
        flexGrow={1}
      />
      <div className={css({ display: "flex", justifyContent: "end" })}>
        <Button>ダウンロード</Button>
      </div>
    </div>
  );
}
