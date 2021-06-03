import { useStaticQuery, graphql } from 'gatsby';
import { AllClubsQuery } from '../../../graphql-types';

export default function useJ3Clubs(): AllClubsQuery['allClubsYaml']['edges'] {
  const data = useStaticQuery<AllClubsQuery>(graphql`
    {
      allClubsYaml(filter: { category: { eq: "J3" } }) {
        edges {
          node {
            id
            slug
            name
            short_name
            fullname
            category
            company
            hometown
            area
            relatedCompanies
          }
        }
      }
    }
  `);
  return data.allClubsYaml.edges;
}
