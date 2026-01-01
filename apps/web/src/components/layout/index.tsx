import type { PropsWithChildren, ReactNode } from "react";
import { layout, type LayoutVariantProps } from "styled-system/recipes";
import { Header } from "./header";
import { SidebarTitle } from "./sidebar-title";
import { Menu } from "./menu";
import { Footer } from "./footer";

export function Layout({
  children,
  breakpoint,
  headerAlways,
  contentWidth,
  headerContent = <Header />,
  sidebarContent = (
    <>
      <SidebarTitle />
      <Menu />
    </>
  ),
}: PropsWithChildren<{
  headerContent?: ReactNode;
  sidebarContent?: ReactNode;
}> &
  LayoutVariantProps) {
  const { root, header, grid, sidebar, main, content, footer } = layout({
    breakpoint,
    headerAlways,
    contentWidth,
  });
  return (
    <div className={root}>
      <header className={header}>{headerContent}</header>
      <div className={grid}>
        <header className={sidebar}>{sidebarContent}</header>
        <main className={main}>
          <div className={content}>{children}</div>
        </main>
        <footer className={footer}>
          <Footer />
        </footer>
      </div>
    </div>
  );
}
