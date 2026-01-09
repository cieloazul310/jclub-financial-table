import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AdScript } from "@/components/ads/script";
import { notoSansJp, notoSansMono } from "@/styles/fonts";
import { title, description } from "@/data/site-metadata";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title,
  description,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <body className={`${notoSansJp.variable} ${notoSansMono.variable}`}>
        {children}
        <AdScript />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
