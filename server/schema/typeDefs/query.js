const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    paginatedAdventures(search: AdventureSearchInput!): PaginatedAdventures
    adventure(id: ID!): Adventure
    user(username: String): User
    genres: [Genre]
  }
`;
