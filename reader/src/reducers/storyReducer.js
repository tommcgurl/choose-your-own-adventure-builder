import { loop, Cmd } from 'redux-loop';
import initialState from './initialState';
import * as types from '../actions/actionTypes';
import StoryService from '../services/StoryService';
import { storiesFetchSuccessfulAction } from '../actions/storyActions';

export default function storyReducer(stories = initialState.stories, action) {
  console.log('storyReducer');
  switch (action.type) {
    case types.INIT:
      return loop(
        [...stories],
        Cmd.run(StoryService.getStories, {
          successActionCreator: storiesFetchSuccessfulAction,
        }),
      );
    case types.FETCH_STORIES_SUCCESSFUL:
      return [...action.stories];
    default:
      return [...stories];
  }
}
