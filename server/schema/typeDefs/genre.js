const { gql } = require('apollo-server-express');

module.exports = {
  genre: gql`
    type Genre {
      id: Int
      name: String
    }
  `,
  genreInput: gql`
    input GenreInput {
      id: Int
      name: String
    }
  `,
};
