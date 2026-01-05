"use client";

import { css } from "styled-system/css";
import { Tabs } from "@/components/ui/tabs";
import { DataFilter } from "./data-filter";
import { FieldHandler } from "./field-handler";
import { Preview } from "./preview";
import type { DownloadDataset } from "./types";

type DownloadClientProps = {
  dataset: DownloadDataset[];
};

export function DownloadClient({ dataset }: DownloadClientProps) {
  return (
    <Tabs.Root defaultValue="item-filter" unmountOnExit>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: {
            base: "1fr",
            md: "1fr 2fr",
          },
          gridTemplateAreas: {
            base: `
            "tabs"
            "tabContent"
            `,
            md: `
            "tabs preview"
            "tabContent preview"
            `,
          },
        })}
      >
        <Tabs.List
          bg="white"
          position="sticky"
          top={0}
          zIndex="calc({zIndex.docked} - 1)"
          gridArea="tabs"
        >
          <Tabs.Trigger py={4} value="item-filter">
            フィルタ
          </Tabs.Trigger>
          <Tabs.Trigger py={4} value="fields">
            項目
          </Tabs.Trigger>
          <Tabs.Trigger py={4} value="preview" display={{ md: "none" }}>
            プレビュー
          </Tabs.Trigger>
        </Tabs.List>
        <div
          className={css({
            gridArea: "tabContent",
            maxHeight: "calc(100vh - {sizes.header-height})",
            overflowY: "auto",
            position: "relative",
          })}
        >
          <Tabs.Content value="item-filter" pb={16}>
            <DataFilter p={2} />
          </Tabs.Content>
          <Tabs.Content value="fields" pb={16}>
            <FieldHandler p={2} />
          </Tabs.Content>
          <Tabs.Content value="preview" display={{ md: "none" }}>
            <Preview p={2} dataset={dataset} />
          </Tabs.Content>
        </div>
        <div
          className={css({
            display: { base: "none", md: "block" },
            gridArea: "preview",
          })}
        >
          <Preview pt={4} px={4} dataset={dataset} />
        </div>
      </div>
    </Tabs.Root>
  );
}
