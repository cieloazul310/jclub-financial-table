"use client";

import type { FinancialDatum, ClubInfo } from "@cieloazul310/jclub-financial";
import { css } from "styled-system/css";
import { Tabs } from "@/components/ui/tabs";

type DownloadClientProps = {
  dataset: (ClubInfo & { data: FinancialDatum[] })[];
};

export function DownloadClient({ dataset }: DownloadClientProps) {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: {
          base: "1fr",
          md: "1fr 2fr",
        },
        gridTemplateAreas: {
          base: `"tabs"`,
          md: `"tabs preview"`,
        },
        height: "calc(100vh - {sizes.header-height})",
      })}
    >
      <Tabs.Root
        className={css({ gridArea: "tabs" })}
        defaultValue="item-filter"
      >
        <Tabs.List>
          <Tabs.Trigger value="item-filter">フィルタ</Tabs.Trigger>
          <Tabs.Trigger value="fields">項目</Tabs.Trigger>
          <Tabs.Trigger value="preview" display={{ md: "none" }}>
            プレビュー
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="item-filter">フィルタ</Tabs.Content>
        <Tabs.Content value="fields">項目</Tabs.Content>
        <Tabs.Content value="preview" display={{ md: "none" }}>
          プレビュー
        </Tabs.Content>
      </Tabs.Root>
      <div
        className={css({
          display: { base: "none", md: "block" },
          gridArea: "preview",
        })}
      >
        プレビュー
      </div>
    </div>
  );
}
