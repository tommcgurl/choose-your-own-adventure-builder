import * as types from '../constants/actionTypes';

export function updateStoryPart(editorState, storyPartKey, adventureId) {
  return {
    type: types.EDITOR_CHANGE,
    editorState,
    storyPartKey,
    adventureId,
  };
}
