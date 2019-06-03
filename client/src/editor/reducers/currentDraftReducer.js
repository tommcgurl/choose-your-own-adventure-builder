import * as types from '../constants/actionTypes';
import initialState from '../store/initialState';

export default function currentDraftReducer(
  currentDraftId = initialState.currentDraftId,
  action
) {
  switch (action.type) {
    case types.CREATE_DRAFT:
      return action.draft.id;
    case types.SELECT_DRAFT:
      return action.id;
    default:
      return currentDraftId;
  }
}
