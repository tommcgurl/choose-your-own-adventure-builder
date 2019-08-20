const { gql } = require('apollo-server-express');

module.exports = gql`
  type LibraryBook {
    userId: ID
    user: User
    adventureId: ID
    adventure: Adventure
    progress: [Breadcrumb]
  }
`;
