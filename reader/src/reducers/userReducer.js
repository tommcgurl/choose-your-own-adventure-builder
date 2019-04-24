import { loop, Cmd } from 'redux-loop';
import * as types from '../constants/actionTypes';
import initialState from '../store/initialState';
import LibraryService from '../services/LibraryService';
import { removeFromLibrary } from '../actions/userActions';

export default function userReducer(user = initialState.user, action) {
  switch (action.type) {
    case types.ADD_TO_READ_LIST:
      return { ...user, storiesRead: [...user.adventuresRead, action.id] };

    case types.ADD_TO_LIBRARY:
      if (user.library.map(story => story.id).indexOf(action.story.id) < 0) {
        return loop(
          { ...user, library: [...user.library, action.story] },
          Cmd.run(LibraryService.addStoryToLibrary, {
            args: [action.story],
            failActionCreator: () => removeFromLibrary(action.story.id),
          }),
        );
      }

      return { ...user };

    case types.REMOVE_FROM_LIBRARY:
      if (user.library.map(story => story.id).indexOf(action.id) >= 0) {
        return loop(
          {
            ...user,
            library: user.library.filter(story => story.id !== action.id),
          },
          Cmd.run(LibraryService.removeStoryFromLibrary, {
            args: [action.id],
          }),
        );
      }

      return { ...user };

    default:
      return { ...user };
  }
}
