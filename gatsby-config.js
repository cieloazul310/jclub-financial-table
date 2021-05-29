const path = require('path');
const blue = require('@material-ui/core/colors/blue').default;

const baseUrl = 'https://cieloazul310.github.io';
const pathPrefix = '/jclub-financial-table';
const siteUrl = path.join(baseUrl, pathPrefix);

module.exports = {
  siteMetadata: {
    title: `Jクラブ経営情報ポータル`,
    description: `Jリーグが毎年公開している「Jクラブ個別経営情報開示資料」のデータをクラブ別、年度別に表示したページ。損益計算書、貸借対照表、営業収入、営業費用、入場者数の項目別に表と解説を掲載。`,
    siteUrl,
    baseUrl,
  },
  pathPrefix,
  plugins: [
    {
      resolve: 'gatsby-plugin-top-layout',
      options: {
        siteId: 'jclub-financial-report',
      },
    },
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-graphql-codegen`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'frames',
        path: `./data/frames`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'dataset',
        path: `./data/dataset`,
      },
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: ({ node }) => {
          if (node.sourceInstanceName === 'dataset') return 'dataset';
          if (node.relativePath === 'clubs.yml') return 'clubsYaml';
          if (node.relativePath === 'years.yml') return 'yearsYaml';
          if (node.relativePath === 'dict.yml') return 'dictYaml';
          return 'yaml';
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./docs`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-74683419-3',
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        stages: ['develop'],
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: ['node_modules', '.cache', 'public'],
        // Any eslint-webpack-plugin options below
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jクラブ経営情報ポータル`,
        short_name: `Jクラブ経営情報`,
        start_url: `/`,
        background_color: blue[600],
        theme_color: blue[600],
        display: `minimal-ui`,
        icon: `src/images/og_twitter.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                baseUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: ({ site }) => {
          // Alternatively, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
          return site.siteMetadata.baseUrl;
        },
      },
    },
  ],
};
