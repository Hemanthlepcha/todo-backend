import { GraphQLNonNull } from "graphql";
import { UserInputType, UserType } from "./types.graphql.js";
import UserService from "./service.js";
import bcrypt from "bcrypt";

const mutations = {
  createUser: {
    type: UserType,
    args: {
      input: {
        type: new GraphQLNonNull(UserInputType),
      },
    },
    async resolve(parent, { input }) {
      try {
        const saltRounds = 10; // Adjust the number of salt rounds as needed
        const hashedPassword = await bcrypt.hash(input.password, saltRounds);

        const user = await UserService.create({
          firstName: input.firstName,

          lastName: input.lastName,
          password: hashedPassword,
        });

        return user;
      } catch (error) {
        throw new Error(`Failed to create user: ${error}`);
      }
    },
  },
};

export default mutations;
