import initialState from '../store/initialState';
import * as types from '../constants/actionTypes';
import * as routes from '../constants/routes';

export default function pageReducer(page = initialState.page, action) {
  switch (action.type) {
    case types.NAVIGATE:
      return action.page;
    case types.FETCH_ADVENTURE_SUCCESSFUL:
      return routes.READ;
    default:
      return page;
  }
}
