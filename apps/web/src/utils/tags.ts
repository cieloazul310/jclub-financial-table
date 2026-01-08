import { tags } from "@/data/tags";
import type { PostTag } from "./types";

export function getCurrentTag<T extends keyof PostTag>(
  key: T,
  value: PostTag[T] | undefined | null,
) {
  const currentTag = tags.find((tag) => tag[key] === value);
  return currentTag;
}
