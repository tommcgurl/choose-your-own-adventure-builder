import Adventure from '../../../shared/models/Adventure';

export const types = {
  FETCH_DRAFTS: 'EDITOR_DRAFTS_FETCH_DRAFTS',
  FETCH_DRAFTS_SUCCESS: 'EDITOR_DRAFTS_FETCH_DRAFTS_SUCCESS',
  FETCH_DRAFTS_FAIL: 'EDITOR_DRAFTS_FETCH_DRAFTS_FAIL',
  CREATE_DRAFT: 'EDITOR_DRAFTS_CREATE_DRAFT',
  CREATE_DRAFT_SUCCESS: 'EDITOR_DRAFTS_CREATE_DRAFT_SUCCESS',
  CREATE_DRAFT_FAIL: 'EDITOR_DRAFTS_CREATE_DRAFT_FAIL',
  ADD_STORY_PART: 'EDITOR_DRAFTS_ADD_STORY_PART',
  DELETE_STORY_PART: 'EDITOR_DRAFTS_DELETE_STORY_PART',
  CHANGE_STORY_PART_KEY: 'EDITOR_DRAFTS_CHANGE_STORY_PART_KEY',
  SELECT_STORY_PART_NEXT_BRANCH_ID:
    'EDITOR_DRAFTS_SELECT_STORY_PART_NEXT_BRANCH_ID',
  CHANGE_PROMPT_TEXT: 'EDITOR_DRAFTS_CHANGE_PROMPT_TEXT',
  ADD_USER_CHOICE: 'EDITOR_DRAFTS_ADD_USER_CHOICE',
  REMOVE_USER_CHOICE: 'EDITOR_DRAFTS_REMOVE_USER_CHOICE',
  DELETE_DRAFT: 'EDITOR_DRAFTS_DELETE_DRAFT',
  SAVE_STORY_PART: 'EDITOR_DRAFTS_SAVE_STORY_PART',
  CHANGE_GENRE: 'EDITOR_DRAFTS_CHANGE_GENRE',
  PUBLISH_ADVENTURE: 'EDITOR_DRAFTS_PUBLISH_ADVENTURE',
  PUBLISH_ADVENTURE_SUCCESS: 'EDITOR_DRAFTS_PUBLISH_ADVENTURE_SUCCESS',
  SAVE_ADVENTURE_SUCCESS: 'EDITOR_DRAFTS_SAVE_ADVENTURE_SUCCESS',
  CHANGE_COVER_IMAGE: 'EDITOR_DRAFTS_CHANGE_COVER_IMAGE',
  REMOVE_COVER_IMAGE: 'EDITOR_DRAFTS_REMOVE_COVER_IMAGE',
};

export function fetchDrafts() {
  return {
    type: types.FETCH_DRAFTS,
  };
}

export function fetchDraftsSuccess(adventures) {
  return {
    type: types.FETCH_DRAFTS_SUCCESS,
    adventures,
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

export function createDraftSuccess() {
  return {
    type: types.CREATE_DRAFT_SUCCESS,
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

export function deleteStoryPart(key, draftId) {
  return {
    type: types.DELETE_STORY_PART,
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

export function changePromptText(storyPartId, currentDraftId, promptText) {
  return {
    type: types.CHANGE_PROMPT_TEXT,
    storyPartId,
    draftId: currentDraftId,
    promptText,
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
