import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { MarkDownQuery } from '../../../graphql-types';
import DocContainer from './DocContainer';

export function useBS() {
  const { markdownRemark } = useStaticQuery<MarkDownQuery>(graphql`
    query {
      markdownRemark(frontmatter: { id: { eq: "bs" } }) {
        htmlAst
        frontmatter {
          title
        }
      }
    }
  `);
  return markdownRemark;
}

export function BSDoc() {
  const markdownRemark = useBS();
  return markdownRemark ? <DocContainer markdownRemark={markdownRemark} /> : null;
}

export default BSDoc;
