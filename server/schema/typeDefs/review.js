const { gql } = require('apollo-server-express');

module.exports = {
  review: gql`
    type Review {
      id: ID
      adventureId: String
      rating: Int
      headline: String
      reviewBody: String
    }
  `,
  reviewInput: gql`
    input ReviewInput {
      id: ID!
      rating: Int
      headline: String
      reviewBody: String
    }
  `,
};
