import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  mutations as todoMutations,
  queries as todoQueries,
} from "./todo/index.js";
import {
  mutations as userMutations,
  queries as userQueries,
} from "./user/index.js";

import {
  TodoType,
  TodoInputType,
  TodoFilterType,
  TodoConnectionType,
  // TodoEdge,
  updateInput,
  TodoEdgeType,
} from "./todo/types.graphql.js";

import { UserType, UserInputType } from "./user/types.graphql.js";

// Import other types, queries, and mutations as needed

const queries = {
  ...todoQueries,
  ...userQueries,
  // Add other queries here
};

const mutations = {
  ...todoMutations,
  ...userMutations,

  // Add other mutations here
};

const subscriptions = {
  // Add subscriptions here
};

// Initialize types if they are functions
// if (typeof todoTypes === "function") {
//   todoTypes();
// }
// if (typeof userTypes === "function") {
//   userTypes();
// }
// Initialize other types if needed

const AppQueryRootType = new GraphQLObjectType({
  name: "AppQuerySchema",
  description: "App Query Schema Root",
  fields: () => queries,
});

const AppMutationRootType = new GraphQLObjectType({
  name: "AppMutationSchema",
  description: "App Mutation Schema Root",
  fields: () => mutations,
});

const AppSubscriptionsRootType = new GraphQLObjectType({
  name: "AppSubscriptionSchema",
  description: "App Subscription Schema Root",
  fields: () => subscriptions,
});

const AppSchema = new GraphQLSchema({
  query: AppQueryRootType,
  mutation: AppMutationRootType,
  // subscription: AppSubscriptionsRootType,
});

export default AppSchema;
