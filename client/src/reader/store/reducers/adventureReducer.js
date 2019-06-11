import { Cmd, loop } from 'redux-loop';
import * as types from '../../../shared/constants/actionTypes';
import AdventureService from '../../services/AdventureService';
import {
  fetchAdventureFail,
  fetchAdventureSuccessful,
} from '../actions/adventureActions';
import initialState from '../initialState';

export default function adventureReducer(
  adventure = initialState.adventure,
  action
) {
  switch (action.type) {
    case types.FETCH_ADVENTURE:
      return loop(
        { ...adventure },
        Cmd.run(AdventureService.getAdventure, {
          args: [action.id],
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
