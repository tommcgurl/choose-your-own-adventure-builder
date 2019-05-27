import { loop, Cmd } from 'redux-loop';
import initialState from '../store/initialState';
import * as types from '../constants/actionTypes';
import {
  adventuresFetchSuccessful,
  adventuresFetchFail,
} from '../actions/adventureActions';
import AdventureService from '../services/AdventureService';

export default function adventuresReducer(
  adventures = initialState.adventures,
  action,
) {
  switch (action.type) {
    case types.FETCH_ADVENTURES:
      return loop(
        [...adventures],
        Cmd.run(AdventureService.getAdventures, {
          successActionCreator: adventuresFetchSuccessful,
          failActionCreator: adventuresFetchFail,
        }),
      );
    case types.FETCH_ADVENTURES_SUCCESSFUL:
      return [...action.adventures];
    case types.FETCH_ADVENTURES_FAIL:
      return [...adventures];
    default:
      return [...adventures];
  }
}
