"use client";

import {
  getAllYears,
  type FinancialDatum,
} from "@cieloazul310/jclub-financial";
import { cx, css } from "styled-system/css";
import { Table } from "@/components/ui/table";
import { useSeriesStore } from "@/providers/series-store-provider";

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
    category: string;
    name: string;
    short_name: string;
    data: (FinancialDatum | null)[];
  }[];
};

export function SeriesTable({ dataset }: SeriesClientProps) {
  const { currentField } = useSeriesStore((store) => store);
  const allYears = getAllYears();

  return (
    <div
      className={css({
        maxWidth: "full",
        maxHeight: "70vh",
        overflowX: "auto",
        overflowY: "auto",
      })}
    >
      <Table.Root dense width="full" fontFamily="Helvetica, Arial, sans-serif">
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
  );
}
