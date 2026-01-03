"use client";

import { getAllYears } from "@cieloazul310/jclub-financial";
import { cx, css } from "styled-system/css";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { Table } from "@/components/ui/table";
import { useSeriesStore } from "@/providers/series-store-provider";
import { SeriesCaption } from "./caption";
import type { SeriesData } from "./types";

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
  dataset: SeriesData[];
  tableId: string;
} & HTMLStyledProps<"figure">;

export function SeriesTable({
  dataset,
  tableId,
  mx = "auto",
  width = "fit-content",
  overflowX = "hidden",
  maxWidth = "full",
  ...rest
}: SeriesClientProps) {
  const props = { mx, width, maxWidth, overflowX, ...rest };
  const {
    currentField,
    sortField,
    sortAsc,
    sortYear,
    visibleClubs,
    visibleYears,
    setSortField,
    setSortYear,
    toggleSort,
  } = useSeriesStore((store) => store);

  const [from, to] = visibleYears;
  const allYears = getAllYears();
  const filteredYears = allYears.filter(
    ({ year }) => year >= from && year <= to,
  );
  const yearIndex = filteredYears.findIndex(({ year }) => year === sortYear);
  const filteredDataset = dataset
    .filter(({ slug }) => visibleClubs.includes(slug))
    .map(({ data, ...props }) => ({
      ...props,
      data: data.filter(({ year }) => year >= from && year <= to),
    }))
    .sort(
      (a, b) =>
        (sortAsc ? 1 : -1) *
        ((a.data[yearIndex]?.datum?.[sortField] ?? 0) -
          (b.data[yearIndex]?.datum?.[sortField] ?? 0)),
    );

  const onHeaderClick = (year: number) => () => {
    if (sortField !== currentField) {
      setSortField(currentField);
      if (sortYear !== year) setSortYear(year);
      if (sortAsc) toggleSort();
      return;
    }

    if (sortYear === year) {
      toggleSort();
    } else {
      setSortYear(year);
      if (sortAsc) toggleSort();
    }
  };

  return (
    <styled.figure {...props}>
      <SeriesCaption mb={2} />
      <div
        className={css({
          width: "fit-content",
          maxWidth: "full",
          maxHeight: "70vh",
          overflowX: "auto",
          overflowY: "auto",
        })}
      >
        <Table.Root
          id={tableId}
          dense
          mx="auto"
          width="fit-content"
          fontFamily="table"
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
              {filteredYears.map(({ year }) => (
                <Table.Header
                  key={`thead-${year}`}
                  className={cx(
                    currentField === sortField &&
                      year === sortYear &&
                      css({ bg: "keyColor.primary" }),
                  )}
                  scope="col"
                >
                  <button
                    className={cx(
                      css({
                        textWrap: "balance",
                        width: "full",
                        height: "full",
                      }),
                      css({ cursor: "pointer" }),
                      currentField !== sortField || year !== sortYear
                        ? css({
                            color: {
                              _hover: "keyColor.primary",
                              _active: "keyColor.primary.100",
                            },
                          })
                        : css({ color: "white" }),
                    )}
                    onClick={onHeaderClick(year)}
                  >
                    {year}
                  </button>
                </Table.Header>
              ))}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {filteredDataset.map(({ slug, short_name, data }) => (
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
                {data.map(({ year, datum }) => (
                  <Table.Cell
                    key={`${slug}-${year}`}
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
    </styled.figure>
  );
}
