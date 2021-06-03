import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useSiteMetadata } from '../../utils/graphql-hooks';
import ogImage from '../../images/og_image.png';
import ogTwitter from '../../images/og_twitter.png';

interface Props {
  title?: string;
  description?: string;
}

function Seo({ title, description }: Props): JSX.Element {
  const siteMetadata = useSiteMetadata();
  const { href } = useLocation();
  return (
    <Helmet
      htmlAttributes={{ lang: 'ja' }}
      title={title || siteMetadata.title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: description || siteMetadata.description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: `https://cieloazul310.github.io${ogImage}`,
        },
        {
          property: 'og:title',
          content: title || siteMetadata.title,
        },
        {
          property: 'og:description',
          content: description || siteMetadata.description,
        },
        {
          property: 'og:url',
          content: href,
        },
        { name: 'twitter:card', content: 'summary' },
        {
          name: 'twitter:site',
          content: siteMetadata.title,
        },
        {
          name: 'twitter:title',
          content: title ? `${title} | ${siteMetadata.title}` : siteMetadata.title,
        },
        {
          name: 'twitter:description',
          content: description || siteMetadata.description,
        },
        {
          name: 'twitter:image',
          content: `https://cieloazul310.github.io${ogTwitter}`,
        },
      ]}
    />
  );
}

Seo.defaultProps = {
  title: undefined,
  description: undefined,
};

export default Seo;
