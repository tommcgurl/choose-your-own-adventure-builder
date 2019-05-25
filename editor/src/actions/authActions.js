import { AUTHENTICATED, LOG_OUT } from '../constants/actionTypes';

export function authenticated(token) {
  return {
    type: AUTHENTICATED,
    token,
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
  };
}
