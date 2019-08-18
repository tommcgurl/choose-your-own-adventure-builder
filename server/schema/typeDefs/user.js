const { gql } = require('apollo-server-express');

module.exports = {
  user: gql`
    type User {
      id: ID
      username: String
      bio: String
      photo: String
      bibliography: [Adventure]
    }
  `,
  userInput: gql`
    input UserInput {
      id: ID
      username: String
      bio: String
      photo: String
    }
  `,
};
