import { loop, Cmd } from 'redux-loop';
import initialState from '../store/initialState';
import * as types from '../constants/actionTypes';
import StoryService from '../services/StoryService';
import {
  storiesFetchSuccessful,
  storiesFetchFail,
} from '../actions/storyActions';

export default function storiesReducer(stories = initialState.stories, action) {
  switch (action.type) {
    case types.FETCH_STORIES:
      return loop(
        [...stories],
        Cmd.run(StoryService.getStories, {
          successActionCreator: storiesFetchSuccessful,
          failActionCreator: storiesFetchFail,
        }),
      );
    case types.FETCH_STORIES_SUCCESSFUL:
      return [...action.stories];
    case types.FETCH_STORIES_FAIL:
      return [...stories];
    default:
      return [...stories];
  }
}
