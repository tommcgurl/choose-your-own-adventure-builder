import * as types from '../../../shared/constants/actionTypes';

export function fetchAdventure(id) {
  return {
    type: types.FETCH_ADVENTURE,
    id,
  };
}

export function fetchAdventureSuccessful(response) {
  return {
    type: types.FETCH_ADVENTURE_SUCCESSFUL,
    adventure: { ...response.data.adventure },
  };
}

export function fetchAdventureFail() {
  return {
    type: types.FETCH_ADVENTURE_FAIL,
  };
}
