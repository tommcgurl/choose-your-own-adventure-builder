import { loop, Cmd } from 'redux-loop';
import initialState from './initialState';
import * as types from '../constants/actionTypes';
import StoryService from '../services/StoryService';
import { fetchStorySuccessful } from '../actions/storyActions';

export default function storyReducer(story = initialState.story, action) {
  switch (action.type) {
    case types.FETCH_STORY:
      return loop(
        { ...story },
        Cmd.run(() => StoryService.getStory(action.id), {
          successActionCreator: fetchStorySuccessful,
        }),
      );
    case types.FETCH_STORY_SUCCESSFUL:
      return { ...action.story };
    default:
      return { ...story };
  }
}
