import {
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} from "graphql";
import db from "../../src/models/index.js";
import { TodoInputType, TodoType } from "../TypeDefination/todo.js";
import { combineResolvers } from "graphql-resolvers";
import isAuthenticated from "../../src/helper/authResolver.js";

const CreateTodo = {
  type: TodoType,
  args: {
    input: {
      type: new GraphQLNonNull(TodoInputType),
    },
  },
  resolve: combineResolvers(isAuthenticated, async (_, { input }, user) => {
    // console.log("create Todo Context", user.user);
    // console.log(input);
    const { id, title, description, completed } = input;
    try {
      const todo = await db.todo.create({
        id,
        title,
        description,
        completed,
        UserId: user.user,
      });

      console.log("backend todo", todo);
      return todo;
    } catch (err) {
      throw new Error(err.message);
    }
  }),
};

export default CreateTodo;
