const { gql } = require('apollo-server-express');

module.exports = gql`
  # Scalars
  scalar JSON
  scalar DateTime

  type Query {
    paginatedAdventures(search: AdventureSearchInput!): PaginatedAdventures
    adventure(id: ID!): Adventure
    user(username: String): User
    genres: [Genre]
    reviews: [Review]
  }

  type Mutation {
    saveDraft(adventure: AdventureInput!): Adventure
    saveToLibrary(adventureId: String!, progress: [BreadcrumbInput]!): String
    removeFromLibrary(adventureId: String!): String
    deleteDraft(adventureId: String!): String
    addReview(adventureId: String!, review: ReviewInput!): String
    updateReview(updatedReview: ReviewInput!): String
    deleteReview(reviewId: String!): String
  }

  # Adventures

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

  # Adventure Search

  input AdventureSearchInput {
    take: Int!
    publishedBefore: DateTime
    searchString: String
    genres: [GenreInput]
  }

  type PaginatedAdventures {
    adventures: [Adventure]
    pageInfo: PageInfo
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
    searchString: String
    genres: [Genre]
  }

  # Adventure Reviews

  type Review {
    id: ID
    user: User
    adventureId: String
    rating: Int
    headline: String
    reviewBody: String
  }

  input ReviewInput {
    id: ID!
    user: UserInput
    adventureId: String
    rating: Int
    headline: String
    reviewBody: String
  }

  # Adventure Progress

  type LibraryBook {
    userId: ID
    user: User
    adventureId: ID
    adventure: Adventure
    progress: [Breadcrumb]
  }

  type Breadcrumb {
    storyPartKey: String!
    position: Int!
    inventory: JSON
    stats: JSON
  }

  input BreadcrumbInput {
    storyPartKey: String!
    position: Int!
    inventory: JSON
    stats: JSON
  }

  # Users

  type User {
    id: ID
    username: String
    bio: String
    photo: String
    bibliography: [Adventure]
    drafts: [Adventure]
    library: [LibraryBook]
    reviews: [Review]
  }

  input UserInput {
    id: ID
    username: String
    bio: String
    photo: String
  }

  # Lists

  type Genre {
    id: Int
    name: String
    description: String
  }

  input GenreInput {
    id: Int!
    name: String
    description: String
  }
`;
