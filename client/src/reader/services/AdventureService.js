import apolloClient from '../../shared/services/apolloClient';
import { GET_ADVENTURE, GET_ADVENTURES } from '../constants/queries';
import convertPlotsToHtml from '../helpers/convertPlotsToHtml';

export function getAdventure(id) {
  return apolloClient
    .query({ query: GET_ADVENTURE, variables: { id } })
    .then(response => {
      console.log(response);
      return (
        response.data &&
        response.data.adventure &&
        response.data.adventure.adventure && {
          ...response.data.adventure,
          adventure: convertPlotsToHtml(response.data.adventure.adventure),
        }
      );
    });
}

export function getAdventures(first, publishedBefore) {
  return apolloClient
    .query({
      query: GET_ADVENTURES,
      variables: { first, publishedBefore },
    })
    .then(response => response.data.paginatedAdventures);
}
