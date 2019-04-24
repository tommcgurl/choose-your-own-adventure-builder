import {
  FETCH_ADVENTURES_SUCCESSFUL,
  FETCH_ADVENTURES_FAIL,
  FETCH_ADVENTURES,
  FETCH_ADVENTURE_SUCCESSFUL,
  FETCH_ADVENTURE_FAIL,
  FETCH_ADVENTURE,
} from '../constants/actionTypes';

export function fetchAdventures() {
  return {
    type: FETCH_ADVENTURES,
  };
}

export function adventuresFetchSuccessful(adventures) {
  return {
    type: FETCH_ADVENTURES_SUCCESSFUL,
    adventures,
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

export function fetchAdventureSuccessful(adventure) {
  return {
    type: FETCH_ADVENTURE_SUCCESSFUL,
    adventure,
  };
}

export function fetchAdventureFail() {
  return {
    type: FETCH_ADVENTURE_FAIL,
  };
}
