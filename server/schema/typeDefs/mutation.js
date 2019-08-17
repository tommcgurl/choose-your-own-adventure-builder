const { gql } = require('apollo-server-express');

module.exports = gql`
  type Mutation {
    saveAdventure(adventure: AdventureInput!): Adventure
    saveToLibrary(id: String!, progress: [BreadcrumbInput]!): String
    removeFromLibrary(id: String): String
    deleteDraft(id: String): String
    createUser(userInput: UserInput!): User
  }
`;
