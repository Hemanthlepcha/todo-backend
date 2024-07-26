import {
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} from "graphql";
import db from "../../models/index.js";
import { TodoInputType, TodoType } from "../TypeDefination/todo.js";
import { combineResolvers } from "graphql-resolvers";
import isAuthenticated from "../../helper/authResolver.js";

const CreateTodo = {
  type: TodoType,
  args: {
    input: {
      type: new GraphQLNonNull(TodoInputType),
    },
  },
  resolve: combineResolvers(
    isAuthenticated,
    async (parent, { input }, context) => {
      console.log("Context", context);
      const { id, title, description, completed } = input;
      try {
        const todo = await db.todo.create({
          id,
          title,
          description,
          completed,
          UserId: context.userId,
        });

        // console.log(todo);
        return todo;
      } catch (err) {
        throw new Error(err.message);
      }
    }
  ),
};

export default CreateTodo;
