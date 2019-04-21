import {
  FETCH_STORIES_SUCCESSFUL,
  FETCH_STORIES_FAIL,
  FETCH_STORIES,
  FETCH_STORY_SUCCESSFUL,
  FETCH_STORY_FAIL,
  FETCH_STORY,
} from '../constants/actionTypes';

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

export function storiesFetchFail() {
  return {
    type: FETCH_STORIES_FAIL,
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

export function fetchStoryFail() {
  return {
    type: FETCH_STORY_FAIL,
  };
}

