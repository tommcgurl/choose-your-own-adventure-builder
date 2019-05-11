import { AUTHENTICATED } from '../constants/actionTypes';

export function authenticated(token) {
  return {
    type: AUTHENTICATED,
    token,
  };
}
