import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";
import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { SelectLink } from "@/components/select-link";
import { PostList } from "@/components/post/list";
import { PostListItem, PostListItemBase } from "@/components/post/list-item";
import { Heading2, Paragraph } from "@/components/article";
import { post } from "@/content";
import { title, description } from "@/data/site-metadata";
import { Link } from "@/components/link";

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
          <Heading2>その他</Heading2>
          <PostList>
            <PostListItemBase
              title="経営情報の見方"
              href="/"
              footerText={<p>経営情報の項目と用語の簡易な解説</p>}
            />
            <PostListItemBase
              title="項目別表示"
              href="/"
              footerText={
                <p>
                  営業収入や入場者数など特定の項目を、縦軸にクラブ、横軸に年度で表したページ
                </p>
              }
            />
            <PostListItemBase
              title="データダウンロード"
              href="/"
              footerText={
                <p>経営情報のデータをJSONやCSV形式でダウンロードできるページ</p>
              }
            />
            <PostListItemBase
              title="API（準備中）"
              href="/"
              footerText={<p>REST APIによるデータ取得が可能なページ</p>}
            />
          </PostList>
        </section>
        <section>{children}</section>
      </article>
    </Layout>
  );
}
