"use client";

/* eslint @typescript-eslint/no-explicit-any: "off" */
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { css } from "styled-system/css";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdInSectionDividerWrapper({
  children,
}: React.PropsWithChildren) {
  return (
    <div className={css({ px: 1, py: 2, bg: "solid-gray.bg" })}>{children}</div>
  );
}

function AdScript() {
  return <script></script>;
}

export function AdInArticle() {
  const pathname = usePathname();
  useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);
  return (
    <div className={css({ py: 2, overflow: "hidden" })}>
      <span
        className={css({
          display: "block",
          textStyle: "oln-14N-100",
          color: "solid-gray.536",
        })}
      >
        [Advertisement]
      </span>
      {typeof window === "object" && (
        <ins
          className="adsbygoogle"
          key={pathname}
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-7323207940463794"
          data-ad-slot="9174058264"
        />
      )}
    </div>
  );
}

function Ad({ slot }: { slot: string }) {
  const pathname = usePathname();
  useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname, slot]);

  return (
    <div className={css({ overflow: "hidden" })}>
      <span
        className={css({
          display: "block",
          textStyle: "oln-14N-100",
          color: "solid-gray.536",
        })}
      >
        [Advertisement]
      </span>
      {typeof window === "object" && (
        <ins
          key={pathname}
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-client="ca-pub-7323207940463794"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}

export function AdOne() {
  return <Ad slot="6963353890" />;
}

export function AdTwo() {
  return <Ad slot="5693068398" />;
}

export function AdInSectionDividerOne() {
  return (
    <AdInSectionDividerWrapper>
      <AdOne />
    </AdInSectionDividerWrapper>
  );
}

export function AdInSectionDividerTwo() {
  return (
    <AdInSectionDividerWrapper>
      <AdTwo />
    </AdInSectionDividerWrapper>
  );
}

export function AdInFooter() {
  return <Ad slot="3332658358" />;
}
