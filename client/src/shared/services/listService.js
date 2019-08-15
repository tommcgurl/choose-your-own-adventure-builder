import { GET_GENRES } from '../constants/queries';
import apolloClient from './apolloClient';

export default {
  fetchGenres() {
    return apolloClient.query({ query: GET_GENRES }).then(response => {
      return response.data.genres;
    });
  },
};
