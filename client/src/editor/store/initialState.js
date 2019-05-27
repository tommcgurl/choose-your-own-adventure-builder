import { EditorState } from 'draft-js';

export default {
  editor: {
    state: EditorState.createEmpty(),
    storyPartKey: null,
  },
  drafts: {},
  currentDraftId: null,
};
