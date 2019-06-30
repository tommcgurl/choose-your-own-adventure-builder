import apolloClient from '../../shared/services/apolloClient';
import { SAVE_TO_LIBRARY, REMOVE_FROM_LIBRARY } from '../constants/mutations';
import { GET_LIBRARY, GET_PROGRESS } from '../constants/queries';
import omitTypename from '../../shared/helpers/omitTypename';

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
  progress = JSON.parse(JSON.stringify(progress), omitTypename);
  return apolloClient.mutate({
    mutation: SAVE_TO_LIBRARY,
    variables: { id, progress },
  });
}
