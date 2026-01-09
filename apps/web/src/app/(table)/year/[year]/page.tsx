import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllYears } from "@cieloazul310/jclub-financial";
import { getExtendedDataByYear } from "@cieloazul310/jclub-financial/data";
import { css } from "styled-system/css";
import { container } from "styled-system/patterns";
import { Figure } from "@/components/figure";
import { PageLoading } from "@/components/loading";
import { YearSummary } from "@/components/year-summary";
import { PrevNextLink } from "@/components/prev-next-link";
import { SelectLink } from "@/components/select-link";
import { Heading2 } from "@/components/article";
import { AdInPage } from "@/components/ads";

function getPrevNext(currentYear: number) {
  const allYears = getAllYears();
  const index = allYears
    .sort((a, b) => a.year - b.year)
    .findIndex(({ year }) => year === currentYear);

  return {
    prev: allYears[index - 1],
    next: allYears[index + 1],
  };
}

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
  const title = `${year}年度の経営情報`;
  const { prev, next } = getPrevNext(parseInt(year, 10));

  return (
    <>
      <Suspense fallback={<PageLoading />}>
        <Figure data={data} mode="year" />
      </Suspense>
      <PrevNextLink
        leftSlot={
          prev && { href: `/year/${prev.year}`, title: `${prev.year}年度` }
        }
        rightSlot={
          next && { href: `/year/${next.year}`, title: `${next.year}年度` }
        }
        mt={12}
        px={{ base: 4, md: 8 }}
      />
      <div className={container({ maxWidth: "common-main-width", mt: 12 })}>
        <article className={css({ mb: 12 })}>
          <Heading2>{title}</Heading2>
          <YearSummary year={parseInt(year, 10)} />
        </article>
        <AdInPage mb={8} />
        <section className={css({ mb: 12 })}>
          <SelectLink />
          <PrevNextLink
            leftSlot={
              prev && { href: `/year/${prev.year}`, title: `${prev.year}年度` }
            }
            rightSlot={
              next && { href: `/year/${next.year}`, title: `${next.year}年度` }
            }
            mt={8}
          />
        </section>
      </div>
    </>
  );
}
