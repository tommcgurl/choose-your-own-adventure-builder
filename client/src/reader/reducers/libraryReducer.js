import { Cmd, loop } from 'redux-loop';
import * as types from '../constants/actionTypes';
import LibraryService from '../services/LibraryService';
import initialState from '../store/initialState';

export default function libraryReducer(library = initialState.library, action) {
  switch (action.type) {
    case types.FETCH_ADVENTURE:
      return loop(
        [...library],
        Cmd.run(LibraryService.addStoryToLibrary, {
          args: [action.id],
        })
      );

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

    case types.FETCH_ADVENTURE_SUCCESSFUL:
      return [...library, action.adventure];

    default:
      return [...library];
  }
}
