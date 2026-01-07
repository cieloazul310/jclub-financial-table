"use client";

import { useMemo } from "react";
import { useClipboard } from "@ark-ui/react";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { Button } from "@/components/ui/button";
import { Toast, toaster } from "@/components/toast";
import type { DownloadState } from "@/stores/download-store";

export function PreviewActions({
  content,
  dataFormat,
  display = "flex",
  justifyContent = "end",
  gap = 2,
  ...rest
}: HTMLStyledProps<"div"> & {
  content: string;
  dataFormat: DownloadState["dataFormat"];
}) {
  const props = { display, justifyContent, gap, ...rest };

  const { copy } = useClipboard({ value: content });
  const onCopyClick = () => {
    copy();
    toaster.create({
      description: "表示中のデータをクリップボードにコピーしました",
      type: "info",
    });
  };

  const download = useMemo(() => {
    if (typeof window !== "object") return undefined;
    const blob = new Blob([content], {
      type: dataFormat === "csv" ? "text/csv" : "application/json",
    });
    return URL.createObjectURL(blob);
  }, [content, dataFormat]);
  const onDownloadClick = () => {
    toaster.create({
      description: "表示中のデータをダウンロードしました",
      type: "info",
    });
  };

  return (
    <styled.div {...props}>
      <Button variant="outline" onClick={onCopyClick}>
        コピー
      </Button>
      <Button asChild onClick={onDownloadClick}>
        <a download href={download}>
          ダウンロード
        </a>
      </Button>
      <Toast />
    </styled.div>
  );
}
