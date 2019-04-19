import { FETCH_STORIES_SUCCESSFUL, INIT } from './actionTypes';

export function fetchStoriesAction() {
  return {
    type: INIT,
  };
}

export function storiesFetchSuccessfulAction(stories) {
  return {
    type: FETCH_STORIES_SUCCESSFUL,
    stories,
  };
}
