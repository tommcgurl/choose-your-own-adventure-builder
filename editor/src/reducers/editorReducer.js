import initialState from '../store/initialState';
import * as types from '../constants/actionTypes';

export default function editorReducer(
  editorState = initialState.editorState,
  action,
) {
  switch (action.type) {
    case types.EDITOR_CHANGE:
      return action.editorState;
    default:
      return editorState;
  }
}
