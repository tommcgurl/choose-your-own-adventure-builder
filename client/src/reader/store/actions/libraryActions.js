export const types = {
  FETCH_ADVENTURE: 'READER_LIBRARY_FETCH_ADVENTURE',
  FETCH_ADVENTURE_SUCCESSFUL: 'READER_LIBRARY_FETCH_ADVENTURE_SUCCESSFUL',
  FETCH_ADVENTURE_FAIL: 'READER_LIBRARY_FETCH_ADVENTURE_FAIL',
  ADD_TO_LIBRARY: 'READER_LIBRARY_ADD_TO_LIBRARY',
  PERSIST_ADVENTURE_PROGRESS_TO_LIBRARY_SUCCESS:
    'READER_LIBRARY_PERSIST_ADVENTURE_PROGRESS_TO_LIBRARY_SUCCESS',
  REMOVE_FROM_LIBRARY: 'READER_LIBRARY_REMOVE_FROM_LIBRARY',
  FETCH_LIBRARY: 'READER_LIBRARY_FETCH_LIBRARY',
  FETCH_LIBRARY_SUCCESS: 'READER_LIBRARY_FETCH_LIBRARY_SUCCESS',
  FETCH_PROGRESS: 'READER_LIBRARY_FETCH_PROGRESS',
  FETCH_PROGRESS_SUCCESS: 'READER_LIBRARY_FETCH_PROGRESS_SUCCESS',
  UPDATE_CURRENT_POSITION: 'READER_LIBRARY_UPDATE_CURRENT_POSITION',
  ADD_BREADCRUMB: 'READER_LIBRARY_ADD_BREADCRUMB',
  REMOVE_BREADCRUMB: 'READER_LIBRARY_REMOVEBREADCRUMB',
};

export function addToLibrary(adventure) {
  return { type: types.ADD_TO_LIBRARY, adventure };
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

export function fetchAdventureSuccessful(adventure) {
  return {
    type: types.FETCH_ADVENTURE_SUCCESSFUL,
    adventure,
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
