import { createSelector } from 'reselect';

const getAdventureFromState = state => state.adventure;

export const getAdventure = createSelector(
  [getAdventureFromState],
  adventure => ({ ...adventure }),
);
