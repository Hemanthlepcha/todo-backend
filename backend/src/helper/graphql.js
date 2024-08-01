import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { DateTimeScalar } from "graphql-date-scalars";
import GraphQLFields from "graphql-fields";
import { invertObj, mapObjIndexed, pipe } from "ramda";

const extractFields = GraphQLFields;

const extractQueryParams = (args = {}) => {
  const { first, after, sortField, sortDirection, searchParam, ...filter } =
    args;
  return {
    filter,
    pagination: { first, after },
    sort: { sortField, sortDirection },
    searchParam,
  };
};
const PageInfoType = new GraphQLObjectType({
  name: "PageInfoType",
  description: "Represents Page Info Type",
  fields: () => ({
    hasNextPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    hasPreviousPage: { type: GraphQLBoolean },
    startCursor: { type: GraphQLString },
    endCursor: { type: GraphQLString },
  }),
});

const paginationFields = () => ({
  first: { type: GraphQLInt },
  after: { type: GraphQLString },
});
const sortFields = () => ({
  sortField: { type: GraphQLString },
  sortDirection: { type: GraphQLString },
});

const metaFieldOptions = () => ({
  createdAt: { type: DateTimeScalar },
  updatedAt: { type: DateTimeScalar },
  deletedAt: { type: DateTimeScalar },
});

const workspaceBasedSubscriptionRequest = () => ({
  requestId: { type: new GraphQLNonNull(GraphQLID) },
});

const withmetaFieldOptions = (args = {}) => ({
  ...metaFieldOptions(),
  ...args,
});

const withPaginationFields = (args = {}) => ({
  ...paginationFields(),
  ...sortFields(),
  ...args,
  searchParam: { type: GraphQLString },
});

const successResponse = () => ({
  success: { type: GraphQLBoolean },
});

const paginatedResponse = (args = {}) => ({
  ...args,
  count: { type: GraphQLInt },
});

const removeEntityFields = () => ({
  id: { type: GraphQLString },
  slug: { type: GraphQLString },
});

const toGraphQLEnum = (ENUM) =>
  pipe(
    invertObj,
    mapObjIndexed((val, key) => ({ value: key }))
  )(ENUM);

const CustomSuccessResponse = new GraphQLObjectType({
  name: "Success",
  fields: successResponse,
});
export const GraphQLRemoveEntityInput = new GraphQLNonNull(
  new GraphQLInputObjectType({
    name: "RemoveEntity",
    fields: removeEntityFields,
  })
);

export {
  CustomSuccessResponse,
  PageInfoType,
  extractFields,
  extractQueryParams,
  metaFieldOptions,
  paginatedResponse,
  paginationFields,
  removeEntityFields,
  successResponse,
  toGraphQLEnum,
  withPaginationFields,
  withmetaFieldOptions,
  workspaceBasedSubscriptionRequest,
};
