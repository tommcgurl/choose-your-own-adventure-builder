import { types } from '../actions/draftActions';
import initialState from '../initialState';

export default function publishedAdventuresReducer(
  publishedAdventures = initialState.publishedAdventures,
  action
) {
  switch (action.type) {
    case types.FETCH_ADVENTURES_AUTHORED_BY_USER_SUCCESS: {
      return action.adventures.filter(a => a.published);
    }
    case types.PUBLISH_ADVENTURE_SUCCESS: {
      return [...publishedAdventures, action.adventure];
    }
    default:
      return publishedAdventures;
  }
}
