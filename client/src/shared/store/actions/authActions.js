const actionTypeRoot = '[SHARED_AUTH]';

export const AUTHENTICATED = `${actionTypeRoot} AUTHENTICATED`;
export function authenticated(token) {
  return {
    type: AUTHENTICATED,
    token,
  };
}

export const LOG_OUT = `${actionTypeRoot} LOG_OUT`;
export function logOut() {
  return {
    type: LOG_OUT,
  };
}
