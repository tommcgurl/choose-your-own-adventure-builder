const actionTypeRoot = '[SHARED_LISTS]';

export const FETCH_GENRES = `${actionTypeRoot} FETCH_GENRES`;
export function fetchGenres() {
  return { type: FETCH_GENRES };
}

export const FETCH_GENRES_SUCCESS = `${actionTypeRoot} FETCH_GENRES_SUCCESS`;
export function fetchGenresSuccess(genres) {
  return { type: FETCH_GENRES_SUCCESS, genres };
}
