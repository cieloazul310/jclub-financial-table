import { post } from "@/content";

export async function getAllPostYears() {
  const allPosts = await post.getAll();

  return Array.from(
    new Set(allPosts.map(({ frontmatter }) => frontmatter.date.getFullYear())),
  ).sort((a, b) => b - a);
}
