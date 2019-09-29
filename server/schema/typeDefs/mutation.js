const { gql } = require('apollo-server-express');

module.exports = gql`
  type Mutation {
    saveDraft(adventure: AdventureInput!): Adventure
    saveToLibrary(adventureId: String!, progress: [BreadcrumbInput]!): String
    removeFromLibrary(adventureId: String!): String
    deleteDraft(adventureId: String!): String
    addReview(adventureId: String!, review: ReviewInput!): String
    updateReview(reviewId: String!, updatedReview: ReviewInput!): String
  }
`;
