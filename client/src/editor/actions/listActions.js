import { FETCH_GENRES, FETCH_GENRES_SUCCESS } from '../constants/actionTypes';

export function fetchGenres() {
  return { type: FETCH_GENRES };
}

export function fetchGenresSuccess(genres) {
  return { type: FETCH_GENRES_SUCCESS, genres };
}
