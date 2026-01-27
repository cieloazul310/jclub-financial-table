import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site-metadata";
import { getAllDocs } from "@/utils/with-cache";

export const dynamic = "force-static";
export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allDocs = await getAllDocs();

  return allDocs.map(({ slug, frontmatter }) => ({
    url: `${siteUrl}/docs/${slug.join("/")}/`,
    lastModified: frontmatter.lastmod,
    changeFrequency: "hourly",
    priority: 0.6,
  }));
}
