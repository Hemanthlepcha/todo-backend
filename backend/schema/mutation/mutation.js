import { GraphQLObjectType } from "graphql";

import createUser from "./userRegistration.js";
import updateTodo from "../mutation/updateTodo.js";
import deleteTodo from "../mutation/deleteTodo.js";
import createTodo from "../mutation/createTodo.js";

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    createUser: createUser,
    createTodo: createTodo,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo,
  },
});
export default RootMutation;
