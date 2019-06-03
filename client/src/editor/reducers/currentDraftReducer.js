import * as types from '../constants/actionTypes';
import initialState from '../store/initialState';

export default function currentDraftReducer(
  currentDraftId = initialState.currentDraftId,
  action
) {
  switch (action.type) {
    case types.CREATE_DRAFT_SUCCESS:
      return action.draft.id;
    case types.SELECT_DRAFT:
      return action.id;
    case types.DELETE_DRAFT:
      return null;
    default:
      return currentDraftId;
  }
}
