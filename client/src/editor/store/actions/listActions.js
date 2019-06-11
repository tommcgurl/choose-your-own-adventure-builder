import * as types from '../../../shared/constants/actionTypes';

export function fetchGenres() {
  return { type: types.FETCH_GENRES };
}

export function fetchGenresSuccess(genres) {
  return { type: types.FETCH_GENRES_SUCCESS, genres };
}
