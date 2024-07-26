import { skip } from "graphql-resolvers";
import { AuthenticationError, AUTH_ERROR } from "./error.js";

export const isAuthenticated = (parent, args, context) => {
  // console.log(context, "isAuthenticated");
  return context ? skip : new AuthenticationError(AUTH_ERROR.AUTH_REQUIRED);
};
export default isAuthenticated;
