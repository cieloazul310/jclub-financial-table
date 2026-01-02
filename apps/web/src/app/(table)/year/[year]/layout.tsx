import type { PropsWithChildren } from "react";
import NextLink from "next/link";
import { HomeIcon } from "lucide-react";
import { css } from "styled-system/css";
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
  const pathname = `/year/${year}`;
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
      drawerContent={<Menu pathname={pathname} />}
    />
  );
  const sidebarContent = (
    <>
      <SidebarTitle />
      <Menu pathname={pathname} />
    </>
  );

  return (
    <BaseLayout
      headerContent={headerContent}
      sidebarContent={sidebarContent}
      breakpoint="2xl"
      headerAlways
      contentWidth="full"
    >
      {children}
    </BaseLayout>
  );
}
