import { gql } from 'apollo-boost';

export const GET_GENRES = gql`
  {
    genres {
      id
      name
    }
  }
`;
