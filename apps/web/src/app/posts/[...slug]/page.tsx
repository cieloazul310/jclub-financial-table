import type { Metadata } from "next";
import NextLink from "next/link";
import remarkGfm from "remark-gfm";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { css } from "styled-system/css";
import { Button } from "@/components/ui/button";
import { BaseLayout } from "@/components/layout/base";
import { PageHeader } from "@/components/page-header";
import { useMDXComponents } from "@/mdx-components";
import { post } from "@/content";
import { createDate } from "@/utils/datestring";

export async function generateStaticParams() {
  const allPost = await post.getAll();
  return allPost;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const postMetadata = await post.get(slug);
  if (!postMetadata) return null;
  const { frontmatter } = postMetadata;

  return {
    title: frontmatter.title,
  } satisfies Metadata;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const components = useMDXComponents();
  const mdx = await post.useMdx(slug, {
    components,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
  if (!mdx) return null;
  const { content, frontmatter, context } = mdx;
  const { title, date, lastmod } = frontmatter;
  const { older, newer } = context;
  const dateString = createDate(date);
  const isModified = date.getTime() !== lastmod.getTime();
  const lastmodString = createDate(lastmod);

  return (
    <BaseLayout>
      <article>
        <PageHeader title={title}>
          <span
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: 1,
            })}
          >
            <time dateTime={dateString.datetime}>{dateString.datestring}</time>
            {isModified && (
              <span
                className={css({
                  textStyle: "oln-16N-100",
                  color: "solid-gray.536",
                })}
              >
                最終更新日:
                <time dateTime={lastmodString.datetime}>
                  {lastmodString.datestring}
                </time>
              </span>
            )}
          </span>
        </PageHeader>
        <section>{content}</section>
      </article>
      <nav
        className={css({
          display: "grid",
          gridTemplateColumns: { base: "1fr", sm: "repeat(2, 1fr)" },
          gap: { base: 2, sm: 4 },
          mt: 8,
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "start",
          })}
        >
          {older && (
            <Button
              size="lg"
              variant="outline"
              width="full"
              justifyContent="start"
              alignItems="center"
              textAlign="left"
              asChild
            >
              <NextLink href={older.href}>
                <ChevronLeft />
                {older.frontmatter.title}
              </NextLink>
            </Button>
          )}
        </div>
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "end",
          })}
        >
          {newer && (
            <Button
              size="lg"
              variant="outline"
              width="full"
              justifyContent="end"
              alignItems="center"
              textAlign="left"
              asChild
            >
              <NextLink href={newer.href}>
                {newer.frontmatter.title}
                <ChevronRight />
              </NextLink>
            </Button>
          )}
        </div>
      </nav>
    </BaseLayout>
  );
}
