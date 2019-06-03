const { gql } = require('apollo-server-express');

module.exports = gql`
  type Mutation {
    saveDraft(adventure: AdventureInput!): Adventure
    addToLibrary(id: String): String
    removeFromLibrary(id: String): String
    deleteDraft(id: String): String
  }
`;
