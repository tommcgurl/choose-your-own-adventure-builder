const { gql } = require('apollo-server-express');

module.exports = gql`
  type Mutation {
    saveAdventure(adventure: AdventureInput!): Adventure
    addToLibrary(id: String): String
    removeFromLibrary(id: String): String
    deleteDraft(id: String): String
  }
`;
