import deleteType from "../TypeDefination/deleteTodo.js";
import db from "../../src/models/index.js";
import { GraphQLBoolean, GraphQLID } from "graphql";
import { BOOLEAN } from "sequelize";

const deleteTodo = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent, args) {
    try {
      const todo = await db.todo.findByPk(args.id);

      if (!todo) {
        throw new Error("Todo not found");
      }

      // Update the todo to set deletedAt to true
      await db.todo.destroy({ where: { id: args.id } });

      // Optionally, you can return the updated todo or a success message
      return true;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to delete todo");
    }
  },
};

export default deleteTodo;
