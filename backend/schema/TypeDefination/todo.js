import { query } from "express";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLInt,
} from "graphql";
import { connectionDefinitions } from "graphql-relay";
export const TodoType = new GraphQLObjectType({
  name: "TodoType", // Name of the type
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) }, // This can be optional if auto-generated
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    completed: { type: new GraphQLNonNull(GraphQLBoolean) },
    UserId: { type: new GraphQLNonNull(GraphQLID) },
  }),
});

export const TodoInputType = new GraphQLInputObjectType({
  name: "TodoInputType",
  fields: () => ({
    id: { type: GraphQLID }, // This can be optional if auto-generated
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    completed: { type: GraphQLBoolean },
  }),
});

export const TodoFilterType = new GraphQLInputObjectType({
  name: "TodoFilterType",
  fields: () => ({
    query: {
      type: GraphQLString,
    },
    completed: {
      type: GraphQLBoolean,
    },
  }),
});
export const { connectionType: TodoConnectionType, edgeType: TodoEdge } =
  connectionDefinitions({
    nodeType: TodoType,
    connectionFields: () => ({
      TodoType,
      totalCount: {
        type: GraphQLInt,
      },
    }),
  });
