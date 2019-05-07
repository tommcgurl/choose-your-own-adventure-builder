import { loop, Cmd } from 'redux-loop';
import initialState from '../store/initialState';
import * as types from '../constants/actionTypes';
import {
  fetchAdventureSuccessful,
  fetchAdventureFail,
} from '../actions/adventureActions';
import apolloClient from '../services/apolloClient';
import { GET_ADVENTURE } from '../constants/queries';

export default function adventureReducer(
  adventure = initialState.adventure,
  action
) {
  switch (action.type) {
    case types.FETCH_ADVENTURE:
      return loop(
        { ...adventure },
        Cmd.run(apolloClient.query, {
          args: [{ query: GET_ADVENTURE, variables: { id: action.id } }],
          successActionCreator: fetchAdventureSuccessful,
          failActionCreator: fetchAdventureFail,
        })
      );
    case types.FETCH_ADVENTURE_SUCCESSFUL:
      return { ...action.adventure };
    case types.FETCH_ADVENTURE_FAIL:
      // TODO figure out what to return in order to indicate failure
      return {};
    default:
      return { ...adventure };
  }
}
