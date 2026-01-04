import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";
import { Layout } from "@/components/layout";
import { Link } from "@/components/link";
import { PageHeader } from "@/components/page-header";
import { SelectLink } from "@/components/select-link";
import { PostList } from "@/components/post/list";
import { PostListItem, PostListItemBase } from "@/components/post/list-item";
import { Heading2, Paragraph } from "@/components/article";
import { post } from "@/content";
import { title, description } from "@/data/site-metadata";
import { contentMenu } from "@/data/menu";

export default async function Home({ children }: PropsWithChildren) {
  const allPosts = await post.getAll();

  return (
    <Layout>
      <article>
        <PageHeader title={title}>{description}</PageHeader>
        <section className={css({ mb: 12 })}>
          <Heading2>経営情報</Heading2>
          <Paragraph>
            2005年度から2024年度までのJクラブの経営情報をクラブ別、年度別に表示
          </Paragraph>
          <SelectLink />
        </section>
        <section className={css({ mb: 12 })}>
          <Heading2>記事</Heading2>
          <Paragraph>
            クラブ公式発表や報道などを基にしたJクラブの経営に関する記事
          </Paragraph>
          <PostList mb={8}>
            {allPosts
              .sort(
                (a, b) =>
                  b.frontmatter.date.getTime() - a.frontmatter.date.getTime(),
              )
              .slice(0, 8)
              .map((post) => (
                <PostListItem key={post.href} post={post} />
              ))}
          </PostList>
          <div className={css({ textAlign: "right" })}>
            <Link href="/posts">記事一覧</Link>
          </div>
        </section>
        <section className={css({ mb: 12 })}>
          <Heading2>その他コンテンツ</Heading2>
          <PostList>
            {contentMenu.map(({ title, href, description }) => (
              <PostListItemBase
                key={href}
                title={title}
                href={href}
                footerText={description && <p>{description}</p>}
              />
            ))}
          </PostList>
        </section>
        <section>{children}</section>
      </article>
    </Layout>
  );
}
