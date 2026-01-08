import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import {
  Tokurei2020,
  Tokurei2023,
  Tokurei2026,
} from "@/components/docs/figures/license-tokurei";
import { useMDXComponents } from "@/mdx-components";
import { post } from "@/content";

export async function generateStaticParams() {
  const allPost = await post.getAll();
  return allPost.map((post) => {
    const [year, month, slug] = post.slug;
    return { year, month, slug };
  });
}

type Props = {
  year: string;
  month: string;
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Props>;
}): Promise<Metadata> {
  const { year, month, slug } = await params;
  const currentSlug = [year, month, slug];
  const postMetadata = await post.get(currentSlug);
  if (!postMetadata) return {};
  const { frontmatter } = postMetadata;

  return {
    title: frontmatter.title,
  };
}

export default async function Page({ params }: { params: Promise<Props> }) {
  const { year, month, slug } = await params;
  const currentSlug = [year, month, slug];
  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const components = useMDXComponents({
    Tokurei2020,
    Tokurei2023,
    Tokurei2026,
  });
  const mdx = await post.useMdx(currentSlug, {
    components,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
  if (!mdx) return null;
  const { content } = mdx;

  return content;
}
