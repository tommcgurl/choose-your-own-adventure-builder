const { gql } = require('apollo-server-express');

module.exports = gql`
  type Mutation {
    saveDraft(adventure: AdventureInput!): Adventure
  }
`;
