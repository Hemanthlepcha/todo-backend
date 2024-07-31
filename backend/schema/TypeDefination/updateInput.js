import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
} from "graphql";

const updateInput = new GraphQLInputObjectType({
  name: "updateInput", // name of the type
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
  },
});

export default updateInput;
