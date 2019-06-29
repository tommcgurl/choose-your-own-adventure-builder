import { Cmd, loop } from 'redux-loop';
import * as types from '../../../shared/constants/actionTypes';
import AdventureService from '../../services/AdventureService';
import * as libraryService from '../../services/libraryService';
import {
  fetchAdventureFail,
  fetchAdventureSuccessful,
  getUserLibrarySuccess,
} from '../actions/libraryActions';
import initialState from '../initialState';

export default function libraryReducer(library = initialState.library, action) {
  switch (action.type) {
    case types.FETCH_ADVENTURE:
      if (library[action.id]) {
        return { ...library };
      } else {
        return loop(
          { ...library },
          Cmd.run(AdventureService.getAdventure, {
            args: [action.id],
            successActionCreator: fetchAdventureSuccessful,
            failActionCreator: fetchAdventureFail,
          })
        );
      }
    case types.FETCH_ADVENTURE_SUCCESSFUL:
      if (library[action.adventure.id]) {
        return { ...library };
      } else {
        return loop(
          {
            ...library,
            [action.adventure.id]: {
              adventure: action.adventure,
              progress: {},
            }, // TODO figure out what progress is
          },
          Cmd.run(libraryService.addStoryToLibrary, {
            args: [action.adventure.id],
          })
        );
      }
    case types.FETCH_ADVENTURE_FAIL:
      // TODO figure out what to return in order to indicate failure
      return { ...library };
    case types.REMOVE_FROM_LIBRARY: {
      if (library[action.id]) {
        const updatedLibrary = { ...library };
        delete updatedLibrary[action.id];
        return loop(
          updatedLibrary,
          Cmd.run(libraryService.removeStoryFromLibrary, {
            args: [action.id],
          })
        );
      }
      return { ...library };
    }

    case types.AUTHENTICATED:
    case types.FETCH_LIBRARY:
      return loop(
        { ...library },
        Cmd.run(libraryService.fetchLibrary, {
          successActionCreator: getUserLibrarySuccess,
        })
      );
    case types.FETCH_LIBRARY_SUCESS:
      return action.library.reduce((acc, libraryBook) => {
        return {
          ...acc,
          [libraryBook.adventure.id]: {
            adventure: libraryBook.adventure,
            progress: libraryBook.progress,
          },
        };
      }, {});
    case types.LOG_OUT:
      return {};
    default:
      return { ...library };
  }
}
