import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import {
  Jumbotron,
  Section,
  SectionDivider,
  Article,
  Paragraph,
  AppLink,
  AppLinkButton,
  useSiteMetadata,
} from '@cieloazul310/gatsby-theme-aoi';
import Layout from '../layout';
import Seo from '../components/Seo';
import PostList from '../components/PostList';
import { J1Link, J2Link, J3Link, YearsLink } from '../components/Links';
import AttributionDoc from '../components/Article/Attribution';
import { AdInSectionDividerOne } from '../components/Ads';
import type { MdxPost } from '../../types';

type IndexPageQueryData = {
  allMdxPost: {
    edges: {
      node: Pick<MdxPost, 'slug' | 'title' | 'date'>;
    }[];
  };
};

function IndexPage({ data }: PageProps<IndexPageQueryData>) {
  const { allMdxPost } = data;
  const { palette } = useTheme();
  const { title, description } = useSiteMetadata();
  return (
    <Layout>
      <Jumbotron maxWidth="md" bgcolor={palette.mode === 'light' ? 'primary.dark' : 'grey.800'} height={280}>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        <Paragraph>{description}</Paragraph>
        <span>
          <AppLinkButton to="/year/2021/" variant="contained" color="primary">
            最新の経営情報を見る
          </AppLinkButton>
        </span>
      </Jumbotron>
      {/*
        <Jumbotron maxWidth="md" bgcolor={palette.mode === 'light' ? 'primary.light' : 'primary.dark'} height={40}>
        <AppLink to="/year/2021/" color="inherit">
          <Typography variant="h6" component="h3" color="inherit">
            2021年度決算(完全版)を更新しました
          </Typography>
        </AppLink>
      </Jumbotron>
      */}
      <SectionDivider />
      <Section>
        <Article maxWidth="md">
          <Grid container spacing={2} component="nav">
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3" gutterBottom>
                J1
              </Typography>
              <J1Link />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3" gutterBottom>
                J2
              </Typography>
              <J2Link />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3" gutterBottom>
                J3
              </Typography>
              <J3Link />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3" gutterBottom>
                年度別
              </Typography>
              <YearsLink />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h3" gutterBottom>
                <AppLink to="/series" color="inherit">
                  項目別表示
                </AppLink>
              </Typography>
              <Paragraph>営業収入や入場者数など特定の項目を、縦軸にクラブ、横軸に年度で表したページです</Paragraph>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h3" gutterBottom>
                <AppLink to="/download" color="inherit">
                  データダウンロード
                </AppLink>
              </Typography>
              <Paragraph>データをJSONやCSV形式でダウンロードできるページです</Paragraph>
            </Grid>
          </Grid>
        </Article>
      </Section>
      <SectionDivider />
      <Section>
        <Article maxWidth="md">
          <PostList posts={allMdxPost.edges} title="最新の記事" more={{ to: '/posts/', title: '記事一覧' }} />
        </Article>
      </Section>
      <AdInSectionDividerOne />
      <Section>
        <Article maxWidth="md">
          <AttributionDoc />
        </Article>
      </Section>
    </Layout>
  );
}
export default IndexPage;

export function Head() {
  return <Seo />;
}

export const query = graphql`
  query IndexPage($draft: Boolean) {
    allMdxPost(filter: { draft: { ne: $draft } }, sort: { fields: [date, lastmod, slug], order: [DESC, DESC, DESC] }, limit: 5) {
      edges {
        node {
          slug
          title
          date(formatString: "YYYY年MM月DD日")
        }
      }
    }
  }
`;
