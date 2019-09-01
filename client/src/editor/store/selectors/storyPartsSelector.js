import draftSelector from './draftSelector';

function storyPartsSelector(state) {
  return draftId => draftSelector(state)(draftId).storyParts;
}

export default storyPartsSelector;
