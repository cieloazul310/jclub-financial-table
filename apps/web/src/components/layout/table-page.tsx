import type { PropsWithChildren } from "react";
import NextLink from "next/link";
import { HomeIcon } from "lucide-react";
import { css } from "styled-system/css";
import { layout } from "styled-system/recipes";
import { Layout as BaseLayout } from "@/components/layout";
import { Header } from "@/components/layout/header";
import { Menu } from "@/components/layout/menu";
import { TabList } from "@/components/figure/tab-list";
import { PageBottomNav } from "@/components/page-bottom-nav";
import { SidebarTitle } from "@/components/layout/sidebar-title";

type TablePageLayoutProps = PropsWithChildren<{
  title: string;
  currentPathname: string;
  homeHref?: string;
}>;

export function TablePageLayout({
  children,
  title,
  currentPathname,
  homeHref = "/",
}: TablePageLayoutProps) {
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
          <NextLink href={homeHref} className={css({ mt: ".1em" })}>
            <HomeIcon />
          </NextLink>
          <span>{title}</span>
        </span>
      }
      drawerContent={<Menu currentPathname={currentPathname} />}
    />
  );
  const sidebarContent = (
    <>
      <SidebarTitle />
      <Menu currentPathname={currentPathname} />
    </>
  );

  return (
    <BaseLayout
      classes={layout({
        breakpoint: "2xl",
        headerAlways: true,
        contentWidth: "full",
        disableContentGutter: true,
      })}
      headerContent={headerContent}
      sidebarContent={sidebarContent}
    >
      <TabList />
      {children}
      <PageBottomNav
        mx="auto"
        px={{ base: 4, md: 6, lg: 8 }}
        maxWidth="common-main-width"
      />
    </BaseLayout>
  );
}
