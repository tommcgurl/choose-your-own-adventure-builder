import { Cmd, loop } from 'redux-loop';
import * as types from '../../../shared/constants/actionTypes';
import draftService from '../../services/adventureDraftService';
import { fetchAdventuresAuthoredByUserSuccess } from '../actions/draftActions';
import initialState from '../initialState';

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
