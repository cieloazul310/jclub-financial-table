"use client";

/* eslint @typescript-eslint/no-explicit-any: "off" */
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { css } from "styled-system/css";
import { styled, type HTMLStyledProps } from "styled-system/jsx";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdInArticle({
  maxWidth = "full",
  overflow = "hidden",
  ...rest
}: Omit<HTMLStyledProps<"div">, "children">) {
  const pathname = usePathname();
  useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);
  const props = { maxWidth, overflow, ...rest };

  return (
    <styled.div {...props}>
      <span
        className={css({
          display: "block",
          textStyle: "oln-14N-100",
          color: "solid-gray.536",
        })}
      >
        [Advertisement]
      </span>
      <ins
        className="adsbygoogle"
        key={pathname}
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={process.env.NEXT_PUBLIC_PUBLISHER_ID}
        data-ad-slot="9174058264"
      />
    </styled.div>
  );
}

export function Ad({
  slot = "6963353890",
  maxWidth = "full",
  overflow = "hidden",
  ...rest
}: { slot?: string } & Omit<HTMLStyledProps<"div">, "children">) {
  const pathname = usePathname();
  useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);
  const props = { overflow, maxWidth, ...rest };
  return (
    <styled.div {...props}>
      <span
        className={css({
          display: "block",
          textStyle: "oln-14N-100",
          color: "solid-gray.536",
          mb: 1,
        })}
      >
        [Advertisement]
      </span>
      <ins
        key={pathname}
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client={process.env.PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </styled.div>
  );
}
