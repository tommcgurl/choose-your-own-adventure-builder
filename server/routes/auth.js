const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const redirectWithToken = (req, res) => {
  const token = jwt.sign(req.user, "super secret");
  res.redirect(`${process.env.READER_URL}/authredirect/${token}`);
};

module.exports = function authRouter(passport) {
  router.get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile"]
    })
  );

  router.get(
    "/google/redirect",
    passport.authenticate("google", { session: false }),
    redirectWithToken
  );

  router.get("/facebook", passport.authenticate("facebook"));

  router.get(
    "/facebook/redirect",
    passport.authenticate("facebook", { session: false }),
    redirectWithToken
  );

  return router;
};
