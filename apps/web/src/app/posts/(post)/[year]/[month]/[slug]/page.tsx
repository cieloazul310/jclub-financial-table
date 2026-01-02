import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import { css } from "styled-system/css";
import { PageHeader } from "@/components/page-header";
import { PrevNextLink } from "@/components/prev-next-link";
import { PostListItemBase } from "@/components/post/list-item";
import { useMDXComponents } from "@/mdx-components";
import { post } from "@/content";
import { parseFrontmatterDate } from "@/utils/datestring";

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
  const joinedSlug = [year, month, slug];
  const postMetadata = await post.get(joinedSlug);
  if (!postMetadata) return {};
  const { frontmatter } = postMetadata;

  return {
    title: frontmatter.title,
  };
}

export default async function Page({ params }: { params: Promise<Props> }) {
  const { year, month, slug } = await params;
  const joinedSlug = [year, month, slug];
  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const components = useMDXComponents();
  const mdx = await post.useMdx(joinedSlug, {
    components,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
  if (!mdx) return null;
  const { content, frontmatter, context } = mdx;
  const { title } = frontmatter;
  const { older, newer } = context;
  const { date, lastmod, isModified } = parseFrontmatterDate(frontmatter);

  return (
    <>
      <article>
        <PageHeader title={title}>
          <span
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: 1,
            })}
          >
            <time dateTime={date.datetime}>{date.datestring}</time>
            {isModified && (
              <span
                className={css({
                  textStyle: "oln-16N-100",
                  color: "solid-gray.536",
                })}
              >
                最終更新日:
                <time dateTime={lastmod.datetime}>{lastmod.datestring}</time>
              </span>
            )}
          </span>
        </PageHeader>
        <div
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", lg: "1fr auto" },
          })}
        >
          <section className={css({ px: { base: 2, sm: 4 } })}>
            {content}
          </section>
          <aside
            className={css({
              display: { base: "none", lg: "block" },
              position: "sticky",
              top: 0,
              maxWidth: "sidebar-width",
              maxHeight: "100vh",
            })}
          >
            <nav
              className={css({ display: "grid", gridTemplateColumns: "1fr" })}
            >
              {newer && (
                <PostListItemBase
                  borderWidth="0"
                  title={newer.frontmatter.title}
                  href={newer.href}
                  headerText={<span>次の記事</span>}
                />
              )}
              {older && (
                <PostListItemBase
                  borderWidth="0"
                  title={older.frontmatter.title}
                  href={older.href}
                  headerText={<span>前の記事</span>}
                />
              )}
            </nav>
          </aside>
        </div>
      </article>
      <PrevNextLink
        leftSlot={{ href: newer?.href, title: newer?.frontmatter.title }}
        rightSlot={{ href: older?.href, title: older?.frontmatter.title }}
        mt={8}
      />
    </>
  );
}
