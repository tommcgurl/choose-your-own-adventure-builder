import initialState from '../store/initialState';
import * as types from '../constants/actionTypes';

export default function currentDraftReducer(
  currentDraftId = initialState.currentDraftId,
  action,
) {
  switch (action.type) {
    case types.CREATE_DRAFT_SUCCESS:
      return action.draft.id;
    case types.SELECT_DRAFT:
      return action.id;
    default:
      return currentDraftId;
  }
}
