const { gql } = require("apollo-server-express");

module.exports = gql`
  type Doc {
    id: ID!
    name: String!
    email: String!
    address: String!
    phoneNumber: String!
    zipCode: String!
    files: String!
  }

  type Mutation {
    createDoc(
      name: String!
      email: String!
      address: String!
      phoneNumber: String!
      zipCode: String!
      files: Upload
    ): Doc
  }

  type Query {
    getDocs: [Doc!]
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
