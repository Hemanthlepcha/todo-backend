import { GraphQLInt, GraphQLNonNull } from "graphql";
import db from "../../src/models/index.js";
import { TodoType } from "../TypeDefination/todo.js";

const getTodo = {
  type: TodoType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    UserId: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: async (_, { id, UserId }) => {
    try {
      // Fetch the todo by id and userId
      const todo = await db.todo.findOne({
        where: {
          id: id,
          UserId: UserId,
        },
      });

      if (!todo) {
        throw new Error("Todo not found");
      }

      return todo;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching todo");
    }
  },
};

export default getTodo;
