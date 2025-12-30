import { getAllYears } from "@cieloazul310/jclub-financial";
import { getExtendedDataByYear } from "@cieloazul310/jclub-financial/data";
import { css } from "styled-system/css";
import { container } from "styled-system/patterns";
import { FullWidthLayout } from "@/components/layout/full-width";
import { Figure } from "@/components/figure";
import { Heading2 } from "@/components/article";

export function generateStaticParams() {
  const years = getAllYears();
  return years.map(({ year }) => ({ year: year.toString() }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const data = await getExtendedDataByYear(parseInt(year, 10));

  return (
    <FullWidthLayout slug={["year", year]} title={`${year}年度`}>
      <Figure data={data} mode="year" />
      <article className={container({ maxWidth: "common-main-width", mt: 12 })}>
        <Heading2>{year}年度の経営情報</Heading2>
        <div className={css()}>{/*<ClubSummary club={club} />*/}</div>
      </article>
    </FullWidthLayout>
  );
}
