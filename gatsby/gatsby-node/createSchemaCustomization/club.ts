import type { CreateSchemaCustomizationArgs } from "gatsby";
import type { Club, Datum, MdxPost } from "types";
import type { GatsbyGraphQLContext } from "../graphql";

export default async function createClubSchema({
  actions,
  schema,
}: CreateSchemaCustomizationArgs) {
  const { createTypes } = actions;

  createTypes(`
    type Club implements Node @dontInfer {
      id: String!
      index: Int!
      slug: String!
      href: String!
      name: String!
      fullname: String!
      short_name: String!
      company: String!
      category: String!
      hometown: String!
      period: Int!
      website: String
      settlement: String
      relatedCompanies: [String]
      annotation: [String]
      data: [Data]!
      posts: PostsByClub!
    }
    type PostsByClub {
      entries: [MdxPost]!
      totalCount: Int!
    }
  `);

  createTypes(
    schema.buildObjectType({
      name: `Club`,
      fields: {
        data: {
          type: `[Data]!`,
          resolve: async (
            source: Club<"bare">,
            args,
            context: GatsbyGraphQLContext,
          ) => {
            const { entries } = await context.nodeModel.findAll<Datum<"node">>({
              type: `Data`,
              query: {
                filter: { slug: { eq: source.slug } },
                sort: { year: "ASC" },
              },
            });
            return entries;
          },
        },
        posts: {
          type: `PostsByClub!`,
          args: {
            draft: {
              type: "Boolean",
            },
          },
          resolve: async (
            source: Club<"bare">,
            args: { draft: boolean | null },
            context: GatsbyGraphQLContext,
          ) =>
            context.nodeModel.findAll<MdxPost<"node">>({
              type: `MdxPost`,
              query: {
                filter: {
                  club: {
                    elemMatch: { short_name: { eq: source.short_name } },
                  },
                  draft: {
                    ne: args.draft,
                  },
                },
                sort: { date: "DESC" },
              },
            }),
        },
      },
    }),
  );
}
