const { gql } = require('apollo-server-express');

module.exports = gql`
  type Items {
    prompt: String
    options: JSON
    limit: Int
  }
`;
