import { createSelector } from 'reselect';

const getLibraryFromState = state => state.user.library;

export const getLibrary = createSelector(
  [getLibraryFromState],
  library => [...library],
);
