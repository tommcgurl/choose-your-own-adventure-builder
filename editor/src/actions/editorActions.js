import * as types from '../constants/actionTypes';

export function change(editorState) {
  return {
    type: types.EDITOR_CHANGE,
    editorState,
  };
}
