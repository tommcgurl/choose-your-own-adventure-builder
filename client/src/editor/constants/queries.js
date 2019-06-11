import { gql } from 'apollo-boost';

export const GET_ADVENTURES_AUTHORED_BY_REQUESTING_USER = gql`
  {
    adventuresByRequestingUser {
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
      }
    }
  }
`;

export const GET_GENRES = gql`
  {
    genres {
      id
      name
    }
  }
`;
