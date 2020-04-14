const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Doc {
        id: ID!
        name: String!
        email: String!
        address: String!
        phoneNumber: String!
        zipCode: String!
        file: String!
    }

    input DocInputData {
        name: String!
        email: String!
        address: String!
        phoneNumber: String!
        zipCode: String!
        file: String!
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
