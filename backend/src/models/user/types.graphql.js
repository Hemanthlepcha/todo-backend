import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLInt,
} from "graphql";

export const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    order: { type: GraphQLInt },
  }),
});

export const UserInputType = new GraphQLInputObjectType({
  name: "UserInputType",
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});
