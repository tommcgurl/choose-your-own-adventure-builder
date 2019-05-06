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
