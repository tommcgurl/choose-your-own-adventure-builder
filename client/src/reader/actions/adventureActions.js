import {
  FETCH_ADVENTURE,
  FETCH_ADVENTURE_FAIL,
  FETCH_ADVENTURE_SUCCESSFUL,
} from '../constants/actionTypes';

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
