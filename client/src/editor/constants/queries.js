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
        blurb
        items
        firstPartId
        storyParts
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
        blurb
        items
        firstPartId
        storyParts
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
