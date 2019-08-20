import { gql } from 'apollo-boost';

export const GET_DRAFTS = gql`
  {
    user {
      drafts {
        id
        authors {
          username
        }
        title
        intro
        items
        mainStory
        published
        genre {
          id
          name
          description
        }
        coverImage
      }
    }
  }
`;

export const GET_PUBLISHED_ADVENTURES = gql`
  {
    user {
      bibliography {
        id
        authors {
          username
        }
        title
        intro
        items
        mainStory
        published
        genre {
          id
          name
          description
        }
        coverImage
      }
    }
  }
`;
