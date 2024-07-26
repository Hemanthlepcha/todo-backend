import { GraphQLObjectType,GraphQLID,GraphQLString } from "graphql"

const UserType = new GraphQLObjectType({
    name: 'UserType2',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
       
    })
})

export default UserType;