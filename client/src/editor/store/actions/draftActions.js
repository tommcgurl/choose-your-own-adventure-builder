import * as types from '../../../shared/constants/actionTypes';
import Adventure from '../../../shared/models/Adventure';

export function fetchAdventuresAuthoredByUser() {
  return {
    type: types.FETCH_DRAFTS_AUTHORED_BY_USER,
  };
}

export function fetchAdventuresAuthoredByUserSuccess(adventures) {
  return {
    type: types.FETCH_ADVENTURES_AUTHORED_BY_USER_SUCCESS,
    adventures,
  };
}

export function fetchAdventuresAuthoredByUserFail() {
  return {
    type: types.FETCH_ADVENTURES_AUTHORED_BY_USER_FAIL,
  };
}

export function createDraft(title) {
  const draft = new Adventure(title);
  return {
    type: types.CREATE_DRAFT,
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

export function publishAdventure(draftId) {
  return {
    type: types.PUBLISH_ADVENTURE,
    draftId,
  };
}

export function publishAdventureSuccess(adventure) {
  return {
    type: types.PUBLISH_ADVENTURE_SUCCESS,
    adventure,
  };
}

export function saveAdventureSuccess(adventure) {
  return {
    type: types.SAVE_ADVENTURE_SUCCESS,
    adventure,
  };
}

export function setCoverImage(draftId, imageUrl) {
  return {
    type: types.CHANGE_COVER_IMAGE,
    draftId,
    imageUrl,
  };
}
