"use client";

import { Suspense, useId } from "react";
import { Copy } from "lucide-react";
import { css } from "styled-system/css";
import { Button } from "@/components/ui/button";
import { Toast, toaster } from "@/components/toast";
import { Tooltip } from "@/components/tooltip";
import { PageLoading } from "@/components/loading";
import { useCopyTable } from "@/utils/use-copy";
import { Filter } from "./filter";
import { SeriesSelect } from "./select";
import { SeriesTable } from "./table";
import type { SeriesData } from "./types";

type SeriesClientProps = {
  dataset: SeriesData[];
};

export function SeriesClient({ dataset }: SeriesClientProps) {
  const id = useId();
  const onClick = useCopyTable(id, () => {
    toaster.create({
      description: "表をクリップボードにコピーしました",
      type: "info",
    });
  });

  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr)",
        gap: 4,
        pt: 4,
        maxWidth: "full",
      })}
    >
      <div
        className={css({
          display: "flex",
          gap: 2,
          justifyContent: "center",
          alignItems: "end",
        })}
      >
        <SeriesSelect />
        <Tooltip content="表をコピーする">
          <Button
            variant="outline"
            colorPalette="solid-gray"
            size="sm"
            onClick={onClick}
          >
            <Copy />
          </Button>
        </Tooltip>
        <Toast />
        <Filter />
      </div>
      <Suspense fallback={<PageLoading />}>
        <SeriesTable tableId={id} dataset={dataset} />
      </Suspense>
    </div>
  );
}
