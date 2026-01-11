import type { MetadataRoute } from "next";
import { docs } from "@/content";
import { siteUrl } from "@/data/site-metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allDocs = await docs.getAll();

  return allDocs.map(({ slug, frontmatter }) => ({
    url: `${siteUrl}/docs/${slug.join("/")}`,
    lastModified: frontmatter.lastmod,
    changeFrequency: "hourly",
    priority: 0.6,
  }));
}
