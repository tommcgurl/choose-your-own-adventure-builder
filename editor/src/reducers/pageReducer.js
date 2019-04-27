import initialState from '../store/initialState';
import * as types from '../constants/actionTypes';
import * as routes from '../constants/routes';

export default function pageReducer(page = initialState.page, action) {
  switch (action.type) {
    case types.SELECT_DRAFT:
    case types.CREATE_DRAFT_SUCCESS:
      return routes.DRAFT;
    case types.NAVIGATE:
      return action.page;
    default:
      return page;
  }
}
