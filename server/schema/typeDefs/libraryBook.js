const { gql } = require('apollo-server-express');

module.exports = gql`
  type LibraryBook {
    adventure: Adventure
    progress: [Breadcrumb]
  }
`;
