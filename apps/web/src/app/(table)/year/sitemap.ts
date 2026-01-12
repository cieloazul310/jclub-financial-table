import type { MetadataRoute } from "next";
import { getAllYears } from "@cieloazul310/jclub-financial";
import { siteUrl, lastUpdate } from "@/data/site-metadata";

export const dynamic = "force-static";
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const years = getAllYears();
  return years.map(({ year }) => ({
    url: `${siteUrl}/year/${year}`,
    lastModified: lastUpdate,
    changeFrequency: "yearly",
    priority: 1,
  }));
}
