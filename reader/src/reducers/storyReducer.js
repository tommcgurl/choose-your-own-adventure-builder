import { loop, Cmd } from 'redux-loop';
import initialState from '../store/initialState';
import * as types from '../constants/actionTypes';
import StoryService from '../services/StoryService';
import {
  fetchStorySuccessful,
  fetchStoryFail,
} from '../actions/storyActions';

export default function storyReducer(story = initialState.story, action) {
  switch (action.type) {
    case types.FETCH_STORY:
      return loop(
        { ...story },
        Cmd.run(StoryService.getStory, {
          args: [action.id],
          successActionCreator: fetchStorySuccessful,
          failActionCreator: fetchStoryFail,
        }),
      );
    case types.FETCH_STORY_SUCCESSFUL:
      return { ...action.story };
    case types.FETCH_STORY_FAIL:
      // TODO figure out what to return in order to indicate failure
      return {}
    default:
      return { ...story };
  }
}
