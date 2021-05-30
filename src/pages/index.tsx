import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Layout from '../layout';
import { AppLink } from '../components/AppLink';
import { ContentBasis, ContentBasisLarge } from '../components/Basis';
import { J1Link, J2Link, J3Link, YearsLink } from '../components/links';
import { AttributionDoc } from '../components/docs';
import { AdInArticle } from '../components/Ads';
import { useSiteMetadata } from '../utils/graphql-hooks';

function IndexPage(): JSX.Element {
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
