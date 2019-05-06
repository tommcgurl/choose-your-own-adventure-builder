import { loop, Cmd } from 'redux-loop';
import initialState from '../store/initialState';
import * as types from '../constants/actionTypes';
import {
  adventuresFetchSuccessful,
  adventuresFetchFail,
} from '../actions/adventureActions';
import apolloClient from '../apolloClient';
import { GET_ADVENTURES } from '../constants/queries';

export default function adventuresReducer(
  adventures = initialState.adventures,
  action
) {
  switch (action.type) {
    case types.FETCH_ADVENTURES:
      return loop(
        [...adventures],
        Cmd.run(apolloClient.query, {
          args: [{ query: GET_ADVENTURES }],
          successActionCreator: adventuresFetchSuccessful,
          failActionCreator: adventuresFetchFail,
        })
      );
    case types.FETCH_ADVENTURES_SUCCESSFUL:
      return [...action.adventures];
    case types.FETCH_ADVENTURES_FAIL:
      return [...adventures];
    default:
      return [...adventures];
  }
}
