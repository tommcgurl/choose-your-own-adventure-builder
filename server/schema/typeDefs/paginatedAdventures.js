const { gql } = require('apollo-server-express');

module.exports = gql`
  type PaginatedAdventures {
    adventures: [Adventure]
    pageInfo: PageInfo
  }
`;
