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
