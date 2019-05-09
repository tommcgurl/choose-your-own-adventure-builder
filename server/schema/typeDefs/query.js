const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    adventures: [Adventure]
    adventure(id: ID!): Adventure
    users: [User]
    drafts: [Adventure]
  }
`;
