import type { PropsWithChildren } from "react";
import NextLink from "next/link";
import { HomeIcon } from "lucide-react";
import { cx, css } from "styled-system/css";
import { container, cq } from "styled-system/patterns";
import { layout } from "styled-system/recipes";
import { Layout as BaseLayout } from "@/components/layout";
import { Header } from "@/components/layout/header";
import { Menu } from "@/components/layout/menu";
import { PageBottomNav } from "@/components/page-bottom-nav";
import { AdInPage } from "@/components/ads";
import Attribution from "@/mdx/attribution.mdx";
import { SeriesStoreProvider } from "@/providers/series-store-provider";

export default function Layout({ children }: PropsWithChildren) {
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
          <span>項目別表示</span>
        </span>
      }
      drawerContent={<Menu />}
    />
  );

  return (
    <BaseLayout
      headerContent={headerContent}
      classes={layout({
        breakpoint: "2xl",
        headerAlways: true,
        contentWidth: "full",
      })}
    >
      <SeriesStoreProvider>{children}</SeriesStoreProvider>
      <AdInPage my={12} mx="auto" maxWidth="common-main-width" />
      <article
        className={cx(container({ maxWidth: "common-main-width" }), cq())}
      >
        <Attribution />
      </article>
      <PageBottomNav mt={12} mx="auto" maxWidth="common-main-width" />
    </BaseLayout>
  );
}
