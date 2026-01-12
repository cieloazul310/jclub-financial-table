import type { MetadataRoute } from "next";
import { post } from "@/content";
import { siteUrl } from "@/data/site-metadata";

export const dynamic = "force-static";
export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await post.getAll();

  return allPosts.map(({ slug, frontmatter }) => ({
    url: `${siteUrl}/posts/${slug.join("/")}`,
    lastModified: frontmatter.lastmod,
    changeFrequency: "never",
    priority: 0.6,
  }));
}
