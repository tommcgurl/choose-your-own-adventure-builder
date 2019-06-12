import { gql } from 'apollo-boost';

export const GET_ADVENTURES = gql`
  query paginatedAdventures($first: Int!, $publishedBefore: DateTime) {
    paginatedAdventures(first: $first, publishedBefore: $publishedBefore) {
      adventures {
        id
        title
        authors {
          username
        }
        published
        genre {
          name
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
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
      genre {
        id
        name
      }
    }
  }
`;

export const GET_LIBRARY = gql`
  {
    library {
      id
      authors {
        username
      }
      title
      intro
      items
      mainStory
      genre {
        id
        name
      }
    }
  }
`;
