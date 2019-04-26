import { DRAFT } from '../constants/routes';
import { EditorState } from 'draft-js';

export default {
  page: DRAFT,
  editorState: EditorState.createEmpty(),
};
