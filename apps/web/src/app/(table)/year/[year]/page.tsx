import type { Metadata } from "next";
import NextLink from "next/link";
import { HomeIcon } from "lucide-react";
import { getAllYears } from "@cieloazul310/jclub-financial";
import { getExtendedDataByYear } from "@cieloazul310/jclub-financial/data";
import { css } from "styled-system/css";
import { container } from "styled-system/patterns";
import { Layout } from "@/components/layout";
import { Header } from "@/components/layout/header";
import { Menu } from "@/components/layout/menu";
import { SidebarTitle } from "@/components/layout/sidebar-title";
import { Figure } from "@/components/figure";
import { PrevNextLink } from "@/components/prev-next-link";
import { Heading2 } from "@/components/article";

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
  const headerContent = (
    <Header
      title={
        <span
          className={css({
            display: "flex",
            alignItems: "center",
            gap: { base: 2, md: 4 },
          })}
        >
          <NextLink href="/" className={css({ mt: ".1em" })}>
            <HomeIcon />
          </NextLink>
          <span>{title}</span>
        </span>
      }
      drawerContent={<Menu slug={["year", year]} />}
    />
  );
  const sidebarContent = (
    <>
      <SidebarTitle />
      <Menu slug={["year", year]} />
    </>
  );
  const { prev, next } = getPrevNext(parseInt(year, 10));

  return (
    <Layout
      headerContent={headerContent}
      sidebarContent={sidebarContent}
      breakpoint="2xl"
      headerAlways
      contentWidth="full"
    >
      <Figure data={data} mode="year" />
      <PrevNextLink
        left={prev && { href: `/year/${prev.year}`, title: `${prev.year}年度` }}
        right={
          next && { href: `/year/${next.year}`, title: `${next.year}年度` }
        }
        mt={12}
      />
      <article className={container({ maxWidth: "common-main-width", mt: 12 })}>
        <Heading2>{title}</Heading2>
        <div className={css()}>{/*<ClubSummary club={club} />*/}</div>
      </article>
    </Layout>
  );
}
