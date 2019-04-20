import { ADD_TO_READ_LIST } from '../constants/actionTypes';

export function addToReadList(id) {
  return { type: ADD_TO_READ_LIST, id };
}
