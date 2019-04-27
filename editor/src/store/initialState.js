import * as routes from '../constants/routes';
import { EditorState } from 'draft-js';

export default {
  page: routes.HOME,
  editorState: EditorState.createEmpty(),
  drafts: [],
  currentDraftId: null,
};
