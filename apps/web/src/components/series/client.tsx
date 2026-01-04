"use client";

import { useId } from "react";
import { Copy } from "lucide-react";
import { css } from "styled-system/css";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/tooltip";
import { useCopy } from "@/utils/use-copy";
import { Filter } from "./filter";
import { SeriesSelect } from "./select";
import { SeriesTable } from "./table";
import type { SeriesData } from "./types";

type SeriesClientProps = {
  dataset: SeriesData[];
};

export function SeriesClient({ dataset }: SeriesClientProps) {
  const id = useId();
  const onCopy = useCopy(id);

  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "1fr",
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
            onClick={onCopy}
          >
            <Copy />
          </Button>
        </Tooltip>
        <Filter />
      </div>
      <SeriesTable tableId={id} dataset={dataset} />
    </div>
  );
}
