const express = require('express');
const router = express.Router();

module.exports = function authRouter(passport) {
  router.post(
    '/',
    passport.authenticate('local', { session: false }),
    (req, res) => {
      console.log(req.body);
      res.json({ message: 'Login successful' });
    },
  );
  return router;
};
