import initialState from '../store/initialState';
import * as types from '../constants/actionTypes';
import { EditorState, ContentState, convertFromRaw } from 'draft-js';

export default function editorReducer(editor = initialState.editor, action) {
  switch (action.type) {
    case types.EDITOR_CHANGE:
      return { ...editor, state: action.editorState };
    case types.SELECT_TO_EDIT_STORY_PART:
      // This check here is only necessary right now bc
      // we're storing the story part values as plain text strings.
      const newEditor = { ...editor, storyPartKey: action.key };
      return typeof action.contents === 'string'
        ? {
            ...newEditor,
            state: EditorState.createWithContent(
              ContentState.createFromText(action.contents),
            ),
          }
        : {
            ...newEditor,
            state: EditorState.createWithContent(
              convertFromRaw(action.contents),
            ),
          };
    default:
      return editor;
  }
}
