import * as types from '../constants/actionTypes';

export function fetchDrafts(userId) {
  return {
    type: types.FETCH_DRAFTS,
    userId,
  };
}

export function fetchDraftsSuccess(drafts) {
  return {
    type: types.FETCH_DRAFTS_SUCCESS,
    drafts,
  };
}

export function fetchDraftsFail() {
  return {
    type: types.FETCH_DRAFTS_FAIL,
  };
}

export function fetchDraftSuccess(draft) {
  return {
    type: types.FETCH_DRAFT_SUCCESS,
    draft,
  };
}

export function fetchDraftFail() {
  return {
    type: types.FETCH_DRAFT_FAIL,
  };
}

export function createDraft(title, authorId) {
  return {
    type: types.CREATE_DRAFT,
    title,
    authorId,
  };
}

export function createDraftSuccess(draft) {
  return {
    type: types.CREATE_DRAFT_SUCCESS,
    draft,
  };
}

export function createDraftFail() {
  return {
    type: types.CREATE_DRAFT_FAIL,
  };
}

export function selectDraft(id) {
  return {
    type: types.SELECT_DRAFT,
    id,
  };
}
