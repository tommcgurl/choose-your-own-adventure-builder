const { gql } = require('apollo-server-express');

module.exports = {
  adventure: gql`
    type Adventure {
      id: ID
      authors: [User]
      published: DateTime
      title: String
      blurb: JSON
      items: JSON
      firstPartId: String
      storyParts: JSON
      genre: Genre
      coverImage: String
      reviews: [Review]
    }
  `,
  adventureInput: gql`
    input AdventureInput {
      id: ID
      authors: [UserInput]
      published: DateTime
      title: String
      blurb: JSON
      items: JSON
      firstPartId: String
      storyParts: JSON
      genre: GenreInput
      coverImage: String
    }
  `,
  adventureSearchInput: gql`
    input AdventureSearchInput {
      take: Int!
      publishedBefore: DateTime
      searchString: String
      genres: [GenreInput]
    }
  `,
};
