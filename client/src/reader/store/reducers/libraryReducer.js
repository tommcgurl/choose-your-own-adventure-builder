import { Cmd, loop } from 'redux-loop';
import {
  AUTHENTICATED,
  LOG_OUT,
} from '../../../shared/store/actions/authActions';
import adventureService from '../../services/readerAdventureService';
import libraryService from '../../services/readerLibraryService';
import {
  ADD_BREADCRUMB,
  ADD_TO_LIBRARY,
  fetchAdventureFail,
  fetchAdventureSuccessful,
  fetchProgressSuccessful,
  FETCH_ADVENTURE,
  FETCH_ADVENTURE_FAIL,
  FETCH_ADVENTURE_SUCCESSFUL,
  FETCH_LIBRARY,
  FETCH_LIBRARY_SUCCESS,
  FETCH_PROGRESS,
  FETCH_PROGRESS_SUCCESS,
  getUserLibrarySuccess,
  REMOVE_BREADCRUMB,
  REMOVE_FROM_LIBRARY,
  UPDATE_CURRENT_POSITION,
} from '../actions/libraryActions';
import initialState from '../initialState';

export default function libraryReducer(library = initialState.library, action) {
  switch (action.type) {
    case AUTHENTICATED:
    case FETCH_LIBRARY: {
      return loop(
        library,
        Cmd.run(libraryService.fetchLibrary, {
          successActionCreator: getUserLibrarySuccess,
        })
      );
    }
    case FETCH_LIBRARY_SUCCESS: {
      return action.library.reduce((acc, libraryBook) => {
        return {
          ...acc,
          [libraryBook.adventure.id]: {
            adventure: libraryBook.adventure,
            progress: libraryBook.progress,
          },
        };
      }, {});
    }
    case FETCH_ADVENTURE: {
      if (library[action.id]) {
        return library;
      } else {
        return loop(
          library,
          Cmd.run(adventureService.getAdventure, {
            args: [action.id],
            successActionCreator: fetchAdventureSuccessful,
            failActionCreator: fetchAdventureFail,
          })
        );
      }
    }
    case FETCH_ADVENTURE_SUCCESSFUL: {
      if (library[action.adventure.id]) {
        return library;
      } else {
        return {
          ...library,
          [action.adventure.id]: {
            adventure: action.adventure,
          },
        };
      }
    }
    case FETCH_ADVENTURE_FAIL: {
      // TODO figure out what to return in order to indicate failure
      return library;
    }
    case ADD_TO_LIBRARY: {
      function getFirstBreadcrumb(adventure) {
        return {
          storyPartKey: adventure.firstPartId,
          position: 0,
          inventory: {},
          stats: {},
        };
      }
      const progress = [getFirstBreadcrumb(action.adventure)];
      return loop(
        {
          ...library,
          [action.adventure.id]: { adventure: action.adventure, progress },
        },
        Cmd.run(libraryService.updateProgress, {
          args: [action.adventure.id, progress],
        })
      );
    }
    case REMOVE_FROM_LIBRARY: {
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
      return library;
    }
    case FETCH_PROGRESS: {
      return loop(
        library,
        Cmd.run(libraryService.getProgress, {
          args: [action.id],
          successActionCreator: res => fetchProgressSuccessful(action.id)(res),
        })
      );
    }
    case FETCH_PROGRESS_SUCCESS: {
      return {
        ...library,
        [action.id]: { ...library[action.id], progress: action.progress },
      };
    }
    case UPDATE_CURRENT_POSITION: {
      const previousBreadcrumbs = library[action.id].progress.slice(
        0,
        library[action.id].progress.length - 1
      );
      const currentBreadcrumb = {
        ...library[action.id].progress[library[action.id].progress.length - 1],
        position: action.position,
      };
      const progress = [...previousBreadcrumbs, currentBreadcrumb];
      return loop(
        {
          ...library,
          [action.id]: {
            ...library[action.id],
            progress,
          },
        },
        Cmd.run(libraryService.updateProgress, { args: [action.id, progress] })
      );
    }
    case ADD_BREADCRUMB: {
      const progress = [...library[action.id].progress, action.breadcrumb];
      return loop(
        { ...library, [action.id]: { ...library[action.id], progress } },
        Cmd.run(libraryService.updateProgress, { args: [action.id, progress] })
      );
    }
    case REMOVE_BREADCRUMB: {
      const progress = library[action.id].progress.slice(
        0,
        library[action.id].progress.length - 1
      );
      return loop(
        { ...library, [action.id]: { ...library[action.id], progress } },
        Cmd.run(libraryService.updateProgress, { args: [action.id, progress] })
      );
    }
    case LOG_OUT: {
      return {};
    }
    default:
      return library;
  }
}
