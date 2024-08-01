import { GraphQLNonNull, GraphQLBoolean } from "graphql";
import db from "../../src/models/index.js";
import updateInput from "../TypeDefination/updateInput.js";
import { TodoType } from "../TypeDefination/todo.js";

const updateTodo = {
  type: TodoType, // Return the updated todo
  args: {
    input: { type: new GraphQLNonNull(updateInput) },
  },
  async resolve(_, { input }) {
    const { id, title, description, completed } = input;
    console.log(input);

    try {
      // Update the todo with the new values
      const todo = await db.todo.update(
        {
          title: title || title,
          description: description || description,
          completed: completed !== false ? completed : completed,
        },
        { where: { id: id } }
      );

      return todo; // Return true if update is successful
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update todo");
    }
  },
};

export default updateTodo;
