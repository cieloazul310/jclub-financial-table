"use client";

import { CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toast, toaster } from "@/components/toast";
import { Tooltip } from "@/components/tooltip";
import { useTableStore } from "@/providers/table-store-provider";
import { useCopyTable } from "@/utils/use-copy";
import { useTableId } from "../utils/use-table-id";

export function CopyButton() {
  const { cardMode } = useTableStore((store) => store);
  const tableId = useTableId();
  const onClick = useCopyTable(tableId, () => {
    toaster.create({
      description: "表をクリップボードにコピーしました",
      type: "info",
    });
  });

  return (
    <>
      <Tooltip content="表をコピー">
        <Button
          variant="outline"
          size="xs"
          colorPalette="solid-gray"
          aria-label="表をコピー"
          aria-disabled={cardMode}
          onClick={onClick}
        >
          <CopyIcon />
        </Button>
      </Tooltip>
      <Toast />
    </>
  );
}
