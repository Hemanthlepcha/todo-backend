import { GraphQLObjectType } from "graphql";

import createUser from "./userRegistration.js";
import updateTodo from "./updateTodo.js";
import deleteTodo from "./deleteTodo.js";
import createTodo from "./createTodo.js";
import updateTodoOrder from "./updateTodoOrder.js";

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    createUser: createUser,
    createTodo: createTodo,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo,
    updateTodoOrder: updateTodoOrder,
  },
});
export default RootMutation;
