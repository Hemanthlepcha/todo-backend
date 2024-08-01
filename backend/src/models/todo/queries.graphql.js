import { GraphQLInt, GraphQLList } from "graphql";
import { TodoConnectionType, TodoType } from "./types.graphql.js";
import { combineResolvers } from "graphql-resolvers";
import isAuthenticated from "../../helper/authResolver.js";
import TodoService from "./service.js";
import { calculatePageInfo } from "./helper.js";
const queries = {
  getTodos: {
    type: new GraphQLList(TodoType),
    // args: {
    //   ...connectionArgs,
    //   filter: { type: TodoFilterType },
    // },
    resolve: combineResolvers(
      isAuthenticated,
      async (parent, args, { user }) => {
        console.log("context getTodo", user);
        try {
          return await TodoService.findAll({
            where: {
              UserId: user,
            },
          });
        } catch (error) {
          console.error(error);
          throw new Error("Failed to fetch todos");
        }
      }
    ),
  },
  getTodosConn: {
    type: TodoConnectionType,
    args: {
      limit: { type: GraphQLInt },
      offset: { type: GraphQLInt },
    },
    resolve: combineResolvers(
      isAuthenticated,
      async (parent, args, { user }) => {
        console.log("context getTodo", user);
        if (!user) {
          throw new Error("User is not authenticated or user ID is missing");
        }
        const todos = await TodoService.findAll({
          where: {
            UserId: user,
          },
        });
        if (!todos) {
          throw new Error("No todos");
        } else {
          try {
            const totalCount = todos.length;
            // console.log("Total count", totalCount);

            const allTodos = await TodoService.findAll({
              where: { UserId: user },
              limit: args.limit,
              offset: args.offset,
            });
            // console.log(allTodos);
            const edges = allTodos.map((todo) => ({
              node: todo,
            }));
            // const edges = edgesCreation(allTodos);
            // console.log("Edges", edges);

            const pageInfo = calculatePageInfo(
              args.limit,
              args.offset,
              totalCount
            );

            return {
              totalCount,
              edges,
              pageInfo,
            };
          } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch todos");
          }
        }
      }
    ),
  },
};
export default queries;
