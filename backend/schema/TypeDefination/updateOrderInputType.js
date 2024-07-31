import { GraphQLInputObjectType, GraphQLID, GraphQLInt } from "graphql";

const updateOderInputType = new GraphQLInputObjectType({
  name: "updateOrderInputType", // name of the type
  fields: {
    id: { type: GraphQLID },
    order: { type: GraphQLInt },
  },
});

export default updateOderInputType;
