const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const readerTokenRedirect = (req, res) => {
  const token = jwt.sign(req.user, "reader_secret");
  res.redirect(`${process.env.READER_URL}/authredirect/${token}`);
};

const editorTokenRedirect = (req, res) => {
  const token = jwt.sign(req.user, "editor_secret");
  res.redirect(`${process.env.EDITOR_URL}/authredirect/${token}`);
};

module.exports = function authRouter(passport) {
  router.get(
    "/reader/google",
    passport.authenticate("google", {
      callbackURL: "http://localhost:3002/auth/reader/google/redirect",
      scope: ["profile"]
    })
  );

  router.get(
    "/reader/google/redirect",
    passport.authenticate("google", {
      callbackURL: "http://localhost:3002/auth/reader/google/redirect",
      session: false
    }),
    readerTokenRedirect
  );

  router.get(
    "/editor/google",
    passport.authenticate("google", {
      callbackURL: "http://localhost:3002/auth/editor/google/redirect",
      scope: ["profile"]
    })
  );

  router.get(
    "/editor/google/redirect",
    passport.authenticate("google", {
      callbackURL: "http://localhost:3002/auth/editor/google/redirect",
      session: false
    }),
    editorTokenRedirect
  );

  router.get("/facebook", passport.authenticate("facebook"));

  router.get(
    "/facebook/redirect",
    passport.authenticate("facebook", { session: false }),
    editorTokenRedirect
  );

  return router;
};
