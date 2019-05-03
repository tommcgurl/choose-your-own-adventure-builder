const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    adventures: [Adventure]
    users: [User]
  }
`;
