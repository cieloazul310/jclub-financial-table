import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site-metadata";

export const dynamic = "force-static";
export const revalidate = false;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jクラブ経営情報ポータル",
    short_name: "Jクラブ経営情報",
    start_url: new URL(siteUrl).pathname,
    background_color: "#ffffff",
    theme_color: "#0017c1",
    display: "minimal-ui",
    icons: [
      {
        src: "/jclub-financial-table/icon.png",
        sizes: "360x360",
        type: "image/png",
      },
    ],
  };
}
