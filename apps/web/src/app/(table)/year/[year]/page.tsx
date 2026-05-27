import { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { getAllYears } from "@cieloazul310/jclub-financial";
import { getExtendedDataByYear } from "@cieloazul310/jclub-financial/data";
import { css } from "styled-system/css";
import { container } from "styled-system/patterns";
import { PrevNextLink } from "@/components/prev-next-link";
import { SelectLink } from "@/components/select-link";
import { Heading2 } from "@/components/article";
import { Loading } from "@/components/loading";
import { AdInPage } from "@/components/ads";
import { Link } from "@/components/link";
import { Alert } from "@/components/shortcodes/alert";
import { mergeOpenGraph } from "@/utils/merge-opengraph";
import { Figure } from "../../_components/figure";
import { YearSummary } from "../../_components/summary/year";

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

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { year } = await params;
  const title = `${year}年度の経営情報`;
  const description = `${year}年度のJクラブ経営情報を損益計算書、貸借対照表、営業収入、営業費用、入場者数に分類して表示`;
  const openGraph = await mergeOpenGraph(
    { title, description, pathname: `/year/${year}/` },
    parent,
  );

  return {
    title,
    description,
    openGraph,
    twitter: {
      title,
      description,
    },
  };
}

export default async function Page({ params }: Props) {
  const { year } = await params;
  const data = await getExtendedDataByYear(parseInt(year, 10));
  const title = `${year}年度の経営情報`;
  const { prev, next } = getPrevNext(parseInt(year, 10));

  return (
    <>
      <Suspense fallback={<Loading />}>
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
          {year !== "2025" ? (
            <YearSummary year={parseInt(year, 10)} />
          ) : (
            <Alert title="2025年度の経営情報は暫定版">
              2025年度の経営情報は
              <Link href="https://aboutj.jleague.jp/corporate/assets/pdf/club_info/club_doc-2025.pdf">
                『2025年度クラブ経営情報開示資料（先行発表版）』
              </Link>
              に記載されている売上高、スポンサー収入、入場料収入の3項目に加え、クラブ独自の決算発表や官報掲載の決算公告を基にしています。
              <br />
              2026年7月公表予定の「追加発表」や10月公表予定の「本発表」で決算一覧が公開され次第、データを更新する予定です。
            </Alert>
          )}
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
