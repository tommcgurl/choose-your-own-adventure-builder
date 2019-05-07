const { ApolloServer } = require('apollo-server-express');
const { getUser } = require('./services/tokenService');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const context = req => {
  const token = (req.headers && req.headers.authorization) || '';
  const user = getUser(token);
  return { user };
};

module.exports = new ApolloServer({ typeDefs, resolvers, context });
