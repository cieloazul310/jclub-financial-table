import { cache } from "react";
import { post, docs } from "@/content";

export const getAllPosts = cache(async () => {
  return [...(await post.getAll())].reverse();
});

export const getAllDocs = cache(async () => {
  return await docs.getAll();
});
