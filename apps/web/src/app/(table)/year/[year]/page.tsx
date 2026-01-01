import type { Metadata } from "next";
import { getAllYears } from "@cieloazul310/jclub-financial";
import { getExtendedDataByYear } from "@cieloazul310/jclub-financial/data";
import { css } from "styled-system/css";
import { container } from "styled-system/patterns";
import { Layout } from "@/components/layout";
import { Figure } from "@/components/figure";
import { Heading2 } from "@/components/article";

export function generateStaticParams() {
  const years = getAllYears();
  return years.map(({ year }) => ({ year: year.toString() }));
}

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;

  return {
    title: `${year}年度の経営情報`,
    description: `${year}年度の経営情報`,
  };
}

export default async function Page({ params }: Props) {
  const { year } = await params;
  const data = await getExtendedDataByYear(parseInt(year, 10));

  return (
    <Layout
      slug={["year", year]}
      breakpoint="2xl"
      headerAlways
      contentWidth="full"
    >
      <Figure data={data} mode="year" />
      <article className={container({ maxWidth: "common-main-width", mt: 12 })}>
        <Heading2>{year}年度の経営情報</Heading2>
        <div className={css()}>{/*<ClubSummary club={club} />*/}</div>
      </article>
    </Layout>
  );
}
