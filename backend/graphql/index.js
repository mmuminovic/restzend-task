const Mutation = require('./Mutation');
const Query = require('./Query');
const Doc = require('./resolvers/document');

const resolvers = {
    Mutation,
    Query,
    Doc
}

module.exports = { resolvers }
