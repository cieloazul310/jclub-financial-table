import type { PropsWithChildren, ReactNode } from "react";
import { layout, type LayoutSlot } from "styled-system/recipes";
import { Header } from "./header";
import { SidebarTitle } from "./sidebar-title";
import { Menu } from "./menu";
import { Footer } from "./footer";

export function Layout({
  children,
  classes = layout(),
  headerContent = <Header />,
  sidebarContent = (
    <>
      <SidebarTitle />
      <Menu />
    </>
  ),
}: PropsWithChildren<{
  classes?: Partial<Record<LayoutSlot, string>>;
  headerContent?: ReactNode;
  sidebarContent?: ReactNode;
}>) {
  return (
    <div className={classes?.root}>
      <header className={classes?.header}>{headerContent}</header>
      <div className={classes?.grid}>
        <header className={classes?.sidebar}>{sidebarContent}</header>
        <main className={classes?.main}>
          <div className={classes?.content}>{children}</div>
        </main>
        <footer className={classes?.footer}>
          <Footer />
        </footer>
      </div>
    </div>
  );
}
