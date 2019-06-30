import { Cmd, loop } from 'redux-loop';
import * as types from '../../../shared/constants/actionTypes';
import AdventureService from '../../services/AdventureService';
import * as libraryService from '../../services/libraryService';
import {
  fetchAdventureFail,
  fetchAdventureSuccessful,
  getUserLibrarySuccess,
  fetchProgressSuccessful,
} from '../actions/libraryActions';
import initialState from '../initialState';
import draftToHtml from 'draftjs-to-html';
import { splitContent } from '../../helpers/pageTurner';

export default function libraryReducer(library = initialState.library, action) {
  switch (action.type) {
    case types.AUTHENTICATED:
    case types.FETCH_LIBRARY: {
      return loop(
        library,
        Cmd.run(libraryService.fetchLibrary, {
          successActionCreator: getUserLibrarySuccess,
        })
      );
    }
    case types.FETCH_LIBRARY_SUCCESS: {
      return action.library.reduce((acc, libraryBook) => {
        return {
          ...acc,
          [libraryBook.adventure.id]: {
            adventure: convertAdventurePlotsToBeReaderReady(
              libraryBook.adventure
            ),
            progress: libraryBook.progress,
          },
        };
      }, {});
    }
    case types.FETCH_ADVENTURE: {
      if (library[action.id]) {
        return library;
      } else {
        return loop(
          library,
          Cmd.run(AdventureService.getAdventure, {
            args: [action.id],
            successActionCreator: fetchAdventureSuccessful,
            failActionCreator: fetchAdventureFail,
          })
        );
      }
    }
    case types.FETCH_ADVENTURE_SUCCESSFUL: {
      if (library[action.libraryBook.adventure.id]) {
        return library;
      } else {
        return {
          ...library,
          [action.libraryBook.adventure.id]: {
            adventure: convertAdventurePlotsToBeReaderReady(
              action.libraryBook.adventure
            ),
            progress: action.libraryBook.progress,
          },
        };
      }
    }
    case types.FETCH_ADVENTURE_FAIL: {
      // TODO figure out what to return in order to indicate failure
      return library;
    }
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
      return library;
    }
    case types.FETCH_PROGRESS: {
      return loop(
        library,
        Cmd.run(libraryService.getProgress, {
          args: [action.id],
          successActionCreator: res => fetchProgressSuccessful(action.id)(res),
        })
      );
    }
    case types.FETCH_PROGRESS_SUCCESS: {
      return {
        ...library,
        [action.id]: { ...library[action.id], progress: action.progress },
      };
    }
    case types.UPDATE_CURRENT_POSITION: {
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
    case types.ADD_BREADCRUMB: {
      const progress = [...library[action.id].progress, action.breadcrumb];
      return loop(
        { ...library, [action.id]: { ...library[action.id], progress } },
        Cmd.run(libraryService.updateProgress, { args: [action.id, progress] })
      );
    }
    case types.REMOVE_BREADCRUMB: {
      const progress = library[action.id].progress.slice(
        0,
        library[action.id].progress.length - 1
      );
      return loop(
        { ...library, [action.id]: { ...library[action.id], progress } },
        Cmd.run(libraryService.updateProgress, { args: [action.id, progress] })
      );
    }
    case types.LOG_OUT: {
      return {};
    }
    default:
      return library;
  }
}

function convertAdventurePlotsToBeReaderReady(adventure) {
  const readerReadyIntro = splitContent(draftToHtml(adventure.intro));

  const readerReadyStoryParts = {};

  Object.keys(adventure.mainStory.storyParts).forEach(key => {
    readerReadyStoryParts[key] = {
      ...adventure.mainStory.storyParts[key],
      plot: splitContent(draftToHtml(adventure.mainStory.storyParts[key].plot)),
    };
  });

  return {
    ...adventure,
    intro: readerReadyIntro,
    mainStory: {
      ...adventure.mainStory,
      storyParts: readerReadyStoryParts,
    },
  };
}
