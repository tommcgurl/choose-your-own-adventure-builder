import { Cmd, loop } from 'redux-loop';
import * as types from '../../../shared/constants/actionTypes';
import LibraryService from '../../services/LibraryService';
import { getUserLibrarySuccess } from '../actions/libraryActions';
import initialState from '../initialState';

export default function libraryReducer(library = initialState.library, action) {
  switch (action.type) {
    case types.FETCH_ADVENTURE:
      if (library.map(story => story.id).indexOf(action.id) >= 0) {
        return [...library];
      } else {
        return loop(
          [...library],
          Cmd.run(LibraryService.addStoryToLibrary, {
            args: [action.id],
          })
        );
      }
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
      if (library.map(a => a.id).indexOf(action.adventure.id) >= 0) {
        return [...library];
      } else {
        return [...library, action.adventure];
      }
    case types.AUTHENTICATED:
    case types.FETCH_LIBRARY:
      return loop(
        [...library],
        Cmd.run(LibraryService.fetchLibrary, {
          successActionCreator: getUserLibrarySuccess,
        })
      );
    case types.FETCH_LIBRARY_SUCESS:
      return [...action.library];
    case types.LOG_OUT:
      return [];
    default:
      return [...library];
  }
}
