import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { UserType } from "./types.graphql.js";
import UserService from "./service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const queries = {
  getUser: {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt), // Ensure id is required
      },
    },
    resolve: async (_, { id }) => {
      try {
        const users = await UserService.findByPk(id);
        return users;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch user");
      }
    },
  },
  signIn: {
    type: GraphQLString,
    args: {
      firstName: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: async (_, args) => {
      console.log("args received:", args);
      const user = await UserService.findOne({
        where: { firstName: args.firstName },
      });
      console.log(user);

      if (user) {
        const checkPassword = await bcrypt.compare(
          args.password,
          user.password
        );
        console.log("args Pa", args.password, "user pass", user.password);
        console.log("password matched");
        console.log(checkPassword);

        // Ensure JWT_SECRET is accessible
        if (!process.env.JWT_SECRET) {
          throw new Error("JWT_SECRET is not defined");
        }

        if (checkPassword) {
          const token = jwt.sign(
            { id: user.id, firstName: user.firstName },
            process.env.JWT_SECRET
          );
          return token;
        } else {
          throw new Error("Invalid password");
        }
      } else {
        throw new Error("User not found");
      }
    },
  },
};

export default queries;
