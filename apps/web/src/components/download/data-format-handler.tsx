"use client";

import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { Fieldset } from "@/components/ui/fieldset";
import { RadioGroup } from "@/components/ui/radio-group";
import { useDownloadStore } from "@/providers/download-store-provider";
import type { DownloadFormatState } from "@/stores/download-store";

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

export function DataFormatHandler({
  /**
   * display: "flex",
          flexDirection: { base: "column", md: "row" },
          gap: { base: 4, md: 12 },
   */
  display = "flex",
  flexDirection = { base: "column", md: "row" },
  gap = { base: 4, md: 12 },
  ...rest
}: HTMLStyledProps<"div">) {
  const props = { display, flexDirection, gap, ...rest };

  const { dataFormat, groupBy, setFormat } = useDownloadStore((store) => store);
  const onFormatChange =
    (key: keyof DownloadFormatState) =>
    (details: RadioGroup.ValueChangeDetails) => {
      if (details.value) {
        setFormat(key, details.value as any);
      }
    };
  return (
    <styled.div {...props}>
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
    </styled.div>
  );
}
