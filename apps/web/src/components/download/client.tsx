"use client";

import { Suspense } from "react";
import { css } from "styled-system/css";
import { Tabs } from "@/components/ui/tabs";
import { PageLoading } from "@/components/loading";
import { DataFilter } from "./data-filter";
import { FieldHandler } from "./field-handler";
import { Preview } from "./preview";
import type { Dataset } from "./utils/types";

type DownloadClientProps = {
  dataset: Dataset[];
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
            <Suspense fallback={<PageLoading />}>
              <DataFilter p={4} />
            </Suspense>
          </Tabs.Content>
          <Tabs.Content value="fields" pb={16}>
            <Suspense fallback={<PageLoading />}>
              <FieldHandler p={4} />
            </Suspense>
          </Tabs.Content>
          <Tabs.Content value="preview" display={{ md: "none" }}>
            <Suspense fallback={<PageLoading />}>
              <Preview p={4} dataset={dataset} />
            </Suspense>
          </Tabs.Content>
        </div>
        <div
          className={css({
            display: { base: "none", md: "block" },
            gridArea: "preview",
          })}
        >
          <Suspense fallback={<PageLoading />}>
            <Preview pt={4} px={8} dataset={dataset} />
          </Suspense>
        </div>
      </div>
    </Tabs.Root>
  );
}
