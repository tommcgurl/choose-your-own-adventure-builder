import { Cmd, loop } from 'redux-loop';
import * as types from '../constants/actionTypes';
import LibraryService from '../services/LibraryService';
import initialState from '../store/initialState';

export default function libraryReducer(library = initialState.library, action) {
  switch (action.type) {
    case types.ADD_TO_LIBRARY:
      console.log(library);
      if (library.map(story => story.id).indexOf(action.story.id) < 0) {
        return loop(
          [...library, action.story],
          Cmd.run(LibraryService.addStoryToLibrary, {
            args: [action.story],
          })
        );
      }

      return [...library];

    case types.REMOVE_FROM_LIBRARY:
      if (library.map(story => story.id).indexOf(action.id) >= 0) {
        return loop(
          library.filter(story => story.id !== action.id),
          Cmd.run(LibraryService.removeStoryFromLibrary, {
            args: [action.id],
          })
        );
      }

      return [...library];

    default:
      return [...library];
  }
}
