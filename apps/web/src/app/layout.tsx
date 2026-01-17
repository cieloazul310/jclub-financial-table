import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AdScript } from "@/components/ads/script";
import { notoSansJp, notoSansMono } from "@/styles/fonts";
import { title, description, siteUrl } from "@/data/site-metadata";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: `%s - ${title}`,
    default: title, // a default is required when creating a template
  },
  description,
  authors: [{ name: "cieloazul310", url: "https://cieloazul310.github.io" }],
  metadataBase: new URL(siteUrl),
  openGraph: {
    images: "/ogp.png",
    title: {
      template: `%s - ${title}`,
      default: title,
    },
    description,
    url: siteUrl,
    siteName: title,
  },
  twitter: {
    card: "summary",
    title: {
      template: `%s - ${title}`,
      default: title,
    },
    description,
    images: [`${siteUrl}/ogp.png`], // Must be an absolute URL
  },
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
