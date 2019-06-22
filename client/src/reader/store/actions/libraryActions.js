import * as types from '../../../shared/constants/actionTypes';

export function addToLibrary(story) {
  return { type: types.ADD_TO_LIBRARY, story };
}

export function getUserLibrary() {
  return { type: types.FETCH_LIBRARY };
}

export function getUserLibrarySuccess(library) {
  return { type: types.FETCH_LIBRARY_SUCESS, library };
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
    adventure: { ...response.data.adventure },
  };
}

export function fetchAdventureFail() {
  return {
    type: types.FETCH_ADVENTURE_FAIL,
  };
}
