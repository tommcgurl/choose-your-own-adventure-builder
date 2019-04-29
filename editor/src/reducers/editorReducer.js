import initialState from '../store/initialState';
import * as types from '../constants/actionTypes';
import { EditorState, ContentState, convertFromRaw } from 'draft-js';

export default function editorReducer(editor = initialState.editor, action) {
  switch (action.type) {
    case types.EDITOR_CHANGE:
      return { ...editor, state: action.editorState };
    case types.SELECT_TO_EDIT_STORY_PART:
      return {
        ...editor,
        storyPartKey: action.key,
        state: EditorState.createWithContent(
          // This check here is only necessary right now bc
          // we're storing the story part values as plain text strings.
          typeof action.contents === 'string'
            ? ContentState.createFromText(action.contents)
            : convertFromRaw(action.contents),
        ),
      };
    case types.CHANGE_STORY_PART_KEY:
      return { ...editor, storyPartKey: action.newKey };
    default:
      return editor;
  }
}
