import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import NoSsr from '@mui/material/NoSsr';
import { Jumbotron, Section, Article, PanelLink, Alert, AppLink, mdxComponents } from '@cieloazul310/gatsby-theme-aoi';
import { PageNavigationContainer, PageNavigationItem } from '@cieloazul310/gatsby-theme-aoi-blog-components';
import Seo from '../components/Seo';
import PostList from '../components/PostList';
import shortcodes from '../components/Shortcodes';
import { AdInSectionDividerOne } from '../components/Ads';
import Layout from '../layout';
import type { Club, MdxPost } from '../../types';

type PostTemplatePageData = {
  mdxPost: Pick<MdxPost, 'body' | 'title' | 'lastmod' | 'date' | 'excerpt' | 'draft'> & {
    lastmodDate: string;
    club: Pick<Club, 'short_name' | 'name' | 'href'>[] | null;
  };
  previous: { to: string; title: string } | null;
  next: { to: string; title: string } | null;
  allMdxPost: {
    nodes: Pick<MdxPost, 'title' | 'date' | 'slug'>[];
  };
};
type PostTemplatePageContext = {
  slug: string;
  previous: string | null;
  next: string | null;
  club: string[] | null;
  specifiedClub: string | null;
};

function PostTemplate({ data, children }: PageProps<PostTemplatePageData, PostTemplatePageContext>) {
  const { mdxPost, previous, next, allMdxPost } = data;
  const { title, date, lastmod, lastmodDate, club, draft } = mdxPost;
  const daysFromLastmod = React.useMemo(() => {
    const today = new Date();
    return Math.floor((today.valueOf() - new Date(lastmodDate).valueOf()) / (1000 * 60 * 60 * 24));
  }, [lastmodDate]);
  const specifiedClub = club && club.length === 1 ? club[0] : null;

  return (
    <Layout title={title} headerTitle="記事" previous={previous} next={next}>
      <Jumbotron maxWidth="md" component="header">
        <Typography>{date}</Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
      </Jumbotron>
      <Section component="main">
        <Article maxWidth="md">
          <NoSsr>
            {draft ? <Alert severity="warning">この記事は下書きです。</Alert> : null}
            {daysFromLastmod > 183 ? <Alert severity="warning">この記事は最終更新日から6ヶ月以上経過しています。</Alert> : null}
          </NoSsr>
          <MDXProvider components={{ ...mdxComponents, ...shortcodes }}>{children}</MDXProvider>
        </Article>
      </Section>
      <AdInSectionDividerOne />
      <Section component="footer">
        <Article maxWidth="md">
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography>日付: {date}</Typography>
          <Typography>最終更新日: {lastmod}</Typography>
          {club ? (
            <Typography>
              クラブ:{' '}
              {club.map(({ name, short_name, href }) => (
                <AppLink key={name} href={`${href}posts/`} mr={1} color="inherit">
                  {short_name}
                </AppLink>
              ))}
            </Typography>
          ) : null}
        </Article>
      </Section>
      {specifiedClub ? (
        <>
          <Section>
            <Article maxWidth="md">
              <PostList
                posts={allMdxPost.nodes}
                title={`${specifiedClub.name}の最新の記事`}
                more={{ to: `${specifiedClub.href}posts/`, title: `${specifiedClub.name}の記事一覧` }}
              />
            </Article>
          </Section>
          <Section>
            <Container maxWidth="md" disableGutters>
              <PanelLink href={specifiedClub.href} disableBorder disableMargin>
                {specifiedClub.name}の経営情報一覧
              </PanelLink>
            </Container>
          </Section>
        </>
      ) : null}
      <Section>
        <PageNavigationContainer>
          <PageNavigationItem href={previous?.to ?? '#'} disabled={!previous}>
            <Typography variant="body2">{previous?.title}</Typography>
          </PageNavigationItem>
          <PageNavigationItem href={next?.to ?? '#'} disabled={!next} right>
            <Typography variant="body2">{next?.title}</Typography>
          </PageNavigationItem>
        </PageNavigationContainer>
      </Section>
      <Section>
        <Container maxWidth="md" disableGutters>
          <PanelLink href="/posts/" disableBorder disableMargin>
            記事一覧へ
          </PanelLink>
        </Container>
      </Section>
    </Layout>
  );
}

export default PostTemplate;

export function Head({ data }: HeadProps<PostTemplatePageData, PostTemplatePageContext>) {
  const { mdxPost } = data;
  const { title } = mdxPost;
  return <Seo title={title} />;
}

export const query = graphql`
  query Post($slug: String!, $previous: String, $next: String, $specifiedClub: String, $draft: Boolean) {
    mdxPost(slug: { eq: $slug }) {
      date(formatString: "YYYY年MM月DD日")
      title
      lastmod(formatString: "YYYY年MM月DD日")
      lastmodDate: lastmod(formatString: "YYYY-MM-DD")
      body
      draft
      excerpt
      club {
        short_name
        href
        name
      }
    }
    previous: mdxPost(slug: { eq: $previous }) {
      to: slug
      title
    }
    next: mdxPost(slug: { eq: $next }) {
      to: slug
      title
    }
    allMdxPost(
      filter: { club: { elemMatch: { slug: { eq: $specifiedClub } } }, draft: { ne: $draft } }
      sort: [{ date: DESC }, { lastmod: DESC }, { slug: DESC }]
      limit: 5
    ) {
      nodes {
        title
        date(formatString: "YYYY年MM月DD日")
        slug
      }
    }
  }
`;
