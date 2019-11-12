const jwtDecode = require('jwt-decode');

export function isAuthenticated(token) {
  try {
    const expiresAt = jwtDecode(token).exp * 1000;
    const now = new Date().getTime();
    if (now > expiresAt) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    return false;
  }
}

export function decodeToken(token) {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch {
    return null;
  }
}

export function getUserPhoto(token) {
  if (isAuthenticated(token)) {
    return jwtDecode(token).photo;
  }

  return null;
}

export function getUsername(token) {
  if (isAuthenticated(token)) {
    return jwtDecode(token).username;
  }

  return null;
}
