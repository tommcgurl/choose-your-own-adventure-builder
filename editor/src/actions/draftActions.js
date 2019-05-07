import * as types from '../constants/actionTypes';
import Adventure from '../models/Adventure';

export function fetchDrafts(userId) {
  return {
    type: types.FETCH_DRAFTS,
    userId,
  };
}

export function fetchDraftsSuccess(response) {
  return {
    type: types.FETCH_DRAFTS_SUCCESS,
    drafts: [...response.data.drafts],
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
  const draft = new Adventure(title);
  return {
    type: types.CREATE_DRAFT,
    draft,
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

export function addStoryPart(key, draftId) {
  return {
    type: types.ADD_STORY_PART,
    key,
    draftId,
  };
}

export function changeStoryPartKey(oldKey, newKey, draftId) {
  return {
    type: types.CHANGE_STORY_PART_KEY,
    oldKey,
    newKey,
    draftId,
  };
}
