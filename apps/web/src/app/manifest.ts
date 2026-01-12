import type { MetadataRoute } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jクラブ経営情報ポータル",
    short_name: "Jクラブ経営情報",
    start_url: "/",
    background_color: "#0017c1",
    theme_color: "#0017c1",
    display: "minimal-ui",
    icons: [],
  };
}
