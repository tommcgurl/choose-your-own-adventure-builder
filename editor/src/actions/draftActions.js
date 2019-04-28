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

export function createDraft(title) {
  return {
    type: types.CREATE_DRAFT,
    title,
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

export function selectToEditStoryPart(key, contents) {
  return {
    type: types.SELECT_TO_EDIT_STORY_PART,
    key,
    contents,
  };
}

export function addStoryPart(key, adventureId) {
  return {
    type: types.ADD_STORY_PART,
    key,
    adventureId,
  };
}
