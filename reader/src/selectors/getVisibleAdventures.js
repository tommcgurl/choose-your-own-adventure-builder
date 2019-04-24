import { createSelector } from 'reselect';

const getVisibilityFilter = state => state.visibilityFilter;
const getAdventures = state => state.adventures;
const getAdventuresRead = state => state.user.adventuresRead;

export const getVisibleStories = createSelector(
  [getVisibilityFilter, getAdventures, getAdventuresRead],
  (visibilityFilter, adventures, adventuresRead) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return [...adventures];
      case 'SHOW_UNREAD':
        return adventures.filter(a => !adventuresRead.some(id => id === a.id));
      default:
        return [...adventures];
    }
  },
);
