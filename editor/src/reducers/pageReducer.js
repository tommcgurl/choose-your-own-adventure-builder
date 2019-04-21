import initialState from '../store/initialState';
import * as types from '../constants/actionTypes';

export default function pageReducer(page = initialState.page, action) {
  switch (action.type) {
    case types.NAVIGATE:
      return action.page;
    default:
      return page;
  }
}
