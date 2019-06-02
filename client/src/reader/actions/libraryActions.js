import { ADD_TO_LIBRARY, REMOVE_FROM_LIBRARY } from '../constants/actionTypes';

export function addToLibrary(story) {
  return { type: ADD_TO_LIBRARY, story };
}

export function removeFromLibrary(id) {
  return { type: REMOVE_FROM_LIBRARY, id };
}
