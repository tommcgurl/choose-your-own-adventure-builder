import { gql } from 'apollo-boost';

export const GET_ADVENTURES = gql`
  {
    adventures {
      id
      title
      authors {
        username
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
      items {
        prompt
        options
        limit
      }
      mainStory {
        firstPart
        storyParts
      }
    }
  }
`;
