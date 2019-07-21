export const types = {
  AUTHENTICATED: 'SHARED_AUTH_AUTHENTICATED',
  LOG_OUT: 'SHARED_AUTH_LOG_OUT',
};

export function authenticated(token) {
  return {
    type: types.AUTHENTICATED,
    token,
  };
}

export function logOut() {
  return {
    type: types.LOG_OUT,
  };
}
