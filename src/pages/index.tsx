import * as React from 'react';
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
import { J1Link, J2Link, J3Link, YearsLink } from '../components/Links';
import AttributionDoc from '../components/Article/Attribution';
import { AdInSectionDividerOne } from '../components/Ads';

function IndexPage() {
  const { palette } = useTheme();
  const { title, description } = useSiteMetadata();
  return (
    <Layout title={title}>
      <Jumbotron maxWidth="md" bgcolor={palette.mode === 'light' ? 'primary.dark' : 'grey.800'} height={280}>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        <Paragraph>{description}</Paragraph>
        <span>
          <AppLinkButton to="/year/2020/" variant="contained" color="primary">
            最新の経営情報を見る
          </AppLinkButton>
        </span>
      </Jumbotron>
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
/*
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Layout from '../layout';
import { AppLink } from '../components/AppLink';
import { ContentBasis, ContentBasisLarge } from '../components/Basis';
import { J1Link, J2Link, J3Link, YearsLink } from '../components/links';
import { AttributionDoc } from '../components/docs';
import { AdInArticle } from '../components/Ads';
import { useSiteMetadata } from '../utils/graphql-hooks';

function IndexPage() {
  const { title, description } = useSiteMetadata();

  return (
    <Layout title={title}>
      <Container maxWidth="md">
        <ContentBasisLarge>
          <Typography variant="h3" component="h2" gutterBottom>
            {title}
          </Typography>
          <ContentBasis>
            <Typography paragraph>{description}</Typography>
            <Typography paragraph>
              <AppLink to="/year/2020">最新の経営情報を見る</AppLink>
            </Typography>
          </ContentBasis>
          <ContentBasis>
            <Grid container component="nav">
              <Grid item xs={12} sm={3}>
                <ContentBasis>
                  <Typography variant="h6" component="h3" gutterBottom>
                    J1
                  </Typography>
                  <J1Link />
                </ContentBasis>
              </Grid>
              <Grid item xs={12} sm={3}>
                <ContentBasis>
                  <Typography variant="h6" component="h3" gutterBottom>
                    J2
                  </Typography>
                  <J2Link />
                </ContentBasis>
              </Grid>
              <Grid item xs={12} sm={3}>
                <ContentBasis>
                  <Typography variant="h6" component="h3" gutterBottom>
                    J3
                  </Typography>
                  <J3Link />
                </ContentBasis>
              </Grid>
              <Grid item xs={12} sm={3}>
                <ContentBasis>
                  <Typography variant="h6" component="h3" gutterBottom>
                    年度別
                  </Typography>
                  <YearsLink />
                </ContentBasis>
              </Grid>
              <Grid item xs={12} sm={12}>
                <ContentBasis>
                  <Typography variant="h6" component="h3" gutterBottom>
                    <AppLink to="/series" color="inherit">
                      項目別表示
                    </AppLink>
                  </Typography>
                </ContentBasis>
              </Grid>
              <Grid item xs={12} sm={12}>
                <ContentBasis>
                  <Typography variant="h6" component="h3" gutterBottom>
                    <AppLink to="/download" color="inherit">
                      データダウンロード
                    </AppLink>
                  </Typography>
                </ContentBasis>
              </Grid>
            </Grid>
          </ContentBasis>
          <footer>
            <ContentBasisLarge>
              <AttributionDoc />
            </ContentBasisLarge>
          </footer>
          <ContentBasisLarge>
            <AdInArticle />
          </ContentBasisLarge>
        </ContentBasisLarge>
      </Container>
    </Layout>
  );
}
export default IndexPage;
*/
