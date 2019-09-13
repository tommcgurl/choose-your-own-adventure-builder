const actionTypeRoot = '[READER_LIBRARY]';

export const ADD_TO_LIBRARY = `${actionTypeRoot} ADD_TO_LIBRARY`;
export function addToLibrary(adventure) {
  return { type: ADD_TO_LIBRARY, adventure };
}

export const FETCH_LIBRARY = `${actionTypeRoot} FETCH_LIBRARY`;
export function getUserLibrary() {
  return { type: FETCH_LIBRARY };
}

export const FETCH_LIBRARY_SUCCESS = `${actionTypeRoot} FETCH_LIBRARY_SUCCESS`;
export function getUserLibrarySuccess(library) {
  return { type: FETCH_LIBRARY_SUCCESS, library };
}

export const REMOVE_FROM_LIBRARY = `${actionTypeRoot} REMOVE_FROM_LIBRARY`;
export function removeFromLibrary(id) {
  return { type: REMOVE_FROM_LIBRARY, id };
}

export const FETCH_ADVENTURE = `${actionTypeRoot} FETCH_ADVENTURE`;
export function fetchAdventure(id) {
  return {
    type: FETCH_ADVENTURE,
    id,
  };
}

export const FETCH_ADVENTURE_SUCCESSFUL = `${actionTypeRoot} FETCH_ADVENTURE_SUCCESSFUL`;
export function fetchAdventureSuccessful(adventure) {
  return {
    type: FETCH_ADVENTURE_SUCCESSFUL,
    adventure,
  };
}

export const FETCH_ADVENTURE_FAIL = `${actionTypeRoot} FETCH_ADVENTURE_FAIL`;
export function fetchAdventureFail() {
  return {
    type: FETCH_ADVENTURE_FAIL,
  };
}

export const FETCH_PROGRESS = `${actionTypeRoot} FETCH_PROGRESS`;
export function fetchProgress(id) {
  return {
    type: FETCH_PROGRESS,
    id,
  };
}

export const FETCH_PROGRESS_SUCCESS = `${actionTypeRoot} FETCH_PROGRESS_SUCCESS`;
export function fetchProgressSuccessful(id) {
  return response => {
    return {
      type: FETCH_PROGRESS_SUCCESS,
      progress: response.data.progress,
      id,
    };
  };
}

export const UPDATE_CURRENT_POSITION = `${actionTypeRoot} UPDATE_CURRENT_POSITION`;
export function updateCurrentProgressPosition(adventureId, newPosition) {
  return {
    type: UPDATE_CURRENT_POSITION,
    id: adventureId,
    position: newPosition,
  };
}

export const ADD_BREADCRUMB = `${actionTypeRoot} ADD_BREADCRUMB`;
export function addBreadcrumb(adventureId, breadcrumb) {
  return {
    type: ADD_BREADCRUMB,
    id: adventureId,
    breadcrumb,
  };
}

export const REMOVE_BREADCRUMB = `${actionTypeRoot} REMOVE_BREADCRUMB`;
export function removeBreadcrumb(adventureId) {
  return {
    type: REMOVE_BREADCRUMB,
    id: adventureId,
  };
}
