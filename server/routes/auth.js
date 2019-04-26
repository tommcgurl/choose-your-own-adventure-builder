const express = require("express");
const router = express.Router();

module.exports = function authRouter(passport) {
  router.post(
    "/",
    passport.authenticate("local", { session: false }),
    (req, res) => {
      res.json({ message: `${req.user.username} logged in successfully` });
    }
  );
  return router;
};
