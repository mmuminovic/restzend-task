const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Doc {
        id: ID!
        name: String!
        email: String!
        address: String!
        phoneNumber: String!
        zipCode: String!
        files: String!
    }

    input DocInputData {
        name: String!
        email: String!
        address: String!
        phoneNumber: String!
        zipCode: String!
        files: String!
    }

    type RootMutation {
        createDoc(docInput: DocInputData): Doc!
    }

    type RootQuery {
        getDocs: [Doc!]
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
