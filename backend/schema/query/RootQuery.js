import { GraphQLObjectType } from "graphql";
import getTodos from "./getTodos.js";
import getTodo from "./getTodo.js";
import getUser from "./getUser.js";
import signIn from "./signIn.js";

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        getTodos: getTodos,
        getTodo: getTodo,
        getUser: getUser,
       signIn: signIn

    })
})

export default RootQuery ;