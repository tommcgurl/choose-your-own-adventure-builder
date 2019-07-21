import apolloClient from '../../shared/services/apolloClient';
import { GET_GENRES } from '../constants/queries';

export default {
  fetchGenres() {
    return apolloClient.query({ query: GET_GENRES }).then(response => {
      return response.data.genres;
    });
  },
};
