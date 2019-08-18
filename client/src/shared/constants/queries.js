import { gql } from 'apollo-boost';

export const GET_GENRES = gql`
  {
    genres {
      id
      name
    }
  }
`;

export const FIND_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      id
      username
    }
  }
`;
