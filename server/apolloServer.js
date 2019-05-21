const { ApolloServer } = require('apollo-server-express');
const { parseToken } = require('./services/tokenService');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const context = ({ req }) => {
  const token = req.headers && req.headers.authorization;
  if (token) {
    try {
      const parsedToken = parseToken(token.substring(7));
      return { user: parsedToken };
    } catch (err) {
      console.error(err);
    }
  }

  return {};
};

module.exports = new ApolloServer({ typeDefs, resolvers, context });
