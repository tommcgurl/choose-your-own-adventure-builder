import * as routes from '../constants/routes';
import { EditorState } from 'draft-js';

export default {
  page: routes.HOME,
  editor: {
    state: EditorState.createEmpty(),
    key: null,
  },
  drafts: {},
  currentDraftId: null,
};
