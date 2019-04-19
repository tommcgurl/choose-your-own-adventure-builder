import {
  FETCH_STORIES_SUCCESSFUL,
  FETCH_STORIES,
  FETCH_STORY_SUCCESSFUL,
  FETCH_STORY,
} from './actionTypes';

export function fetchStories() {
  return {
    type: FETCH_STORIES,
  };
}

export function storiesFetchSuccessful(stories) {
  return {
    type: FETCH_STORIES_SUCCESSFUL,
    stories,
  };
}

export function fetchStory(id) {
  return {
    type: FETCH_STORY,
    id,
  };
}

export function fetchStorySuccessful(story) {
  return {
    type: FETCH_STORY_SUCCESSFUL,
    story,
  };
}
