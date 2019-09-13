import { gql } from 'apollo-boost';
import apolloClient from './apolloClient';

export default {
  fetchGenres() {
    const GET_GENRES = gql`
      {
        genres {
          id
          name
          description
        }
      }
    `;
    return apolloClient.query({ query: GET_GENRES }).then(response => {
      return response.data.genres;
    });
  },
};
