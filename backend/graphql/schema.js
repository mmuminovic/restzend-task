const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Doc {
        id: ID!
        name: String!
        email: String!
        address: String!
        phoneNumber: String!
        zipCode: String!
    }

    input DocInputData {
        name: String!
        email: String!
        address: String!
        phoneNumber: String!
        zipCode: String!
    }

    type RootMutation {
        createDoc(postInput: DocInputData): Doc!
    }

    type RootQuery {
        getDocs: [Doc!]
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
