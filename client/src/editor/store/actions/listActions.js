export const types = {
  FETCH_GENRES: 'EDITOR_DRAFTS_FETCH_GENRES',
  FETCH_GENRES_SUCCESS: 'EDITOR_DRAFTS_FETCH_GENRES_SUCCESS',
};

export function fetchGenres() {
  return { type: types.FETCH_GENRES };
}

export function fetchGenresSuccess(genres) {
  return { type: types.FETCH_GENRES_SUCCESS, genres };
}
