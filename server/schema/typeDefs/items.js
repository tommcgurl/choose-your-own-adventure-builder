const { gql } = require('apollo-server-express');

module.exports = {
  items: gql`
    type Items {
      prompt: String
      options: JSON
      limit: Int
    }
  `,
  itemsInput: gql`
    input ItemsInput {
      prompt: String
      options: JSON
      limit: Int
    }
  `,
};
