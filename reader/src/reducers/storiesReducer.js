import { loop, Cmd } from 'redux-loop';
import initialState from './initialState';
import * as types from '../constants/actionTypes';
import StoryService from '../services/StoryService';
import { storiesFetchSuccessful } from '../actions/storyActions';

export default function storiesReducer(stories = initialState.stories, action) {
  switch (action.type) {
    case types.FETCH_STORIES:
      return loop(
        [...stories],
        Cmd.run(StoryService.getStories, {
          successActionCreator: storiesFetchSuccessful,
        }),
      );
    case types.FETCH_STORIES_SUCCESSFUL:
      return [...action.stories];
    default:
      return [...stories];
  }
}
