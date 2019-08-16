const { gql } = require('apollo-server-express');

module.exports = gql`
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
    searchString: String
    genres: [Genre]
  }
`;
