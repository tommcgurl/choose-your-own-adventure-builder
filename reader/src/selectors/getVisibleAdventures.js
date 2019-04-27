import { createSelector } from 'reselect';

const getAdventures = state => state.adventures;
const getLibrary = state => state.user.library;

export const getVisibleAdventures = createSelector(
  [getAdventures, getLibrary],
  (adventures, libraryBooks) => {
    return adventures.map(adventure => ({
      ...adventure,
      inLibrary: Boolean(libraryBooks.find(b => b.id === adventure.id)),
    }));
  },
);
