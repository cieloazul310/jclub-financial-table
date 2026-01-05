import type { PropsWithChildren } from "react";
import NextLink from "next/link";
import { HomeIcon } from "lucide-react";
import { css } from "styled-system/css";
import { layout } from "styled-system/recipes";
import { Layout as BaseLayout } from "@/components/layout";
import { Header } from "@/components/layout/header";
import { Menu } from "@/components/layout/menu";
import { SidebarTitle } from "@/components/layout/sidebar-title";

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ year: string }> }>) {
  const { year } = await params;
  const title = `${year}年度の経営情報`;
  const currentPathname = `/year/${year}`;
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
      })}
      headerContent={headerContent}
      sidebarContent={sidebarContent}
    >
      {children}
    </BaseLayout>
  );
}
