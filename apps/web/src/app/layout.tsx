import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { notoSansJp, notoSansMono } from "@/styles/fonts";
import { title, description } from "@/data/site-metadata";
import "@/styles/globals.css";

export const metadata = {
  title,
  description,
} satisfies Metadata;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <body className={`${notoSansJp.variable} ${notoSansMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
