"use client";

import { Table, File } from "lucide-react";
import { Tooltip } from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import { useTableStore } from "@/providers/table-store-provider";

export function ModeHandler() {
  const { cardMode, toggleCardMode } = useTableStore((store) => store);

  return (
    <Tooltip content={cardMode ? "テーブルで表示" : "カードで表示"}>
      <Button
        variant="outline"
        size="xs"
        colorPalette="solid-gray"
        onClick={toggleCardMode}
      >
        {cardMode ? <File /> : <Table />}
      </Button>
    </Tooltip>
  );
}
