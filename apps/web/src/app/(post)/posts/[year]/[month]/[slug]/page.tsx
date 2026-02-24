import { cache } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import remarkGfm from "remark-gfm";
import { css } from "styled-system/css";
import { PageHeader } from "@/components/page-header";
import { ArticleGrid } from "@/components/article-grid";
import { PrevNextLink } from "@/components/prev-next-link";
import { ClubChip } from "@/components/post/club-chip";
import { TagChip } from "@/components/post/tag-chip";
import { PostListItemBase } from "@/components/post/list-item";
import { PostFooter } from "@/components/post/footer";
import { AdInSide } from "@/components/ads";
import { docsFigures } from "@/app/docs/(post)/_components/figures";
import { useMDXComponents } from "@/mdx-components";
import { post } from "@/content";
import { parseFrontmatterDate } from "@/utils/datestring";
import { getSpecifiedClub, getClubsFromArray } from "@/utils/clubs";
import { getCurrentTag } from "@/utils/tags";
import { getAllPosts } from "@/utils/with-cache";
import { mergeOpenGraph } from "@/utils/merge-opengraph";

export async function generateStaticParams() {
  const allPost = await getAllPosts();
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

const getPost = cache(async (slug: string[]) => {
  return await post.get(slug);
});

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<Props>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { year, month, slug } = await params;
  const postMetadata = await getPost([year, month, slug]);
  if (!postMetadata) return {};
  const { frontmatter } = postMetadata;
  const { title } = frontmatter;
  const openGraph = await mergeOpenGraph(
    {
      title,
      pathname: `/${year}/${month}/${slug}/`,
    },
    parent,
  );

  return {
    title,
    openGraph,
    twitter: {
      title,
    },
  };
}

export default async function Page({ params }: { params: Promise<Props> }) {
  const { year, month, slug } = await params;
  const currentSlug = [year, month, slug];
  const currentPost = await getPost(currentSlug);

  if (!currentPost) return null;

  const { frontmatter, context } = currentPost;
  const { title, club, tag } = frontmatter;
  const { older, newer } = context;
  const { date, lastmod, isModified } = parseFrontmatterDate(frontmatter);
  const clubs = getClubsFromArray("short_name", club);
  const specifiedClub = getSpecifiedClub("short_name", club);
  const currentTag = getCurrentTag("title", tag);
  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const components = useMDXComponents(docsFigures);
  const mdx = await post.useMdx(currentSlug, {
    components,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
  if (!mdx) return null;
  const { content } = mdx;

  return (
    <>
      <article className={css({ maxWidth: "60em", mx: "auto" })}>
        <PageHeader title={title} px={{ base: 2, md: 4 }}>
          <>
            <span
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mb: 2,
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
            <span className={css({ display: "flex", gap: 2 })}>
              {specifiedClub && <ClubChip club={specifiedClub} />}
              {currentTag && <TagChip tag={currentTag} />}
            </span>
          </>
        </PageHeader>
        <ArticleGrid
          side={
            <div
              className={css({
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 8,
                pb: 4,
              })}
            >
              <PostFooter
                px={6}
                title={title}
                date={date}
                lastmod={lastmod}
                isModified={isModified}
                clubs={clubs}
                tag={currentTag}
              />
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
              <AdInSide px={4} />
            </div>
          }
        >
          <section className={css({ mb: 12 })}>{content}</section>
          <PostFooter
            mb={12}
            title={title}
            date={date}
            lastmod={lastmod}
            isModified={isModified}
            clubs={clubs}
            specifiedClub={specifiedClub}
            tag={currentTag}
          />
        </ArticleGrid>
      </article>
      <PrevNextLink
        leftSlot={{ href: newer?.href, title: newer?.frontmatter.title }}
        rightSlot={{ href: older?.href, title: older?.frontmatter.title }}
        mb={4}
      />
    </>
  );
}
