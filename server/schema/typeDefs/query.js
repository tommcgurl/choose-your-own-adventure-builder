const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    adventures(first: Int, publishedBefore: DateTime): [Adventure]
    adventure(id: ID!): Adventure
    users: [User]
    drafts: [Adventure]
  }
`;
