function draftSelector(state) {
  return draftId => state.editor.drafts[draftId];
}

export default draftSelector;
