const jwtDecode = require('jwt-decode');

export default {
  isAuthenticated: token => {
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
  },
};
