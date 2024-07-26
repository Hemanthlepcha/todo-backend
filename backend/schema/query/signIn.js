import { GraphQLObjectType, GraphQLString } from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../models/index.js";
import dotenv from "dotenv";
dotenv.config();

const signIn = {
  type: GraphQLString,
  args: {
    firstName: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    console.log("args received:", args);
    const user = await db.User.findOne({
      where: { firstName: args.firstName },
    });
    console.log(user);

    if (user) {
      const checkPassword = await bcrypt.compare(args.password, user.password);
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
};
export default signIn;
