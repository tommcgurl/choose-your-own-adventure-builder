const express = require("express");
const router = express.Router();

module.exports = function authRouter(passport) {
  router.post(
    "/local",
    passport.authenticate("local", { session: false }), // setting session to false prevents the user serialization requirement
    (req, res) => {
      res.json({ message: `${req.user.username} logged in successfully` });
    }
  );

  router.get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile"]
    })
  );

  router.get(
    "/google/redirect",
    passport.authenticate("google", { session: false }),
    (req, res) => {
      res.json({ message: `I can see that your name is ${req.user.username}` });
    }
  );

  router.get("/facebook", passport.authenticate("facebook"));

  router.get(
    "/facebook/redirect",
    passport.authenticate("facebook", { session: false }),
    (req, res) => {
      res.json({
        message: `I can see that your name is ${req.user.username}`
      });
    }
  );

  return router;
};
