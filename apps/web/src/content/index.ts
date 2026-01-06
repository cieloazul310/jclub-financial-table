// src/content.index.ts
import * as path from "path";
import { z, defineMdx } from "@cieloazul310/regista";
import { docsGroupIds } from "@/data/docs";

export const post = defineMdx({
  contentPath: path.resolve(process.cwd(), "content/post"),
  basePath: "/posts",
  schema: {
    club: z.array(z.string()).nullish(),
    tag: z.string().nullish(),
  },
});
export type PostFrontmatter = z.infer<typeof post.schema>;
export type PostMetadata = z.infer<typeof post.metadataSchema>;

export const docs = defineMdx({
  contentPath: path.resolve(process.cwd(), "content/docs"),
  basePath: "/docs",
  schema: {
    group: z.enum(docsGroupIds),
    order: z.int(),
  },
  sortFunction: (a, b) =>
    docsGroupIds.indexOf(a.frontmatter.group) -
      docsGroupIds.indexOf(b.frontmatter.group) ||
    a.frontmatter.order - b.frontmatter.order,
});

export type DocsFrontmatter = z.infer<typeof docs.schema>;
export type DocsMetadata = z.infer<typeof docs.metadataSchema>;
