import * as types from '../constants/actionTypes';

export function navigate(page) {
  return {
    type: types.NAVIGATE,
    page,
  };
}
