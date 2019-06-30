import * as types from '../../../shared/constants/actionTypes';

export function addToLibrary(story) {
  return { type: types.ADD_TO_LIBRARY, story };
}

export function getUserLibrary() {
  return { type: types.FETCH_LIBRARY };
}

export function getUserLibrarySuccess(library) {
  return { type: types.FETCH_LIBRARY_SUCCESS, library };
}

export function removeFromLibrary(id) {
  return { type: types.REMOVE_FROM_LIBRARY, id };
}

export function fetchAdventure(id) {
  return {
    type: types.FETCH_ADVENTURE,
    id,
  };
}

export function fetchAdventureSuccessful(response) {
  return {
    type: types.FETCH_ADVENTURE_SUCCESSFUL,
    libraryBook: response.data.adventure,
  };
}

export function fetchAdventureFail() {
  return {
    type: types.FETCH_ADVENTURE_FAIL,
  };
}

export function fetchProgress(id) {
  return {
    type: types.FETCH_PROGRESS,
    id,
  };
}

export function fetchProgressSuccessful(id) {
  return response => {
    return {
      type: types.FETCH_PROGRESS_SUCCESS,
      progress: response.data.progress,
      id,
    };
  };
}

export function updateCurrentProgressPosition(adventureId, newPosition) {
  return {
    type: types.UPDATE_CURRENT_POSITION,
    id: adventureId,
    position: newPosition,
  };
}

export function addBreadcrumb(adventureId, breadcrumb) {
  return {
    type: types.ADD_BREADCRUMB,
    id: adventureId,
    breadcrumb,
  };
}

export function removeBreadcrumb(adventureId) {
  return {
    type: types.REMOVE_BREADCRUMB,
    id: adventureId,
  };
}
