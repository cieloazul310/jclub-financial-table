import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import { useMDXComponents } from "@/mdx-components";
import { docsFigures } from "@/components/docs/figures";
import { docs } from "@/content";

export async function generateStaticParams() {
  const allDocs = await docs.getAll();

  return allDocs;
}

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await docs.get(slug);
  if (!docs) return {};

  return { title: doc?.frontmatter.title };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const components = useMDXComponents(docsFigures);

  const mdx = await docs.useMdx(slug, {
    components,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
  if (!mdx) return null;

  const { content } = mdx;
  return content;
}
