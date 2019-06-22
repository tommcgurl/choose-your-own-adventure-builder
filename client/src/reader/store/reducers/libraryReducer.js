import { Cmd, loop } from 'redux-loop';
import * as types from '../../../shared/constants/actionTypes';
import LibraryService from '../../services/LibraryService';
import { getUserLibrarySuccess } from '../actions/libraryActions';
import initialState from '../initialState';

export default function libraryReducer(library = initialState.library, action) {
  switch (action.type) {
    case types.FETCH_ADVENTURE:
      if (library[action.id]) {
        return { ...library };
      } else {
        return loop(
          { ...library },
          Cmd.run(LibraryService.addStoryToLibrary, {
            args: [action.id],
          })
        );
      }
    case types.REMOVE_FROM_LIBRARY: {
      if (library[action.id]) {
        const updatedLibrary = { ...library };
        delete updatedLibrary[action.id];
        return loop(
          updatedLibrary,
          Cmd.run(LibraryService.removeStoryFromLibrary, {
            args: [action.id],
          })
        );
      }
      return { ...library };
    }
    case types.FETCH_ADVENTURE_SUCCESSFUL:
      if (library[action.adventure.id]) {
        return { ...library };
      } else {
        return {
          ...library,
          [action.adventure.id]: { adventure: action.adventure, progress: {} }, // TODO figure out what progress is
        };
      }
    case types.AUTHENTICATED:
    case types.FETCH_LIBRARY:
      return loop(
        { ...library },
        Cmd.run(LibraryService.fetchLibrary, {
          successActionCreator: getUserLibrarySuccess,
        })
      );
    case types.FETCH_LIBRARY_SUCESS:
      return action.library.reduce((acc, nextAdventure) => {
        return {
          ...acc,
          [nextAdventure.id]: {
            adventure: nextAdventure,
            progress: {}, // TODO ???
          },
        };
      }, {});
    case types.LOG_OUT:
      return {};
    default:
      return { ...library };
  }
}
