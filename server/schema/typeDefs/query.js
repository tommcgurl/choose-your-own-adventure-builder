const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    paginatedAdventures(
      first: Int
      publishedBefore: DateTime
    ): PaginatedAdventures
    adventure(id: ID!): LibraryBook
    users: [User]
    adventuresByRequestingUser: [Adventure]
    genres: [Genre]
    library: [LibraryBook]
    progress(id: ID!): [Breadcrumb]
  }
`;
