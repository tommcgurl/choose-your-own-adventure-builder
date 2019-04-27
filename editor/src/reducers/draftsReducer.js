import { loop, Cmd } from 'redux-loop';
import initialState from '../store/initialState';
import * as types from '../constants/actionTypes';
import DraftService from '../services/DraftService';
import {
  fetchDraftsSuccess,
  fetchDraftsFail,
  createDraftSuccess,
  createDraftFail,
} from '../actions/draftActions';

export default function draftsReducer(drafts = initialState.drafts, action) {
  switch (action.type) {
    case types.FETCH_DRAFTS:
      return loop(
        [...drafts],
        Cmd.run(DraftService.getDrafts, {
          successActionCreator: fetchDraftsSuccess,
          failActionCreator: fetchDraftsFail,
        }),
      );
    case types.FETCH_DRAFTS_SUCCESS:
      console.log(action);
      return [...action.drafts];
    case types.FETCH_DRAFTS_FAIL:
      return [...drafts];
    case types.CREATE_DRAFT:
      return loop(
        [...drafts],
        Cmd.run(DraftService.createDraft, {
          args: [
            {
              title: action.title,
              authorIds: [action.authorId],
            },
          ],
          successActionCreator: createDraftSuccess,
          failActionCreator: createDraftFail,
        }),
      );
    case types.CREATE_DRAFT_SUCCESS:
      return [...drafts, action.draft];
    case types.CREATE_DRAFT_FAIL:
      return [...drafts];
    default:
      return [...drafts];
  }
}
