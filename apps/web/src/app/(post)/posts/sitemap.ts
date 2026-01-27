import type { MetadataRoute } from "next";
import { getAllPosts } from "@/utils/with-cache";
import { siteUrl } from "@/data/site-metadata";

export const dynamic = "force-static";
export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getAllPosts();

  return allPosts.map(({ slug, frontmatter }) => ({
    url: `${siteUrl}/posts/${slug.join("/")}/`,
    lastModified: frontmatter.lastmod,
    changeFrequency: "never",
    priority: 0.6,
  }));
}
