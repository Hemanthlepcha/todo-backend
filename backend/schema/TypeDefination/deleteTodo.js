import { GraphQLBoolean,GraphQLObjectType } from "graphql";

const deteteType = new GraphQLObjectType({
    name: "deleteType",
    fields: () => ({
        deleteAt: { type: GraphQLBoolean }
    })
})

export default deteteType;