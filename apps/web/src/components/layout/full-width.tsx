import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";
import { MobileHeader } from "./mobile-header";
import { Footer } from "./footer";

export function FullWidthLayout({
  children,
  slug,
  title,
}: PropsWithChildren<{ slug?: string[]; title: string }>) {
  return (
    <div
      className={css({
        minHeight: "screen",
        pt: "{sizes.mobile-header-height}",
      })}
    >
      <MobileHeader slug={slug} title={title} alwaysOnDisplay />
      <div
        className={css({
          display: "grid",
          gridTemplateAreas: `
            "main"
            "footer"
          `,
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr auto",
          minHeight: "calc(100vh - {sizes.mobile-header-height})",
        })}
      >
        <main
          className={css({
            gridArea: "main",
            minWidth: "0",
          })}
        >
          <div
            className={css({
              maxWidth: "90em",
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
