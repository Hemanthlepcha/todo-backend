import { GraphQLBoolean, GraphQLID, GraphQLInt } from "graphql";
import db from "../../models/index.js";
const updateTodoOrder = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLID },
    order: { type: GraphQLInt },
  },
  async resolve(_, { id, order }) {
    try {
      await db.todo.update(
        {
          order: order,
        },
        { where: { id: id } }
      );

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};

export default updateTodoOrder;
