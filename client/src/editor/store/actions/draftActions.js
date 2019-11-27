import Adventure from '../../../shared/models/Adventure';

const actionTypeRoot = '[EDITOR_DRAFTS]';

export const FETCH_DRAFTS = `${actionTypeRoot} FETCH_DRAFTS`;
export function fetchDrafts() {
  return {
    type: FETCH_DRAFTS,
  };
}

export const FETCH_DRAFTS_SUCCESS = `${actionTypeRoot} FETCH_DRAFTS_SUCCESS`;
export function fetchDraftsSuccess(adventures) {
  return {
    type: FETCH_DRAFTS_SUCCESS,
    adventures,
  };
}

export const FETCH_DRAFTS_FAIL = `${actionTypeRoot} FETCH_DRAFTS_FAIL`;
export function fetchDraftsFail() {
  return {
    type: FETCH_DRAFTS_FAIL,
  };
}

export const CREATE_DRAFT = `${actionTypeRoot} CREATE_DRAFT`;
export function createDraft(title) {
  const draft = new Adventure(title);
  return {
    type: CREATE_DRAFT,
    draft,
  };
}

export const CREATE_DRAFT_SUCCESS = `${actionTypeRoot} CREATE_DRAFT_SUCCESS`;
export function createDraftSuccess() {
  return {
    type: CREATE_DRAFT_SUCCESS,
  };
}

export const SAVE_ADVENTURE_FAIL = `${actionTypeRoot} SAVE_ADVENTURE_FAIL`;
export function saveAdventureFail(sourceType, draftId, error) {
  return {
    type: SAVE_ADVENTURE_FAIL,
    sourceType,
    draftId,
    error,
  };
}

export const ADD_STORY_PART = `${actionTypeRoot} ADD_STORY_PART`;
export function addStoryPart(storyPartId, storyPartName, draftId) {
  return {
    type: ADD_STORY_PART,
    storyPartId,
    storyPartName,
    draftId,
  };
}

export const DELETE_STORY_PART = `${actionTypeRoot} DELETE_STORY_PART`;
export function deleteStoryPart(key, draftId) {
  return {
    type: DELETE_STORY_PART,
    key,
    draftId,
  };
}

export const CHANGE_PROMPT_TEXT = `${actionTypeRoot} CHANGE_PROMPT_TEXT`;
export function changePromptText(storyPartKey, currentDraftId, promptText) {
  return {
    type: CHANGE_PROMPT_TEXT,
    storyPartKey,
    draftId: currentDraftId,
    promptText,
  };
}

export const ADD_USER_CHOICE = `${actionTypeRoot} ADD_USER_CHOICE`;
export function addChoiceToStoryPart(
  storyPartId,
  currentDraftId,
  choiceText,
  choiceBranchId
) {
  return {
    type: ADD_USER_CHOICE,
    storyPartId,
    draftId: currentDraftId,
    choiceText,
    choiceBranchId,
  };
}

export const REMOVE_USER_CHOICE = `${actionTypeRoot} REMOVE_USER_CHOICE`;
export function removeChoiceFromStoryPart(
  storyPartId,
  currentDraftId,
  choiceText
) {
  return {
    type: REMOVE_USER_CHOICE,
    storyPartId,
    draftId: currentDraftId,
    choiceText,
  };
}

export const DELETE_DRAFT = `${actionTypeRoot} DELETE_DRAFT`;
export function deleteDraft(draftId) {
  return {
    type: DELETE_DRAFT,
    draftId,
  };
}

export const SAVE_STORY_PART_PLOT = `${actionTypeRoot} SAVE_STORY_PART_PLOT`;
export function saveStoryPart(editorState, storyPartKey, draftId) {
  return {
    type: SAVE_STORY_PART_PLOT,
    editorState,
    storyPartKey,
    draftId,
  };
}

export const CHANGE_GENRE = `${actionTypeRoot} CHANGE_GENRE`;
export function changeGenre(draftId, genre) {
  return {
    type: CHANGE_GENRE,
    draftId,
    genre,
  };
}

export const PUBLISH_ADVENTURE = `${actionTypeRoot} PUBLISH_ADVENTURE`;
export function publishAdventure(draftId) {
  return {
    type: PUBLISH_ADVENTURE,
    draftId,
  };
}

export const PUBLISH_ADVENTURE_SUCCESS = `${actionTypeRoot} PUBLISH_ADVENTURE_SUCCESS`;
export function publishAdventureSuccess(adventure) {
  return {
    type: PUBLISH_ADVENTURE_SUCCESS,
    adventure,
  };
}

export const SAVE_ADVENTURE_SUCCESS = `${actionTypeRoot} SAVE_ADVENTURE_SUCCESS`;
export function saveAdventureSuccess(adventure) {
  return {
    type: SAVE_ADVENTURE_SUCCESS,
    adventure,
  };
}

export const CHANGE_COVER_IMAGE = `${actionTypeRoot} CHANGE_COVER_IMAGE`;
export function setCoverImage(draftId, imageUrl) {
  return {
    type: CHANGE_COVER_IMAGE,
    draftId,
    imageUrl,
  };
}

export const CHANGE_STORY_PART_NAME = `${actionTypeRoot} CHANGE_STORY_PART_KEY`;
export function changeStoryPartName(name, storyPartKey, draftId) {
  return {
    type: CHANGE_STORY_PART_NAME,
    name,
    storyPartKey,
    draftId,
  };
}

export const SET_FIRST_PART_ID = `${actionTypeRoot} SET_FIRST_PART_ID`;
export function setAdventureFirstPartId(firstPartKey, draftId) {
  return {
    type: SET_FIRST_PART_ID,
    firstPartKey,
    draftId,
  };
}

export const UPDATE_DRAFT_TITLE = `${actionTypeRoot} UPDATE_DRAFT_TITLE`;
export function updateDraftTitle(draftId, newTitle) {
  return {
    type: UPDATE_DRAFT_TITLE,
    draftId,
    newTitle,
  };
}
