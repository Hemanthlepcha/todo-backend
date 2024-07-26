import {GraphQLObjectType, GraphQLString} from 'graphql'

const UserType = new GraphQLObjectType({
    name: 'UserType', // name of the type
    fields: () => ({
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},        
        password: {type: GraphQLString} // shouldnt be here
        
    })
})
export default UserType;