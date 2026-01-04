"use client";

import { css } from "styled-system/css";
import { Tabs } from "@/components/ui/tabs";
import { ItemFilter } from "./item-filter";
import { FieldFilter } from "./field-filter";
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
            base: `"tabs"`,
            md: `"tabs preview"`,
          },
        })}
      >
        <div
          className={css({
            gridArea: "tabs",
            maxHeight: "calc(100vh - {sizes.header-height})",
            overflowY: "auto",
          })}
        >
          <Tabs.List
            bg="white"
            position="sticky"
            top={0}
            zIndex="calc({zIndex.docked} - 1)"
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
          <Tabs.Content value="item-filter" pb={16}>
            <ItemFilter />
          </Tabs.Content>
          <Tabs.Content value="fields" pb={16}>
            <div className={css({ p: 2 })}>
              <h3 className={css({ mb: 2, textStyle: "std-17B-170" })}>
                表示項目
              </h3>
              <FieldFilter />
            </div>
          </Tabs.Content>
          <Tabs.Content value="preview" display={{ md: "none" }}>
            <Preview dataset={dataset} />
          </Tabs.Content>
        </div>
        <div
          className={css({
            display: { base: "none", md: "block" },
            gridArea: "preview",
          })}
        >
          <Preview dataset={dataset} />
        </div>
      </div>
    </Tabs.Root>
  );
}
