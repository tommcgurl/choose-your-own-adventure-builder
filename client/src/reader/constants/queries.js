import { gql } from 'apollo-boost';

export const GET_ADVENTURES = gql`
  query adventures($first: Int!, $publishedBefore: DateTime) {
    adventures(first: $first, publishedBefore: $publishedBefore) {
      id
      title
      authors {
        username
      }
      published
    }
  }
`;

export const GET_ADVENTURE = gql`
  query adventure($id: ID!) {
    adventure(id: $id) {
      id
      authors {
        username
      }
      title
      intro
      items
      mainStory
    }
  }
`;
