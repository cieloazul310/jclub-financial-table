"use client";

import { useState } from "react";
import {
  getAllYears,
  AllPLFields,
  getLabel,
  type FinancialDatum,
  type SortableKeys,
} from "@cieloazul310/jclub-financial";
import { cx, css } from "styled-system/css";
import { Field } from "@/components/ui/field";
import { Table } from "@/components/ui/table";

function tableCellColorPalette(category?: string) {
  if (!category) return css({ bg: "white" });
  if (category === "J1") return css({ colorPalette: "red" });
  if (category === "J2") return css({ colorPalette: "green" });
  if (category === "J3") return css({ colorPalette: "blue" });
  return css({ colorPalette: "solid-gray" });
}

function tableCellStyle(category?: string) {
  return cx(
    tableCellColorPalette(category),
    category &&
      css({
        bgLinear: "to-b",
        gradientFrom: "colorPalette.50/50",
        gradientFromPosition: "90%",
        gradientTo: "colorPalette.600",
      }),
  );
}

type SeriesClientProps = {
  dataset: {
    slug: string;
    short_name: string;
    data: (FinancialDatum | null)[];
  }[];
};

export function SeriesClient({ dataset }: SeriesClientProps) {
  const [currentField, setField] = useState<SortableKeys>("revenue");
  const allYears = getAllYears();
  const onFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setField(value as SortableKeys);
    }
  };

  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 4,
        pt: 8,
      })}
    >
      <div className={css({ display: "flex", justifyContent: "center" })}>
        <Field.Root>
          <Field.Label>表示する項目</Field.Label>
          <Field.Select asChild>
            <select defaultValue={currentField} onChange={onFieldChange}>
              <option value="">項目を選択</option>
              <optgroup label="損益計算書">
                {AllPLFields.map((field) => (
                  <option key={field} value={field}>
                    {getLabel(field)}
                  </option>
                ))}
              </optgroup>
            </select>
          </Field.Select>
        </Field.Root>
      </div>
      <div
        className={css({
          maxWidth: "full",
          maxHeight: "70vh",
          overflowX: "auto",
          overflowY: "auto",
        })}
      >
        <Table.Root
          dense
          width="full"
          fontFamily="Helvetica, Arial, sans-serif"
        >
          <colgroup>
            <col className={css({ minWidth: "6em" })} />
          </colgroup>
          <Table.Head position="sticky" top={0} left={0} zIndex={2}>
            <Table.Row>
              <Table.Header
                scope="col"
                position="sticky"
                left={0}
                zIndex={3}
                bg="solid-gray.bg"
              >
                クラブ
              </Table.Header>
              {allYears.map(({ year }) => (
                <Table.Header key={`thead-${year}`} scope="col">
                  {year}
                </Table.Header>
              ))}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {dataset.map(({ slug, short_name, data }) => (
              <Table.Row key={slug}>
                <Table.Header
                  scope="row"
                  bg="white"
                  position="sticky"
                  left={0}
                  zIndex={1}
                >
                  {short_name}
                </Table.Header>
                {data.map((datum, index) => (
                  <Table.Cell
                    key={`${slug}-${index}`}
                    className={tableCellStyle(datum?.category)}
                    align="right"
                  >
                    {datum?.[currentField]}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}
