import { query } from "express";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLUnionType,
} from "graphql";
import { connectionDefinitions } from "graphql-relay";

export const TodoType = new GraphQLObjectType({
  name: "TodoType", // Name of the type
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    completed: { type: new GraphQLNonNull(GraphQLBoolean) },
    UserId: { type: new GraphQLNonNull(GraphQLID) },
    order: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

export const TodoInputType = new GraphQLInputObjectType({
  name: "TodoInputType",
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    completed: { type: GraphQLBoolean },
    order: { type: GraphQLInt },
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
// export const { connectionType: TodoConnectionType, edgeType: TodoEdge } =
//   connectionDefinitions({
//     nodeType: TodoType,
//     connectionFields: () => ({
//       TodoType,
//       totalCount: {
//         type: GraphQLInt,
//       },
//     }),
//   });
export const updateInput = new GraphQLInputObjectType({
  name: "updateInput", // name of the type
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    order: { type: GraphQLInt },
  },
});
export const TodoEdgeType = new GraphQLObjectType({
  name: "TodoEdgeType",
  fields: {
    node: { type: new GraphQLNonNull(TodoType) },
    cursor: { type: GraphQLString },
  },
});
export const PageInfoType = new GraphQLObjectType({
  name: "PageInfoType",
  fields: {
    hasNextPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    hasPreviousPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    // currentOffset: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export const TodoConnectionType = new GraphQLObjectType({
  name: "TodoConnection",
  fields: {
    totalCount: { type: GraphQLInt },
    edges: { type: new GraphQLList(new GraphQLNonNull(TodoEdgeType)) },
    pageInfo: { type: new GraphQLNonNull(PageInfoType) },
  },
});
