import RootQuery from "./query/RootQuery.js";
import { GraphQLSchema } from "graphql";
import RootMutation from "./mutation/mutation.js";

const AppSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

export default AppSchema;
