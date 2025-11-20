import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";
import { title } from "@/data/site-metadata";
import { MobileHeader } from "./mobile-header";
import { Menu } from "./menu";
import { Footer } from "./footer";

export function BaseLayout({
  children,
  slug,
}: PropsWithChildren<{ slug?: string[] }>) {
  return (
    <div
      className={css({
        minHeight: "screen",
        pt: { base: "{sizes.mobile-header-height}", lg: 0 },
      })}
    >
      <MobileHeader slug={slug} />
      <div
        className={css({
          display: "grid",
          gridTemplateAreas: `
            "side-nav main"
            "side-nav footer"
          `,
          gridTemplateColumns: {
            base: "0 1fr",
            lg: "{sizes.sidebar-width} minmax(0, 1fr)",
          },
          gridTemplateRows: "1fr auto",
          minHeight: "calc(100vh - {sizes.mobile-header-height})",
        })}
      >
        <header
          className={css({
            gridArea: "side-nav",
            display: { base: "none", lg: "flex" },
            flexDirection: "column",
            pt: 10,
            position: "fixed",
            top: 0,
            borderRightWidth: { base: 0, lg: "1px" },
            borderRightColor: "solid-gray.420",
            overflowY: "auto",
            overscrollBehaviorY: "contain",
            gap: 10,
            height: "full",
            width: "sidebar-width",
            pb: 16,
          })}
        >
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
        <main
          className={css({
            gridArea: "main",
            minWidth: "0",
            pt: { base: 0, lg: 10 },
          })}
        >
          <div
            className={css({
              maxWidth: "common-main-width",
              mx: "auto",
              px: { base: 4, md: 8 },
              textStyle: { base: "std-17N-170", md: "std-18N-160" },
              boxSizing: "content-box",
            })}
          >
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
