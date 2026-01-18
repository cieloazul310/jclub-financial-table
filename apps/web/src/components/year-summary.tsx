import { Fragment } from "react";
import { getLabel, getAllYears } from "@cieloazul310/jclub-financial";
import { getStatsByYear } from "@cieloazul310/jclub-financial/statistics";
import { css } from "styled-system/css";
import { styled, type HTMLStyledProps } from "styled-system/jsx";
import { Table } from "@/components/ui/table";

export async function YearSummary({
  year,
  position = "relative",
  maxWidth = "full",
  overflowX = "auto",
  ...rest
}: { year: number } & HTMLStyledProps<"div">) {
  const props = { position, maxWidth, overflowX, ...rest };
  const fields = [
    "revenue",
    "expenses",
    "net_assets",
    "team_wages",
    "ticket_revenue",
    "average_attendance",
    "unit_price",
  ] as const;
  const allYears = getAllYears();
  const yearInfo = allYears.find((info) => info.year === year);
  const categories = yearInfo?.categories;
  const stats = await getStatsByYear(year, [...fields]);

  return (
    <styled.div {...props}>
      <Table.Root dense>
        <colgroup>
          <col className={css({ minWidth: "4em" })} />
          <col className={css({ minWidth: "5em" })} />
        </colgroup>
        <Table.Head>
          <Table.Row>
            <Table.Header scope="column">カテゴリ</Table.Header>
            <Table.Header scope="column">値</Table.Header>
            {fields.map((field) => (
              <Table.Header key={field}>{getLabel(field)}</Table.Header>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {categories?.map((category) => {
            return (
              <Fragment key={category}>
                {(["max", "min", "average"] as const).map((key, index) => (
                  <Table.Row key={`${category}-${key}`}>
                    {index === 0 && (
                      <Table.Header scope="row" rowSpan={3}>
                        {category}
                      </Table.Header>
                    )}
                    <Table.Header>
                      {key === "max" ? "最大" : key === "min" ? "最小" : "平均"}
                    </Table.Header>
                    {fields.map((field) => (
                      <Table.Cell
                        key={`${category}-${key}-${field}`}
                        align="right"
                      >
                        {stats?.[category]?.[field]?.[key]}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Fragment>
            );
          })}
        </Table.Body>
      </Table.Root>
    </styled.div>
  );
}
