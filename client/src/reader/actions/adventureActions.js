import {
  FETCH_ADVENTURE,
  FETCH_ADVENTURES,
  FETCH_ADVENTURES_FAIL,
  FETCH_ADVENTURES_SUCCESSFUL,
  FETCH_ADVENTURE_FAIL,
  FETCH_ADVENTURE_SUCCESSFUL,
} from '../constants/actionTypes';

export function fetchAdventures() {
  return {
    type: FETCH_ADVENTURES,
  };
}

export function adventuresFetchSuccessful(response) {
  return {
    type: FETCH_ADVENTURES_SUCCESSFUL,
    adventures: [...response.data.adventures],
  };
}

export function adventuresFetchFail() {
  return {
    type: FETCH_ADVENTURES_FAIL,
  };
}

export function fetchAdventure(id) {
  return {
    type: FETCH_ADVENTURE,
    id,
  };
}

export function fetchAdventureSuccessful(response) {
  return {
    type: FETCH_ADVENTURE_SUCCESSFUL,
    adventure: { ...response.data.adventure },
  };
}

export function fetchAdventureFail() {
  return {
    type: FETCH_ADVENTURE_FAIL,
  };
}
