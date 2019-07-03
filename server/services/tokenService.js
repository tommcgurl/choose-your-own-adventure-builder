const jwt = require('jsonwebtoken');

module.exports = {
  parseToken: token => {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  },
  generateToken: payload => {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '30d' });
  },
};
