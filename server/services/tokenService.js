const jwt = require('jsonwebtoken');

module.exports = {
  decodeToken: token => {
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return null;
    }
  },
  generateToken: payload => {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '30d' });
  },
  parseTokenFromHeaders: headers => {
    const authorization = headers && headers.authorization;
    if (authorization) {
      try {
        return authorization.substring(7);
      } catch (err) {
        console.error(err);
      }
    }

    return null;
  },
};
