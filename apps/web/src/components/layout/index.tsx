import type { PropsWithChildren, ReactNode } from "react";
import { css } from "styled-system/css";
import { layout, type LayoutVariantProps } from "styled-system/recipes";
import { title } from "@/data/site-metadata";
import { MobileHeader } from "./mobile-header";
import { Menu } from "./menu";
import { Footer } from "./footer";

export function Layout({
  children,
  slug,
  breakpoint,
  headerAlways,
  contentWidth,
  headerContent,
  sidebarContent,
}: PropsWithChildren<{
  slug?: string[];
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
      <header className={header}>
        <MobileHeader slug={slug} />
      </header>
      <div className={grid}>
        <header className={sidebar}>
          <a
            href="/"
            className={css({
              alignSelf: "center",
              width: 48,
              color: "inherit",
              textStyle: "std-20B-150",
              my: 2,
            })}
          >
            {title}
          </a>
          <Menu slug={slug} />
        </header>
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
