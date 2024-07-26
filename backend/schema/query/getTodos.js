import { GraphQLList, GraphQLNonNull } from "graphql";
import db from "../../models/index.js";
import isAuthenticated from "../../helper/authResolver.js";
import { combineResolvers } from "graphql-resolvers";
import {
  TodoConnectionType,
  TodoFilterType,
  TodoType,
} from "../TypeDefination/todo.js";
import { connectionArgs } from "graphql-relay";

const getTodos = {
  type: new GraphQLList(TodoType),
  // args: {
  //   ...connectionArgs,
  //   filter: { type: TodoFilterType },
  // },
  resolve: combineResolvers(isAuthenticated, async (parent, args, { user }) => {
    // console.log("context", user);
    try {
      const todos = await db.todo.scope("deleted").findAll({
        where: {
          UserId: user,
          //scope has been added to the todo model to filter out deleted todos
          // scope is a feature in sequelize that allows you to define a set of predefined conditions that can be used to filter out results
        },
      });
      // console.log(todos);
      // const filter = Filter(args.filter, args.accountId);
      // return await GlobalService.fetchAndPrepareData(
      //   TransactionService,
      //   filter,
      //   args
      // );

      return todos;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch todos");
    }
  }),
};

export default getTodos;
