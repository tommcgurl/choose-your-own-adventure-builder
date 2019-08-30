import draftSelector from './draftSelector';

function storyPartsSelector(state) {
  return draftId => draftSelector(state)(draftId).mainStory.storyParts;
}

export default storyPartsSelector;
