const { gql } = require('apollo-server-express');

module.exports = {
  user: gql`
    type User {
      id: ID
      username: String
    }
  `,
  userInput: gql`
    input UserInput {
      id: ID
      username: String
    }
  `,
};
