import UserType from "../TypeDefination/User.js";
import bcrypt from "bcrypt";
import { GraphQLString } from "graphql";
import db from "../../src/models/index.js";

const createUser = {
  type: UserType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      const saltRounds = 10; // Adjust the number of salt rounds as needed
      const hashedPassword = await bcrypt.hash(args.password, saltRounds);

      const user = await db.User.create({
        firstName: args.firstName,

        lastName: args.lastName,
        password: hashedPassword,
      });

      return user;
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  },
};

export default createUser;
