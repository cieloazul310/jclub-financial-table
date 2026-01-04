"use client";

import { useEffect } from "react";
import {
  AllFinancialDatumFields,
  type FinancialDatum,
} from "@cieloazul310/jclub-financial";
import { pick } from "lodash";
import { css } from "styled-system/css";
import { Button } from "@/components/ui/button";
import { Fieldset } from "@/components/ui/fieldset";
import { useTabsContext } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup } from "@/components/ui/radio-group";
import { useDownloadStore } from "@/providers/download-store-provider";
import type {
  DownloadFilterState,
  DownloadFormatState,
} from "@/stores/download-store";
import { useWindowSize } from "@/utils/use-window-resize";
import type { DownloadDataset } from "./types";

function dataFilter({
  visibleClubs,
  visibleCategories,
  visibleFields,
  visibleYears,
}: DownloadFilterState) {
  const clubsFilter = (datasetItem: DownloadDataset) =>
    visibleClubs.some((club) => datasetItem.slug === club);
  const categoriesFilter = (datum: FinancialDatum) =>
    visibleCategories.some((category) => category === datum.category);
  const yearsFilter = (datum: FinancialDatum) =>
    visibleYears.some((year) => year === datum.year);
  const sortedFields = visibleFields.sort(
    (a, b) =>
      AllFinancialDatumFields.indexOf(a) - AllFinancialDatumFields.indexOf(b),
  );
  const fieldsMapper = (data: FinancialDatum) => pick(data, sortedFields);

  return (dataset: DownloadDataset[]) => {
    return dataset.filter(clubsFilter).map(({ data, ...rest }) => {
      const filtered = data.filter(
        (datum) => yearsFilter(datum) && categoriesFilter(datum),
      );
      return {
        ...rest,
        data: filtered.map(fieldsMapper),
      };
    });
  };
}

const dataFormatItems = [
  {
    title: "JSON",
    value: "json",
  },
  {
    title: "CSV",
    value: "csv",
  },
];
const groupByItems = [
  { title: "グループ化しない", value: "none" },
  { title: "クラブ別", value: "club" },
  { title: "年別", value: "year" },
];

export function Preview({ dataset }: { dataset: DownloadDataset[] }) {
  const {
    visibleClubs,
    visibleCategories,
    visibleYears,
    visibleFields,
    dataFormat,
    groupBy,
    setFormat,
  } = useDownloadStore((store) => store);

  const { value, setValue } = useTabsContext();
  const { windowWidth } = useWindowSize();
  useEffect(() => {
    const breakpointsMd = 768;

    if (windowWidth > breakpointsMd && value === "preview") {
      console.log("Tab changed!", windowWidth, breakpointsMd);
      setValue("item-filter");
    }
  }, [windowWidth, value, setValue]);

  const onFormatChange =
    (key: keyof DownloadFormatState) =>
    (details: RadioGroup.ValueChangeDetails) => {
      if (details.value) {
        setFormat(key, details.value as any);
      }
    };

  const filter = dataFilter({
    visibleClubs,
    visibleCategories,
    visibleYears,
    visibleFields,
  });
  const filteredDataset = filter(dataset);

  const render = JSON.stringify(filteredDataset, null, 2);

  return (
    <div
      className={css({
        px: { base: 2, md: 4 },
        pt: { base: 2, md: 4 },
        minHeight: {
          base: "calc(100vh - {sizes.header-height} - {spacing.24})",
          md: "calc(100vh - {sizes.header-height} - {spacing.8})",
        },
        display: "flex",
        flexDirection: "column",
        gap: 4,
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: { base: "column", md: "row" },
          gap: { base: 4, md: 12 },
        })}
      >
        <Fieldset.Root>
          <Fieldset.Legend>データフォーマット</Fieldset.Legend>
          <RadioGroup.Root
            value={dataFormat}
            flexWrap="wrap"
            mt="1"
            orientation="horizontal"
            size="sm"
            onValueChange={onFormatChange("dataFormat")}
          >
            {dataFormatItems.map(({ title, value }) => (
              <RadioGroup.Item key={value} value={value}>
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText>{title}</RadioGroup.ItemText>
                <RadioGroup.ItemHiddenInput />
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        </Fieldset.Root>
        <Fieldset.Root>
          <Fieldset.Legend>グループ化</Fieldset.Legend>
          <RadioGroup.Root
            value={groupBy}
            flexWrap="wrap"
            mt="1"
            orientation="horizontal"
            size="sm"
            onValueChange={onFormatChange("groupBy")}
          >
            {groupByItems.map(({ title, value }) => (
              <RadioGroup.Item key={value} value={value}>
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText>{title}</RadioGroup.ItemText>
                <RadioGroup.ItemHiddenInput />
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        </Fieldset.Root>
      </div>
      <Textarea
        id="preview"
        width="full"
        height="full"
        readOnly
        value={render}
        flexGrow={1}
      />
      <div className={css({ display: "flex", justifyContent: "end" })}>
        <Button>ダウンロード</Button>
      </div>
    </div>
  );
}
