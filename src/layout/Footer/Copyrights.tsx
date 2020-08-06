import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import AppLink from '../../components/AppLink';
import { useSiteMetadata } from '../../utils/graphql-hooks';

function Copyrights() {
  const { title } = useSiteMetadata();
  return (
    <>
      <Typography variant="body1" align="center" gutterBottom>
        <AppLink to="/" color="inherit">
          {title}
        </AppLink>
      </Typography>
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} cieloazul310 All rights reserved. Built with
        {` `}
        <MuiLink color="inherit" href="https://www.gatsbyjs.org" target="_blank" rel="noopener noreferrer">
          Gatsby
        </MuiLink>
      </Typography>
    </>
  );
}

export default Copyrights;
