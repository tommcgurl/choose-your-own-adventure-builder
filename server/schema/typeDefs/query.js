const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    paginatedAdventures(search: AdventureSearchInput!): PaginatedAdventures
    adventure(id: ID!): Adventure
    libraryBook(id: ID!): LibraryBook
    users: [User]
    adventuresByRequestingUser: [Adventure]
    genres: [Genre]
    library: [LibraryBook]
    progress(id: ID!): [Breadcrumb]
  }
`;
