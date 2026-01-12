import type { MetadataRoute } from "next";
import { getAllClubs } from "@cieloazul310/jclub-financial";
import { siteUrl } from "@/data/site-metadata";

export const dynamic = "force-static";
export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getAllClubs().map(({ id }) => ({
    url: `${siteUrl}/club/${id}/posts`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.1,
  }));
}
