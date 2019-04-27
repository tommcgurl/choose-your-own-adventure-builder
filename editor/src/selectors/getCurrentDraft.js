import { createSelector } from 'reselect';

const getDrafts = state => state.drafts;
const getCurrentDraftId = state => state.currentDraftId;

export default createSelector(
  [getDrafts, getCurrentDraftId],
  (drafts, currentDraftId) => {
    return drafts.find(d => d.id === currentDraftId);
  },
);
