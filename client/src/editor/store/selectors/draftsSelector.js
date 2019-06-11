import values from 'lodash.values';

function getDrafts(state) {
  return values(state.editor.drafts);
}

export default getDrafts;
