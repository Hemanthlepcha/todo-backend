import { GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
import UserType from "../TypeDefination/User.js";
import db from "../../src/models/index.js";

const getUser = {
  type: UserType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt), // Ensure id is required
    },
  },
  resolve: async (_, { id }) => {
    try {
      const users = await db.User.findByPk(id);
      return users;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch user");
    }
  },
};

export default getUser;
