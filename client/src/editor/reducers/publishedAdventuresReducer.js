import { Cmd, loop } from 'redux-loop';
import * as types from '../../shared/constants/actionTypes';
import { fetchAdventuresAuthoredByUserSuccess } from '../actions/draftActions';
import draftService from '../services/draftService';
import initialState from '../store/initialState';

export default function publishedAdventuresReducer(
  publishedAdventures = initialState.publishedAdventures,
  action
) {
  switch (action.type) {
    case types.FETCH_PUBLISHED_ADVENTURES_AUTHORED_BY_USER: {
      return loop(
        [...publishedAdventures],
        Cmd.run(draftService.getAdventuresAuthoredByUser, {
          successActionCreator: fetchAdventuresAuthoredByUserSuccess,
        })
      );
    }
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
