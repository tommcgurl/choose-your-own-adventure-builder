import { createSelector } from 'reselect';

const getStoryFromState = state => state.story;

export const getStory = createSelector(
  [getStoryFromState],
  story => ({ ...story }),
);
