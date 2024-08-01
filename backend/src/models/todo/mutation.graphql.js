import { GraphQLID, GraphQLBoolean, GraphQLNonNull, GraphQLInt } from "graphql";
import { combineResolvers } from "graphql-resolvers";
import isAuthenticated from "../../helper/authResolver.js";
import { TodoInputType, TodoType, updateInput } from "./types.graphql.js";
import TodoService from "./service.js";

const mutations = {
  CreateTodo: {
    type: TodoType,
    args: {
      input: {
        type: new GraphQLNonNull(TodoInputType),
      },
    },
    resolve: combineResolvers(isAuthenticated, async (_, { input }, user) => {
      console.log("create Todo Context", user.user);
      console.log(input);
      const { title, description, completed } = input;
      try {
        const todo = await TodoService.create({
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
  },

  deleteTodo: {
    type: GraphQLBoolean,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(parent, args) {
      try {
        const todo = await TodoService.findByPk(args.id);

        if (!todo) {
          throw new Error("Todo not found");
        }

        // Update the todo to set deletedAt to true
        await TodoService.delete({
          id: args.id,
        });

        // Optionally, you can return the updated todo or a success message
        return true;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to delete todo");
      }
    },
  },

  updateTodo: {
    type: TodoType, // Return the updated todo
    args: {
      input: { type: new GraphQLNonNull(updateInput) },
    },
    async resolve(_, { input }) {
      const { id, title, description, completed } = input;
      console.log(input);

      try {
        // Update the todo with the new values
        const todo = await TodoService.update(input);
        console.log("Todo", todo);

        return todo; // Return true if update is successful
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update todo");
      }
    },
  },
};

export default mutations;
