import type { MetadataRoute } from "next";
import { getAllClubs } from "@cieloazul310/jclub-financial";
import { siteUrl, lastUpdate } from "@/data/site-metadata";

export const dynamic = "force-static";
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const allClubs = getAllClubs();
  const tableSitemap = allClubs.map(({ id }) => ({
    url: `${siteUrl}/club/${id}`,
    lastModified: lastUpdate,
    changeFrequency: "yearly",
    priority: 1,
  })) satisfies MetadataRoute.Sitemap;

  const postSitemap = allClubs.map(({ id }) => ({
    url: `${siteUrl}/club/${id}/posts`,
    lastModified: lastUpdate,
    changeFrequency: "monthly",
    priority: 0.1,
  })) satisfies MetadataRoute.Sitemap;

  return [...tableSitemap, ...postSitemap];
}
