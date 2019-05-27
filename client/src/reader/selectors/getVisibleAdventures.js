import { createSelector } from 'reselect';

const getAdventures = state => state.reader.adventures;
const getLibrary = state => state.reader.user.library;

export const getVisibleAdventures = createSelector(
  [getAdventures, getLibrary],
  (adventures, libraryBooks) => {
    return adventures.map(adventure => ({
      ...adventure,
      inLibrary: Boolean(libraryBooks.find(b => b.id === adventure.id)),
    }));
  }
);
