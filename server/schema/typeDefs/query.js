const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    paginatedAdventures(
      first: Int
      publishedBefore: DateTime
    ): PaginatedAdventures
    adventure(id: ID!): Adventure
    users: [User]
    adventuresByRequestingUser: [Adventure]
    genres: [Genre]
    library: [Adventure]
  }
`;
