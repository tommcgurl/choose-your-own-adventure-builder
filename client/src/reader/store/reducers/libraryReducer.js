import { Cmd, loop } from 'redux-loop';
import { types as authActionTypes } from '../../../shared/store/actions/authActions';
import adventureService from '../../services/adventureService';
import libraryService from '../../services/libraryService';
import {
  fetchAdventureFail,
  fetchAdventureSuccessful,
  fetchProgressSuccessful,
  getUserLibrarySuccess,
  types,
} from '../actions/libraryActions';
import initialState from '../initialState';

export default function libraryReducer(library = initialState.library, action) {
  switch (action.type) {
    case authActionTypes.AUTHENTICATED:
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
            adventure: libraryBook.adventure,
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
          Cmd.run(adventureService.getAdventure, {
            args: [action.id],
            successActionCreator: fetchAdventureSuccessful,
            failActionCreator: fetchAdventureFail,
          })
        );
      }
    }
    case types.FETCH_ADVENTURE_SUCCESSFUL: {
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
    case types.FETCH_ADVENTURE_FAIL: {
      // TODO figure out what to return in order to indicate failure
      return library;
    }
    case types.ADD_TO_LIBRARY: {
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
    case authActionTypes.LOG_OUT: {
      return {};
    }
    default:
      return library;
  }
}

function getFirstBreadcrumb(adventure) {
  return {
    storyPartKey: adventure.mainStory.start.nextBranch,
    position: 0,
    inventory: {},
    stats: {},
  };
}

// function convertAdventurePlotsToBeReaderReady(adventure) {
//   const intro = draftToHtml(adventure.intro);

//   const readerReadyStoryParts = {};

//   Object.keys(adventure.mainStory.storyParts).forEach(key => {
//     readerReadyStoryParts[key] = {
//       ...adventure.mainStory.storyParts[key],
//       plot: splitContent(draftToHtml(adventure.mainStory.storyParts[key].plot)),
//     };
//   });

//   return {
//     ...adventure,
//     intro,
//     mainStory: {
//       ...adventure.mainStory,
//       storyParts: readerReadyStoryParts,
//     },
//   };
// }

// function convertPlotsToReaderReady(adventure) {
//   adventure = convertPlotsToHtml(adventure);
//   const readerReadyStoryParts = {};
//   Object.keys(adventure.mainStory.storyParts).forEach(key => {
//     readerReadyStoryParts[key] = {
//       ...adventure.mainStory.storyParts[key],
//       plot: splitContent(adventure.mainStory.storyParts[key].plot),
//     };
//   });
//
//   return {
//     ...adventure,
//     mainStory: {
//       ...adventure.mainStory,
//       storyParts: readerReadyStoryParts,
//     },
//   };
// }
