import apolloClient from '../../shared/services/apolloClient';
import { REMOVE_FROM_LIBRARY, SAVE_TO_LIBRARY } from '../constants/mutations';
import { GET_LIBRARY, GET_PROGRESS } from '../constants/queries';

export function addStoryToLibrary(id) {
  return apolloClient.mutate({ mutation: SAVE_TO_LIBRARY, variables: { id } });
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

export function getProgress(id) {
  return apolloClient.query({ query: GET_PROGRESS, variables: { id } });
}

export function updateProgress(id, progress) {
  return apolloClient.mutate({
    mutation: SAVE_TO_LIBRARY,
    variables: { id, progress },
  });
}
