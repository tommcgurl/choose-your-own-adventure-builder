const { gql } = require('apollo-server-express');

module.exports = gql`
  type Items {
    prompt: String
    options: String
    limit: Int
  }
`;
