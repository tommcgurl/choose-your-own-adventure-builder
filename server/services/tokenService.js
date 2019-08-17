const jwt = require('jsonwebtoken');

module.exports = {
  parseToken: token => {
    try {
      const parsedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      return parsedToken;
    } catch {
      return null;
    }
  },
  generateToken: payload => {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '30d' });
  },
};
