const { gql } = require('apollo-server-express');

module.exports = {
  review: gql`
    type Review {
      id: ID
      user: User
      adventureId: String
      rating: Int
      headline: String
      reviewBody: String
    }
  `,
  reviewInput: gql`
    input ReviewInput {
      id: ID!
      user: UserInput
      adventureId: String
      rating: Int
      headline: String
      reviewBody: String
    }
  `,
};
