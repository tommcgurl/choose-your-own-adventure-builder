import apolloClient from '../../shared/services/apolloClient';
import { GET_ADVENTURE, GET_ADVENTURES } from '../constants/queries';
import convertPlotsToHtml from '../helpers/convertPlotsToHtml';

export default {
  getAdventure(id) {
    return apolloClient
      .query({ query: GET_ADVENTURE, variables: { id } })
      .then(response => {
        return (
          response.data &&
          response.data.adventure &&
          convertPlotsToHtml(response.data.adventure)
        );
      });
  },
  getAdventures(take, publishedBefore, searchString, genres) {
    return apolloClient
      .query({
        query: GET_ADVENTURES,
        variables: { search: { take, publishedBefore, searchString, genres } },
      })
      .then(response => response.data.paginatedAdventures);
  },
};
