import { post } from "@/content";

export async function getAllPostYears() {
  const allPosts = await post.getAll();
  const allYears = Array.from(
    new Set(allPosts.map(({ frontmatter }) => frontmatter.date.getFullYear())),
  ).sort((a, b) => a - b);
  const first = allYears.at(0) ?? 0;
  const last = allYears.at(allYears.length - 1) ?? 0;

  return Array.from(
    { length: last - first + 1 },
    (_, index) => first + index,
  ).sort((a, b) => b - a);
}
