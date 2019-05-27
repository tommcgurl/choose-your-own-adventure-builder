import {
  ADD_TO_READ_LIST,
  ADD_TO_LIBRARY,
  REMOVE_FROM_LIBRARY,
} from '../constants/actionTypes';

export function addToReadList(id) {
  return { type: ADD_TO_READ_LIST, id };
}

export function addToLibrary(story) {
  return { type: ADD_TO_LIBRARY, story };
}

export function removeFromLibrary(id) {
  return { type: REMOVE_FROM_LIBRARY, id };
}
