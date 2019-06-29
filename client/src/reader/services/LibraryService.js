import apolloClient from '../../shared/services/apolloClient';
import { ADD_TO_LIBRARY, REMOVE_FROM_LIBRARY } from '../constants/mutations';
import { GET_LIBRARY } from '../constants/queries';

export function addStoryToLibrary(id) {
  return apolloClient.mutate({ mutation: ADD_TO_LIBRARY, variables: { id } });
}

export function fetchLibrary() {
  return apolloClient
    .query({
      query: GET_LIBRARY,
    })
    .then(response => response.data.library);
}

export function removeStoryFromLibrary(id) {
  return apolloClient.mutate({
    mutation: REMOVE_FROM_LIBRARY,
    variables: { id },
  });
}
