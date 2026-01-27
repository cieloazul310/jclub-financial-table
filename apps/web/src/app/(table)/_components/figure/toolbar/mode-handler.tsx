"use client";

import { Table, FileText } from "lucide-react";
import { Tooltip } from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import { useTableStore } from "@/providers/table-store-provider";

export function ModeHandler() {
  const { cardMode, toggleCardMode } = useTableStore((store) => store);

  return (
    <>
      <Tooltip content="テーブルで表示">
        <Button
          variant="outline"
          size="xs"
          colorPalette="solid-gray"
          onClick={toggleCardMode}
          disabled={!cardMode}
        >
          <Table />
        </Button>
      </Tooltip>
      <Tooltip content="カードで表示">
        <Button
          variant="outline"
          size="xs"
          colorPalette="solid-gray"
          onClick={toggleCardMode}
          disabled={cardMode}
        >
          <FileText />
        </Button>
      </Tooltip>
    </>
  );
}
