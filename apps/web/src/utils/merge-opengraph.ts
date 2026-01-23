import type { Metadata, ResolvingMetadata } from "next";
import { siteUrl, title as siteName } from "@/data/site-metadata";

export async function mergeOpenGraph(
  {
    title,
    pathname,
    ...rest
  }: Partial<Metadata["openGraph"]> & { title: string; pathname: string },
  parent: ResolvingMetadata,
): Promise<Metadata["openGraph"]> {
  const { openGraph } = await parent;

  return {
    ...openGraph,
    ...rest,
    title,
    url: `${siteUrl}${pathname}`,
    siteName,
  };
}
