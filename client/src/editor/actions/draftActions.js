import * as types from '../../shared/constants/actionTypes';
import Adventure from '../../shared/models/Adventure';

export function fetchDrafts() {
  return {
    type: types.FETCH_DRAFTS,
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

export function selectStoryPartNextBranchId(
  storyPartId,
  draftId,
  nextBranchId
) {
  return {
    type: types.SELECT_STORY_PART_NEXT_BRANCH_ID,
    storyPartId,
    draftId,
    nextBranchId,
  };
}

export function addChoiceToStoryPart(
  storyPartId,
  currentDraftId,
  choiceText,
  choiceBranchId
) {
  return {
    type: types.ADD_USER_CHOICE,
    storyPartId,
    draftId: currentDraftId,
    choiceText,
    choiceBranchId,
  };
}

export function removeChoiceFromStoryPart(
  storyPartId,
  currentDraftId,
  choiceText
) {
  return {
    type: types.REMOVE_USER_CHOICE,
    storyPartId,
    draftId: currentDraftId,
    choiceText,
  };
}

export function deleteDraft(draftId) {
  return {
    type: types.DELETE_DRAFT,
    draftId,
  };
}

export function saveStoryPart(editorState, storyPartKey, draftId) {
  return {
    type: types.SAVE_STORY_PART,
    editorState,
    storyPartKey,
    draftId,
  };
}

export function changeGenre(draftId, genre) {
  return {
    type: types.CHANGE_GENRE,
    draftId,
    genre,
  };
}
