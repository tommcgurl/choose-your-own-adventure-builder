import { gql } from 'apollo-boost';

export const GET_DRAFTS = gql`
  {
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
    }
  }
`;
