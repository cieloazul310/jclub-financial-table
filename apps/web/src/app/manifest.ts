import type { MetadataRoute } from "next";
import { token } from "styled-system/tokens";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jクラブ経営情報ポータル",
    short_name: "Jクラブ経営情報",
    start_url: "/",
    background_color: token("colors.keyColor.primary"),
    theme_color: token("colors.keyColor.primary"),
    display: "minimal-ui",
    icons: [],
  };
}
