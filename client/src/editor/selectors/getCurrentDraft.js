import { createSelector } from 'reselect';

const getDrafts = state => state.editor.drafts;
const getCurrentDraftId = state => state.editor.currentDraftId;

export default createSelector(
  [getDrafts, getCurrentDraftId],
  (drafts, currentDraftId) => {
    return drafts[currentDraftId];
  }
);
