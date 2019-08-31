import Adventure from '../../../shared/models/Adventure';

export const types = {
  FETCH_DRAFTS: '[EDITOR_DRAFTS] FETCH_DRAFTS',
  FETCH_DRAFTS_SUCCESS: '[EDITOR_DRAFTS] FETCH_DRAFTS_SUCCESS',
  FETCH_DRAFTS_FAIL: '[EDITOR_DRAFTS] FETCH_DRAFTS_FAIL',
  CREATE_DRAFT: '[EDITOR_DRAFTS] CREATE_DRAFT',
  CREATE_DRAFT_SUCCESS: '[EDITOR_DRAFTS] CREATE_DRAFT_SUCCESS',
  CREATE_DRAFT_FAIL: '[EDITOR_DRAFTS] CREATE_DRAFT_FAIL',
  ADD_STORY_PART: '[EDITOR_DRAFTS] ADD_STORY_PART',
  DELETE_STORY_PART: '[EDITOR_DRAFTS] DELETE_STORY_PART',
  SELECT_STORY_PART_NEXT_BRANCH_ID:
    '[EDITOR_DRAFTS] SELECT_STORY_PART_NEXT_BRANCH_ID',
  CHANGE_PROMPT_TEXT: '[EDITOR_DRAFTS] CHANGE_PROMPT_TEXT',
  ADD_USER_CHOICE: '[EDITOR_DRAFTS] ADD_USER_CHOICE',
  REMOVE_USER_CHOICE: '[EDITOR_DRAFTS] REMOVE_USER_CHOICE',
  DELETE_DRAFT: '[EDITOR_DRAFTS] DELETE_DRAFT',
  SAVE_STORY_PART_PLOT: '[EDITOR_DRAFTS] SAVE_STORY_PART_PLOT',
  CHANGE_GENRE: '[EDITOR_DRAFTS] CHANGE_GENRE',
  PUBLISH_ADVENTURE: '[EDITOR_DRAFTS] PUBLISH_ADVENTURE',
  PUBLISH_ADVENTURE_SUCCESS: '[EDITOR_DRAFTS] PUBLISH_ADVENTURE_SUCCESS',
  SAVE_ADVENTURE_SUCCESS: '[EDITOR_DRAFTS] SAVE_ADVENTURE_SUCCESS',
  CHANGE_COVER_IMAGE: '[EDITOR_DRAFTS] CHANGE_COVER_IMAGE',
  REMOVE_COVER_IMAGE: '[EDITOR_DRAFTS] REMOVE_COVER_IMAGE',
  CHANGE_STORY_PART_NAME: '[EDITOR_DRAFTS] CHANGE_STORY_PART_KEY',
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

export function addStoryPart(name, draftId) {
  return {
    type: types.ADD_STORY_PART,
    name,
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

export function changePromptText(storyPartKey, currentDraftId, promptText) {
  return {
    type: types.CHANGE_PROMPT_TEXT,
    storyPartKey,
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
    type: types.SAVE_STORY_PART_PLOT,
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

export function changeStoryPartName(name, storyPartKey, draftId) {
  return {
    type: types.CHANGE_STORY_PART_NAME,
    name,
    storyPartKey,
    draftId,
  };
}
