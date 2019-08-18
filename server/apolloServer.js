const { ApolloServer } = require('apollo-server-express');
const {
  parseTokenFromHeaders,
  decodeToken,
} = require('./services/tokenService');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const context = ({ req }) => {
  const token = parseTokenFromHeaders(req.headers);
  if (token) {
    try {
      const decodedToken = decodeToken(token);
      return { user: decodedToken };
    } catch (err) {
      console.error(err);
    }
  }

  return {};
};

module.exports = new ApolloServer({ typeDefs, resolvers, context });
