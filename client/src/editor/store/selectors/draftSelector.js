import draftsSelector from './draftsSelector';

function draftSelector(state) {
  return draftId => draftsSelector(state).find(d => d.id === draftId);
}

export default draftSelector;
